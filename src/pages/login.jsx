import React, { useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  totalPointState,
  ranksState,
  displayNameState,
  idState,
  phoneNumberState,
} from "../state";

import { Box } from "zmp-ui";
import { followOA } from "zmp-sdk/apis";
// import logo from "../../assets-src/logo.png";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";

const Login = () => {
  const secretKey = "K2UHm5uysg8RfBiDA846";
  const [phone, setPhoneNumber] = useRecoilState(phoneNumberState);
  const setId = useSetRecoilState(idState);
  const id = useRecoilValue(idState);
  const setName = useSetRecoilState(displayNameState);
  const nameuser = useRecoilValue(displayNameState);
  const [pointtotal, setPointTotal] = useRecoilState(totalPointState);
  const [ranks, setRanks] = useRecoilState(ranksState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const follow = async () => {
    try {
      await followOA({
        id: "702422774429876151",
      });
      setIsLoggedIn(true);
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

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
      setPointTotal(updatedUserData.pointTotal);
      setPhoneNumber(updatedUserData.phone);

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
  //

  const handleLogin = () => {
    fetchDataLoad();
  };
  const handleOA = () => {
    follow();
  };

  return (
    <Box pb={4} className="bg-page-color">
      <div className="pt-4 flex items-center justify-between">
        {/* <div className="px-4">
          {!isLoggedIn && (
            <button
              onClick={handleOA}
              className="px-4 py-2 rounded-lg bg-yellow-400"
            >
              Quan tâm OA
            </button>
          )}
        </div> */}
        <div className="px-4">
          {!phone && (
            <button
              onClick={handleLogin}
              className="px-4 py-2 rounded-lg bg-yellow-400"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Login;
