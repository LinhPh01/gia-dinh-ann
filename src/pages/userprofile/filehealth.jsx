import React from "react";
import {
  Box,
  Button,
  Input,
  Page,
  Text,
  useNavigate,
  Header,
  Icon,
} from "zmp-ui";
// import HeaderUser from "./headerusername";

const Filehealth = () => {
  const navigate = useNavigate();
  return (
    <Page className="bg-page-color">
      <Header
        showBackIcon={false}
        title={
          <Box flex>
            <Icon
              icon="zi-chevron-left"
              onClick={() => {
                navigate("/userprofile");
              }}
            />
            <Text.Title size="small">Thuốc dị ứng</Text.Title>
          </Box>
        }
      ></Header>
      <Box flex flexDirection="column" alignContent="start">
        <div className="px-8 flex flex-row items-start space-x-2">
          <Button className="button">Thuốc dị ứng</Button>
          <Button
            onClick={() => {
              navigate("/filehealth2");
            }}
            className="button-2"
          >
            Bện nền
          </Button>
        </div>
        <div className="px-8 flex flex-col items-end justify-end">
          <Input></Input>

          <Text className="bt-click px-5 py-1 rounded-2xl">Thêm</Text>
        </div>
        <div className="px-8 py-4">
          <Text bold>Danh sách thuốc dị ứng</Text>
        </div>
        <div className=" grid grid-cols-1 gap-4 px-8 py-4 ">
          <div className="bg-white py-4 px-4 rounded-2xl shadow-md">
            <div className="pb-4">
              <Text>Test1</Text>
            </div>
            <div className="flex items-end justify-end">
              <Text className="bt-click px-5 rounded-2xl">Loại</Text>
            </div>
          </div>
          <div className="bg-white py-4 px-4 rounded-2xl shadow-md">
            <div className="pb-4">
              <Text>Test1</Text>
            </div>
            <div className="flex items-end justify-end">
              <Text className="bt-click px-5 rounded-2xl">Loại</Text>
            </div>
          </div>
        </div>
      </Box>
    </Page>
  );
};

export default Filehealth;
