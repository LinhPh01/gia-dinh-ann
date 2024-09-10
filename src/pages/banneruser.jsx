import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  displayNameState,
  idState,
  totalPointState,
  ranksState,
  emailState,
  ageState,
  genderState,
  locationState,
  allergyState,
  underlyingdiseaseState,
  phoneNumberState,
} from "../state";

import { Box, Text, useNavigate } from "zmp-ui";
import Barcode from "react-barcode";
import { followOA } from "zmp-sdk/apis";
import {
  getAccessToken,
  getPhoneNumber,
  getUserInfo,
  getSetting,
} from "zmp-sdk/apis";
import gift from "../../assets-src/gift-box.png";
import headerlogo from "../../assets-src/header.svg";
// import Popup from "./popup";

//
const Banneruser = () => {
  const navigate = useNavigate();
  const secretKey = "K2UHm5uysg8RfBiDA846";
  const setId = useSetRecoilState(idState);
  const id = useRecoilValue(idState);
  const setName = useSetRecoilState(displayNameState);
  const nameuser = useRecoilValue(displayNameState);
  const [pointtotal, setPointTotal] = useRecoilState(totalPointState);
  const [ranks, setRanks] = useRecoilState(ranksState);
  const [phone, setPhoneNumber] = useRecoilState(phoneNumberState);
  const [age, setAge] = useRecoilState(ageState);
  const [gender, setGender] = useRecoilState(genderState);
  const [email, setEmail] = useRecoilState(emailState);
  const [address, setAddress] = useRecoilState(locationState);
  const [allergy, setAllergy] = useRecoilState(allergyState);
  const [underlyingdisease, setUnderlyingdisease] = useRecoilState(
    underlyingdiseaseState
  );
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const follow = async () => {
  //   try {
  //     await followOA({
  //       id: "702422774429876151",
  //     });
  //     setIsLoggedIn(true);
  //   } catch (error) {
  //     console.log("Lỗi khi theo dõi OA:", error);
  //   }
  // };
  //
  const [isFollowed, setIsFollowed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkFollowStatus = async () => {
      console.log("Checking follow status from API...");

      try {
        const { userInfo } = await getUserInfo();
        console.log("User info from API:", userInfo);

        // Kiểm tra trạng thái theo dõi từ userInfo
        const hasFollowed = userInfo.followedOA;
        console.log("Follow status from API:", hasFollowed);

        // Cập nhật trạng thái và localStorage nếu có sự thay đổi
        if (hasFollowed !== isFollowed) {
          setIsFollowed(hasFollowed);
          localStorage.setItem("isFollowed", JSON.stringify(hasFollowed));
          console.log("Updated follow status in localStorage:", hasFollowed);
        }
      } catch (error) {
        console.error("Error checking follow status from API:", error);
      }
    };

    // Kiểm tra trạng thái ngay khi component mount
    checkFollowStatus();

    // Cài đặt interval để kiểm tra lại mỗi 5 giây
    const intervalId = setInterval(() => {
      checkFollowStatus();
    }, 10000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, [isFollowed]); // Thay đổi trong trạng thái theo dõi sẽ gây ra việc kiểm tra lại

  const follow = async () => {
    console.log("Attempting to follow...");

    try {
      await followOA({ id: "702422774429876151" });
      console.log("Successfully followed");

      setIsFollowed(true);
      // Cập nhật localStorage khi theo dõi thành công
      localStorage.setItem("isFollowed", JSON.stringify(true));
      console.log("Updated follow status in localStorage:", true);
    } catch (error) {
      console.error("Error following:", error);
    }
  };

  const handleOA = () => {
    follow();
  };
  // Kiểm tra trạng thái từ localStorage khi khởi động ứng dụng

  //
  const processPhoneNumber = (phone) => {
    if (phone.startsWith("84")) {
      return "0" + phone.substring(2);
    }
    return phone;
  };
  // lấy sdt
  const fetchDataLoad = async () => {
    getAccessToken({
      success: (userAccessToken) => {
        console.log("Access token:", userAccessToken);
        getPhoneNumber({
          success: async (data) => {
            let { token } = data;
            console.log("Token:", token);
            try {
              const response = await fetch(
                "https://graph.zalo.me/v2.0/me/info",
                {
                  headers: {
                    access_token: userAccessToken,
                    code: token,
                    secret_key: secretKey,
                  },
                }
              );

              if (!response.ok) {
                throw new Error(`lỗi response: ${response.status}`);
              }

              const data = await response.json();
              console.log("data trả về :", data);

              if (data.data && data.data.number) {
                const formattedPhoneNumber = processPhoneNumber(
                  data.data.number
                );
                setPhoneNumber(formattedPhoneNumber);

                localStorage.setItem("phone", formattedPhoneNumber);
                console.log("Cập nhật sdt:", formattedPhoneNumber);
                fetchUserPointAndRank(formattedPhoneNumber);
              } else {
                console.log("Không nhận được số điện thoại từ API.");
              }
            } catch (error) {
              console.error("Lỗi khi gọi API: ", error);
            }
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };
  //lấy điểm
  const fetchUserPointAndRank = async (phone) => {
    try {
      // Gọi API để lấy thông tin người dùng và điểm
      const userResponse = await fetch(
        "https://miniapp.nhathuocnaman.com/api/storeCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: "8AF1apnMW2A39Ip7LUFtNstE5RjYleSf",
            phone: phone,
          }),
        }
      );

      if (!userResponse.ok) {
        console.error(`Lỗi response user: ${userResponse.status}`);

        return;
      }

      const userData = await userResponse.json();
      console.log("Dữ liệu người dùng:", userData.data);

      if (!userData.data) {
        console.log("Không nhận được id người dùng từ API.");
        return;
      }

      const {
        id,
        name,
        total_point,
        age,
        gender,
        email,
        allergy,
        underlying_disease,
        address,
      } = userData.data;

      // Lấy dữ liệu hiện tại từ localStorage
      // const storedUserData = JSON.parse(localStorage.getItem("userData"));
      // if (!storedUserData) {
      //   console.log("Không có dữ liệu người dùng trong localStorage.");
      //   return;
      // }

      // Cập nhật dữ liệu trong localStorage chỉ với các trường cần thiết
      const updatedUserData = {
        // ...(JSON.parse(localStorage.getItem("userData")) || {}),
        id: id !== undefined ? id : storedUserData.id,
        phone: phone !== undefined ? phone : storedUserData.phone,
        name: name !== undefined ? name : storedUserData.name,
        pointTotal:
          total_point !== undefined ? total_point : storedUserData.pointTotal,
        age: age !== undefined ? age : storedUserData.age,
        gender: gender !== undefined ? gender : storedUserData.gender,
        email: email !== undefined ? email : storedUserData.email,
        allergy: allergy !== undefined ? allergy : storedUserData.allergy,
        underlying_disease:
          underlying_disease !== undefined
            ? underlying_disease
            : storedUserData.underlying_disease,
        address: address !== undefined ? address : storedUserData.address,

        lastUpdated: new Date().getTime(),
      };
      // Log thời gian cập nhật mới
      console.log(
        "Thời gian cập nhật mới của user:",
        new Date(updatedUserData.lastUpdated).toLocaleString()
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      setId(updatedUserData.id);
      setPhoneNumber(updatedUserData.phone);
      setName(updatedUserData.name);
      setPointTotal(updatedUserData.pointTotal);
      setGender(updatedUserData.gender);
      setEmail(updatedUserData.email);
      setAge(updatedUserData.age);
      setAllergy(updatedUserData.allergy);
      setUnderlyingdisease(updatedUserData.underlying_disease);
      setAddress(updatedUserData.address);

      // Gọi API để lấy danh sách xếp hạng
      const rankResponse = await fetch(
        "https://miniapp.nhathuocnaman.com/api/getListRate?api_key=8AF1apnMW2A39Ip7LUFtNstE5RjYleSf",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!rankResponse.ok) {
        console.error(`Lỗi response rank: ${rankResponse.status}`);
        return;
      }

      const rankData = await rankResponse.json();
      console.log("Dữ liệu rank:", rankData.data);

      if (!rankData.data) {
        console.log("Không nhận được dữ liệu xếp hạng từ API.");
        return;
      }

      // Tìm tên danh hiệu dựa trên điểm
      const rank = rankData.data.find((item) => {
        return (
          total_point >= parseInt(item.min_point) &&
          total_point <= parseInt(item.max_point)
        );
      });
      const updatedRank = rank ? rank.name : "Không có danh hiệu";

      // Cập nhật dữ liệu trong localStorage với rank mới
      updatedUserData.rank = updatedRank;
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      setRanks(updatedRank);
    } catch (error) {
      console.error("Fetch lỗi:", error);
    }
  };
  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");

  //   if (storedUserData) {
  //     try {
  //       const userData = JSON.parse(storedUserData);
  //       const { phone, id, name, pointTotal, rank, lastUpdated } = userData;
  //       const currentTime = new Date().getTime();

  //       if (
  //         phone &&
  //         id &&
  //         pointTotal &&
  //         rank &&
  //         currentTime - lastUpdated < 60000
  //       ) {
  //         setPhoneNumber(phone);
  //         setId(id);
  //         setName(name || null);
  //         setPointTotal(pointTotal);
  //         setRanks(rank);

  //         console.log("Dữ liệu từ localStorage:");
  //         console.log("Phone:", phone);
  //         console.log("ID:", id);
  //         console.log("Name:", name || null);
  //         console.log("Point Total:", pointTotal);
  //         console.log("Rank:", rank);
  //       } else {
  //         // Xử lý trường hợp không đủ dữ liệu hoặc dữ liệu đã cũ

  //         fetchUserPointAndRank(phone);
  //       }
  //     } catch (e) {
  //       console.error("Lỗi khi parse dữ liệu từ localStorage:", e);
  //       // Có thể yêu cầu người dùng nhập số điện thoại ở đây
  //       fetchUserPointAndRank(phone);
  //     }
  //   } else {
  //     console.log("Không tìm thấy dữ liệu người dùng trong localStorage.");
  //     // Có thể yêu cầu người dùng nhập số điện thoại ở đây
  //     fetchUserPointAndRank(phone);
  //   }

  //   const intervalId = setInterval(() => {
  //     // if (!phone) {
  //     //   fetchUserPointAndRank(phone);
  //     // } else {
  //     //   fetchUserPointAndRank(phone);
  //     // }
  //     fetchUserPointAndRank(phone);
  //   }, 60000); // 1 phút

  //   return () => clearInterval(intervalId);
  // }, []);
  // //
  // useEffect(() => {
  //   const checkPermissions = () => {
  //     getSetting({
  //       success: (data) => {
  //         const isPhoneAuthorized =
  //           data.authSetting && data.authSetting["scope.userInfo"];
  //         console.log("Cài đặt quyền truy cập:", data.authSetting);
  //         if (!isPhoneAuthorized) {
  //           // Nếu chưa cấp quyền truy cập số điện thoại, hiện nút đăng nhập
  //           console.log("Chưa cấp quyền truy cập số điện thoại.");
  //           // Hiển thị nút đăng nhập hoặc bất kỳ giao diện nào phù hợp ở đây
  //         } else {
  //           console.log("Đã cấp quyền truy cập số điện thoại.");
  //         }
  //       },
  //       fail: (error) => {
  //         console.log("Lỗi khi gọi getSetting:", error);
  //       },
  //     });
  //   };

  //   checkPermissions(); // Kiểm tra ngay khi component mount

  //   const intervalId = setInterval(() => {
  //     checkPermissions(); // Kiểm tra mỗi 10 giây
  //   }, 10000); // 10 giây

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const checkPermissions = () => {
      getSetting({
        success: (data) => {
          // Kiểm tra quyền truy cập cụ thể cho số điện thoại
          const isPhoneAuthorized =
            data.authSetting && data.authSetting["scope.userPhonenumber"];

          console.log("Cài đặt quyền truy cập:", data.authSetting);

          if (isPhoneAuthorized) {
            // Đã cấp quyền truy cập số điện thoại
            const storedUserData = localStorage.getItem("userData");

            if (storedUserData) {
              try {
                const userData = JSON.parse(storedUserData);
                const { phone, id, name, pointTotal, rank, lastUpdated } =
                  userData;
                const currentTime = new Date().getTime();

                if (
                  phone &&
                  id &&
                  pointTotal &&
                  rank &&
                  currentTime - lastUpdated < 60000
                ) {
                  setPhoneNumber(phone);
                  setId(id);
                  setName(name || null);
                  setPointTotal(pointTotal);
                  setRanks(rank);

                  console.log("Dữ liệu từ localStorage:");
                  console.log("Phone:", phone);
                  console.log("ID:", id);
                  console.log("Name:", name || null);
                  console.log("Point Total:", pointTotal);
                  console.log("Rank:", rank);
                } else {
                  // Xử lý trường hợp không đủ dữ liệu hoặc dữ liệu đã cũ
                  fetchUserPointAndRank(phone);
                }
              } catch (e) {
                console.error("Lỗi khi parse dữ liệu từ localStorage:", e);
                fetchUserPointAndRank(phone);
              }
            } else {
              console.log(
                "Không tìm thấy dữ liệu người dùng trong localStorage."
              );
              fetchUserPointAndRank(phone);
            }
          } else {
            console.log("Chưa cấp quyền truy cập số điện thoại.");
            // Nếu không có quyền, xoá dữ liệu và thiết lập lại giao diện
            localStorage.removeItem("userData");
            localStorage.removeItem("phone");
            setPhoneNumber(null);
          }
        },
        fail: (error) => {
          console.log("Lỗi khi gọi getSetting:", error);
        },
      });
    };

    // Hàm cập nhật dữ liệu từ API mỗi phút một lần
    const updateData = () => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          const { phone } = JSON.parse(storedUserData);
          if (phone) {
            fetchUserPointAndRank(phone);
          }
        } catch (e) {
          console.error("Lỗi khi parse dữ liệu từ localStorage:", e);
        }
      }
    };

    checkPermissions(); // Kiểm tra quyền truy cập khi component mount

    const intervalId = setInterval(() => {
      checkPermissions(); // Kiểm tra quyền truy cập mỗi 10 giây
    }, 5000); // 10 giây

    const updateIntervalId = setInterval(() => {
      updateData();
    }, 60000); // 60 giây

    // Xoá interval khi component bị unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(updateIntervalId);
    };
  }, []);
  // const checkPermissions = () => {
  //   getSetting({
  //     success: (data) => {
  //       const isPhoneAuthorized =
  //         data.authSetting && data.authSetting["scope.userInfo"];
  //       setIsAuthorized(isPhoneAuthorized); // Cập nhật state theo kết quả kiểm tra

  //       if (!isPhoneAuthorized) {
  //         console.log("Chưa cấp quyền truy cập số điện thoại.");
  //         // Xóa dữ liệu trong localStorage và hiển thị giao diện yêu cầu đăng nhập
  //         localStorage.removeItem("userData");
  //         setPhoneNumber(null); // Đặt phoneNumber thành null để hiển thị nút đăng nhập
  //       } else {
  //         console.log("Đã cấp quyền truy cập số điện thoại.");
  //         // Nếu đã cấp quyền, kiểm tra và cập nhật dữ liệu người dùng
  //         const storedUserData = localStorage.getItem("userData");
  //         if (storedUserData) {
  //           try {
  //             const userData = JSON.parse(storedUserData);
  //             const { phone, id, name, pointTotal, rank, lastUpdated } =
  //               userData;
  //             const currentTime = new Date().getTime();

  //             if (
  //               phone &&
  //               id &&
  //               pointTotal &&
  //               rank &&
  //               currentTime - lastUpdated < 60000
  //             ) {
  //               setPhoneNumber(phone);
  //               setId(id);
  //               setName(name || null);
  //               setPointTotal(pointTotal);
  //               setRanks(rank);

  //               console.log("Dữ liệu từ localStorage:");
  //               console.log("Phone:", phone);
  //               console.log("ID:", id);
  //               console.log("Name:", name || null);
  //               console.log("Point Total:", pointTotal);
  //               console.log("Rank:", rank);
  //             } else {
  //               // Xử lý trường hợp không đủ dữ liệu hoặc dữ liệu đã cũ
  //               fetchUserPointAndRank(phone);
  //             }
  //           } catch (e) {
  //             console.error("Lỗi khi parse dữ liệu từ localStorage:", e);
  //             fetchUserPointAndRank(phone);
  //           }
  //         } else {
  //           console.log(
  //             "Không tìm thấy dữ liệu người dùng trong localStorage."
  //           );
  //           fetchUserPointAndRank(phone);
  //         }
  //       }
  //     },
  //     fail: (error) => {
  //       console.log("Lỗi khi gọi getSetting:", error);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (phone) {
  //     // Nếu có số điện thoại, cập nhật dữ liệu ngay lập tức
  //     console.log("Đã có số điện thoại, cập nhật dữ liệu.");
  //     fetchUserPointAndRank(phone);
  //   } else {
  //     // Nếu không có số điện thoại, kiểm tra quyền truy cập
  //     checkPermissions();

  //     const intervalId = setInterval(() => {
  //       checkPermissions(); // Kiểm tra mỗi 10 giây
  //     }, 10000); // 10 giây

  //     return () => clearInterval(intervalId);
  //   }
  // }, [phone]);

  // useEffect(() => {
  //   if (isAuthorized && phone) {
  //     const intervalId = setInterval(() => {
  //       fetchUserPointAndRank(phone);
  //     }, 60000); // 1 phút

  //     return () => clearInterval(intervalId);
  //   }
  // }, [isAuthorized, phone]);
  //
  const handleLogin = () => {
    fetchDataLoad();
  };

  const sdt = phone;
  return (
    <Box
      className="bg-page-color"
      pb={4}
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* {showPopup && <Popup onAgree={handleAgree} onDisagree={handleDisagree} />} */}

      <div>
        <div className="px-4 pt-1">
          {!isFollowed || !phone ? (
            <Box className="bg-page-color" pb={4}>
              <div
                className="flex items-center justify-between py-2 px-1 rounded-lg"
                style={{ backgroundColor: "#9ad9d7" }}
              >
                <div className="flex space-x-2 items-center">
                  <img
                    className="w-16 h-16 rounded-full border-inset"
                    src={headerlogo}
                    alt=""
                  />
                  <div className="space-y-2">
                    <div className="text-sm">NHÀ THUỐC NAM AN</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-teal-900">
                        Nhà thuốc hàng đầu
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-1 flex flex-col justify-end space-y-1">
                  <div className="px-2 ">
                    {!isFollowed && (
                      <button
                        onClick={handleOA}
                        className="px-2  py-1 text-xs rounded-lg bg-yellow-400 h-8"
                      >
                        Quan tâm OA
                      </button>
                    )}
                  </div>
                  <div className="px-2">
                    {!phone && (
                      <button
                        onClick={handleLogin}
                        className="px-2 w-full py-1 text-xs rounded-lg bg-yellow-400 h-8"
                      >
                        Đăng nhập
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          ) : null}
          <Box
            flex
            flexDirection="column"
            className="relative zui-box-custom-bg rounded-lg  px-4 !overflow-hidden"
            onClick={() => {
              navigate("/gift");
            }}
          >
            <div className="flex flex-cols-2 justify-between items-center pt-4 px-4 ">
              <Box className="barcode-container">
                <Text.Title size="large text-white">{nameuser}</Text.Title>

                <Text size="xSmall text-white">Bậc : {ranks}</Text>
              </Box>

              <div className="zui-custom-bg-text absolute right-0 rounded-l-full px-4 py-2 text-white bg-slate-400">
                <Box>
                  <Text.Title size="small">{pointtotal}</Text.Title>
                </Box>
              </div>
            </div>
            <div className="px-10 py-4">
              <Box className="barcode-container bg-slate-100 rounded-xl">
                <Box className="px-5 py-5">
                  {!sdt ? (
                    <div className="loader"></div>
                  ) : (
                    <Barcode
                      className="w-full h-full rounded-xl"
                      value={sdt}
                      width={4}
                    />
                  )}
                </Box>
              </Box>
            </div>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Banneruser;
