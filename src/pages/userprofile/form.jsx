import React, { useEffect } from "react";
import { Text, Box, useNavigate, useSnackbar, Checkbox } from "zmp-ui";
import { useRecoilState } from "recoil";
import {
  displayNameState,
  idState,
  emailState,
  ageState,
  genderState,
  locationState,
  allergyState,
  underlyingdiseaseState,
  phoneNumberState,
} from "../../state";
import HeaderEdit from "./headeredit";
import headerlogo from "../../../assets-src/header.svg";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";

const FormPage = () => {
  const navigate = useNavigate();
  const [phone, setPhoneNumber] = useRecoilState(phoneNumberState);
  const [id, setId] = useRecoilState(idState);
  const [name, setName] = useRecoilState(displayNameState);
  const [age, setAge] = useRecoilState(ageState);
  const [gender, setGender] = useRecoilState(genderState);
  const [email, setEmail] = useRecoilState(emailState);
  const [address, setAddress] = useRecoilState(locationState);
  const [allergy, setAllergy] = useRecoilState(allergyState);
  const [underlyingdisease, setUnderlyingdisease] = useRecoilState(
    underlyingdiseaseState
  );

  const { openSnackbar } = useSnackbar(); // sử dụng thanh thông báo snackbar
  const secretKey = "K2UHm5uysg8RfBiDA846";
  //

  // const secretKey = "K2UHm5uysg8RfBiDA846"; // mã key getphone

  // const processPhoneNumber = (phoneNumber) => {
  //   // chuyển số điện thoại +84 thành 0
  //   if (phoneNumber.startsWith("84")) {
  //     return "0" + phoneNumber.substring(2);
  //   }
  //   return phoneNumber;
  // };
  // useEffect lấy số điện thoại khi vừa mở app
  // const checkLocalStorage = () => {
  //   const storedUserData = localStorage.getItem("userData");

  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);

  //     console.log("Dữ liệu từ localStorage:", userData);

  //     if (userData.phone) {
  //       console.log("Số điện thoại:", userData.phone);
  //       // Thực hiện các hành động khác với userData nếu cần
  //     } else {
  //       console.log("Không có số điện thoại hợp lệ trong localStorage.");
  //     }
  //   } else {
  //     console.log("Không tìm thấy dữ liệu trong localStorage.");
  //   }
  // };
  // useEffect(() => {
  //   checkLocalStorage();
  //   //     const storedUserData = localStorage.getItem("userData");

  //   // if (storedUserData) {
  //   //     const userData = JSON.parse(storedUserData);
  //   //     const phoneNumber = userData.phone;

  //   //     if (phoneNumber) {
  //   //         console.log("Số điện thoại lấy được từ localStorage:", phoneNumber);
  //   //         // Sử dụng số điện thoại trong logic của bạn
  //   //     } else {
  //   //         console.log("Không có số điện thoại trong localStorage");
  //   //     }
  //   // } else {
  //   //     console.log("Không tìm thấy dữ liệu trong localStorage");
  //   // }
  //   // lưu dữ liệu lại trong localStorage để hiển thị cho đến khi có thay đổi khác
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);

  //     if (userData.phone) {
  //       setPhoneNumber(userData.phone);
  //       setName(userData.name);
  //       setGender(userData.gender);
  //       setAge(userData.age);
  //       setEmail(userData.email);
  //       setAddress(userData.address);
  //       setAllergy(userData.allergy);
  //       setUnderlyingdisease(userData.underlying_disease);
  //     } else {
  //       setPhoneNumber(null);
  //       console.log("Không có số điện thoại hợp lệ trong localStorage.");
  //     }
  //   } else {
  //     setPhoneNumber(null);
  //     console.log("Không tìm thấy dữ liệu trong localStorage.");
  //   }
  // }, [
  //   setPhoneNumber,
  //   setName,
  //   setGender,
  //   setAge,
  //   setEmail,
  //   setAddress,
  //   setAllergy,
  //   setUnderlyingdisease,
  // ]);
  //
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

                localStorage.removeItem("phone"); // Xóa số điện thoại nếu không nhận được từ API
              }
            } catch (error) {
              console.error("Lỗi khi gọi API: ", error);
            }
          },
          fail: (error) => {
            console.log(error);
            localStorage.removeItem("phone");
          },
        });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  //
  useEffect(() => {
    fetchDataLoad();
  }, []);
  //
  // useEffect(() => {
  //   const storedPhone = localStorage.getItem("phone");
  //   if (storedPhone) {
  //     // setPhoneNumber(storedPhone);

  //     fetchUserPointAndRank(storedPhone);
  //   } else {
  //     console.log("Không tìm thấy số điện thoại trong localStorage.");
  //     localStorage.removeItem("userData");
  //   }
  // }, []);
  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     try {
  //       const userData = JSON.parse(storedUserData);
  //       const { phone, id, name, address, lastUpdated } = userData;
  //       const currentTime = new Date().getTime();

  //       if (phone && id && address && currentTime - lastUpdated < 60000) {
  //         setPhoneNumber(phone);
  //         setId(id);
  //         setName(name || null);
  //         setAddress(address || null);

  //         console.log("Dữ liệu từ localStorage:");
  //         console.log("Phone:", phone);
  //         console.log("ID:", id);
  //         console.log("Name:", name || null);
  //         console.log("Address", address || null);
  //       } else {
  //         // Xử lý trường hợp không đủ dữ liệu hoặc dữ liệu đã cũ
  //         localStorage.removeItem("userData");
  //         if (phone) {
  //           fetchUserPointAndRank(phone);
  //         } else {
  //           console.log("Không có số điện thoại để fetch dữ liệu.");
  //           // Có thể yêu cầu người dùng nhập số điện thoại ở đây
  //         }
  //       }
  //     } catch (e) {
  //       console.error("Lỗi khi parse dữ liệu từ localStorage:", e);
  //       // Có thể yêu cầu người dùng nhập số điện thoại ở đây
  //       fetchUserPointAndRank();
  //     }
  //   } else {
  //     console.log("Không tìm thấy dữ liệu người dùng trong localStorage.");
  //     // Có thể yêu cầu người dùng nhập số điện thoại ở đây
  //     fetchUserPointAndRank();
  //   }

  //   const intervalId = setInterval(() => {
  //     const storedPhone = localStorage.getItem("phone");
  //     if (storedPhone) {
  //       fetchUserPointAndRank(storedPhone);
  //     }
  //   }, 60000); // 1 phút

  //   return () => clearInterval(intervalId);
  // }, []);

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
      setName(updatedUserData.name);
      setGender(updatedUserData.gender);
      setEmail(updatedUserData.email);
      setAge(updatedUserData.age);
      setAllergy(updatedUserData.allergy);
      setUnderlyingdisease(updatedUserData.underlying_disease);
      setAddress(updatedUserData.address);
    } catch (error) {
      console.error("Fetch lỗi:", error);
    }
  };
  // api update thay đổi thông tin người dùng nếu không nhập gì trả về null
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      phone,
      name,
      age,
      gender,
      email,
      allergy,
      underlying_disease: underlyingdisease,
      address,
    });

    const response = await fetch(
      "https://miniapp.nhathuocnaman.com/api/storeCustomer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "8AF1apnMW2A39Ip7LUFtNstE5RjYleSf",
          phone: phone || null,
          name: name || null,
          age: age || null,
          gender: gender || null,
          email: email || null,
          allergy: allergy || null,
          underlying_disease: underlyingdisease || null,
          address: address || null,
        }),
      }
    );
    if (!response.ok) {
      console.error(`lỗi response: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log("data về:", data.data);

    if (data.data) {
      setPhoneNumber(data.data.phone);
      setName(data.data.name);
      setGender(data.data.gender);
      setAge(data.data.age);
      setEmail(data.data.email);
      setAddress(data.data.address);
      setAllergy(data.data.allergy);
      setUnderlyingdisease(data.data.underlying_disease);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          phone: data.data.phone,
          name: data.data.name,
          gender: data.data.gender,
          age: data.data.age,
          email: data.data.email,
          address: data.data.address,
          allergy: data.data.allergy,
          underlying_disease: data.data.underlying_disease,
        })
      );

      openSnackbar({
        text: "Thông tin đã được lưu thành công!",
        type: "success",
        duration: 3000,
      });
    } else {
      console.log("Không nhận được ID người dùng từ API.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className="bg-page-color">
      <HeaderEdit />
      <Box mx={4} pb={10} mt-4>
        <Box
          flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className="bg-page-color"
        >
          <Box
            flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Text.Title style={{ color: "#06afaa" }}>{name}</Text.Title>
            </Box>
            <Box ml={2}>
              <img
                className="w-10 h-10 rounded-lg border-inset"
                src={headerlogo}
                alt=""
              />
            </Box>
          </Box>
        </Box>
        <Box mt={4} pb={4}>
          <div className="px-10">
            <div className="flex flex-col space-y-4">
              <textarea
                className="rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên người dùng"
                style={{
                  height: "45px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  border: "2px solid #0ebeb8",
                }}
              />
              <Box flex flexDirection="row" className="space-x-2">
                <Checkbox
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="px-2"
                >
                  Nam
                </Checkbox>
                <Checkbox
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                >
                  Nữ
                </Checkbox>
              </Box>
              <textarea
                className="rounded-lg"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Tuổi"
                style={{
                  height: "45px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "2px solid #0ebeb8",
                }}
              />

              <textarea
                className="rounded-lg"
                value={phone}
                readOnly
                // onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Số điện thoại"
                style={{
                  height: "45px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "2px solid #0ebeb8",
                }}
              />
              <textarea
                className="rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@mail"
                style={{
                  height: "45px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "2px solid #0ebeb8",
                }}
              />
              <textarea
                className="rounded-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Địa chỉ"
                style={{
                  height: "45px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "2px solid #0ebeb8",
                }}
              />
              <textarea
                className="rounded-lg"
                value={allergy}
                onChange={(e) => setAllergy(e.target.value)}
                placeholder="Dị ứng"
                style={{
                  height: "80px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  boxSizing: "border-box",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  border: "2px solid #0ebeb8",
                }}
              />
              <textarea
                flex
                alignItems="start"
                value={underlyingdisease}
                className="rounded-lg"
                onChange={(e) => setUnderlyingdisease(e.target.value)}
                placeholder="Bệnh nền"
                style={{
                  height: "80px",
                  width: "100%",
                  fontSize: "16px",
                  resize: "none",
                  padding: "12px",
                  boxSizing: "border-box",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  border: "2px solid #0ebeb8",
                }}
              />
              <div className="flex items-center justify-center space-x-4">
                <Box
                  style={{ backgroundColor: "#0cb2ac" }}
                  className="rounded-3xl px-4"
                  flex
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text className="px-4 py-4 text-white" onClick={handleSubmit}>
                    Lưu thông tin
                  </Text>
                </Box>
                <Box
                  style={{ backgroundColor: "#0cb2ac" }}
                  className="rounded-3xl space-x-1"
                  flex
                  alignItems="center"
                  justifyContent="center"
                  variant="secondary"
                >
                  <Text className="px-4 py-4 text-white" onClick={handleBack}>
                    Trở về
                  </Text>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPage;
