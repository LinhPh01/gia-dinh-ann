import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, useSnackbar, Box, Text } from "zmp-ui";
import headerlogo from "../../../assets-src/header.svg";
import qr from "../../../assets-src/qr.jpg";
import { saveImageToGallery, openShareSheet } from "zmp-sdk/apis";
import { PiDownloadSimple } from "react-icons/pi";
import { IoMdShare } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  // const [phone, setPhoneNumber] = useState(null);

  // click

  // useEffect(() => {
  //   if (fetchTriggered && phoneNumber) {
  //     localStorage.setItem("phoneNumber", phoneNumber);
  //     console.log("Số điện thoại đã được lưu vào localStorage:", phoneNumber);
  //     fetchDataLoad();
  //   }
  // }, [fetchTriggered, phoneNumber]);
  //down
  const saveImage = async () => {
    try {
      await saveImageToGallery({
        imageUrl: "https://i.imgur.com/xFlay85.jpeg",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //share
  const shareLink = async () => {
    try {
      const data = await openShareSheet({
        type: "link",
        data: {
          link: "https://zalo.me/s/4587223428562495661/?utm_source=zalo-qr",
          chatOnly: false,
        },
      });
    } catch (err) {}
  };

  const downClick = async () => {
    console.log("down", openSnackbar);
    await saveImage();
    openSnackbar({
      prefixIcon: (
        <PiDownloadSimple style={{ color: "#0ebeb8" }} className="w-6 h-6" />
      ),
      text: "Đã tải xuống!",
    });
  };

  const ShareClick = () => {
    shareLink();
  };
  const handleClick = () => {
    // Gọi hàm fetchDataLoad trước
    // fetchDataLoad();

    // Sau đó chuyển hướng đến "/form"
    navigate("/form");
  };

  return (
    <Page className="page">
      <div className="section-container">
        <Box
          flex
          alignItems="center"
          className="space-x-2"
          justifyContent="center"
        >
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="w-12 h-12 rounded-lg border-inset"
              src={headerlogo}
              alt=""
            />
            <Box>
              <Text.Title size="small">Hồ sơ cá nhân</Text.Title>
            </Box>
          </Box>
        </Box>
      </div>
      <div className="section-container">
        <List>
          {/* <List.Item onClick={fetchDataLoad}>
            <div>Yêu cầu quyền truy cập số điện thoại</div>
          </List.Item> */}
          <List.Item
            onClick={handleClick}
            suffix={<Icon icon="zi-user-settings" />}
          >
            <div>Thông tin cá nhân</div>
          </List.Item>

          {/* <List.Item
            onClick={() => navigate("/")}
            suffix={<Icon icon="zi-arrow-left" />}
          >
            <div>Trở về</div>
          </List.Item> */}
          <Box>
            <img className="h-full w-full py-9" src={qr} alt="" />
          </Box>
          <div className="flex items-center justify-center space-x-8">
            <Box
              style={{ backgroundColor: "#0cb2ac" }}
              className="rounded-3xl px-4"
              flex
              alignItems="center"
              justifyContent="center"
            >
              <div className="px-4 py-4 flex items-center space-x-1">
                <PiDownloadSimple className="text-white" />
                <Text className=" text-white" onClick={downClick}>
                  Tải xuống
                </Text>
              </div>
            </Box>
            <Box
              style={{ backgroundColor: "#0cb2ac" }}
              className="rounded-3xl space-x-1"
              flex
              alignItems="center"
              justifyContent="center"
              variant="secondary"
            >
              <div className="px-4 py-4 flex items-center space-x-1">
                <IoMdShare className="text-white" />
                <Text className=" text-white" onClick={ShareClick}>
                  chia sẻ
                </Text>
              </div>
            </Box>
          </div>
        </List>
      </div>
    </Page>
  );
};

export default Profile;
