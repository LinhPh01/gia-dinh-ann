import React from "react";
import { Box, useSnackbar, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import Ann from "../../assets-src/Ann.svg";
import care from "../../assets-src/care.svg";
import call from "../../assets-src/Call.svg";
import file from "../../assets-src/HoSo.svg";
import { openChat, openPhone } from "zmp-sdk/apis";
import { FaHospitalAlt } from "react-icons/fa";
// phần item icon support user
const Category = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  //gửi toa thuốc
  const openChatScreen = () => {
    console.log("openChatScreen called");
    openChat({
      type: "oa",
      id: "702422774429876151",
      message: "#guitoathuoc",
      success: () => {},
      fail: (err) => {
        console.error("Lỗi khi gọi API:", err);
      },
    });
  };
  const handleClick = () => {
    console.log("Clicked Gửi toa thuốc");
    openChatScreen();
  };

  //tư vấn
  const openChatScreen2 = () => {
    console.log("openChatScreen called");
    openChat({
      type: "oa",
      id: "702422774429876151",
      message: "#xinchao",
      success: () => {},
      fail: (err) => {
        console.error("Lỗi khi gọi API:", err);
      },
    });
  };
  const handleClick2 = () => {
    openChatScreen2();
  };

  //gọi đặt hàng
  const openPhoneScreen = () => {
    console.log("openChatScreen called");
    openPhone({
      phoneNumber: "19003085",
      success: () => {},
      fail: (error) => {
        console.log(error);
      },
    });
  };
  const handleClick3 = () => {
    openPhoneScreen();
  };

  //thông báo đổi ann
  // const handleClick4 = () => {
  //   openSnackbar({
  //     prefixIcon: (
  //       <FaHospitalAlt style={{ color: "#0ebeb8" }} className="w-6 h-6" />
  //     ),
  //     text: "Quý khách vui lòng đến nhà thuốc gần nhất để đổi quà!",
  //   });
  // };

  return (
    <Box className="bg-page-color relative grid grid-cols-4 gap-4" pb={4}>
      <div>
        <div className="px-4">
          <div className="rounded-lg shadow-md bg-white flex flex-cols-4 justify-between gap-4 p-4 text-nowrap ">
            <div className="flex flex-col space-y-2 items-center">
              <img
                className="w-12 h-12"
                src={Ann}
                alt=""
                onClick={() => {
                  navigate("/gift");
                }}
              />
              <Text bold size="xxSmall">
                Đổi Ann
              </Text>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <img
                className="w-12 h-12"
                src={file}
                alt="Ann icon"
                onClick={handleClick}
              />
              <Text bold size="xxSmall" onClick={handleClick}>
                Gửi toa thuốc
              </Text>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <img
                className="w-12 h-12"
                src={call}
                alt=""
                onClick={handleClick3}
              />
              <Text bold size="xxSmall" onClick={handleClick3}>
                Gọi đặt hàng
              </Text>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <img
                className="w-12 h-12"
                src={care}
                alt=""
                onClick={handleClick2}
              />
              <Text bold size="xxSmall" onClick={handleClick2}>
                Tư vấn
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Category;
