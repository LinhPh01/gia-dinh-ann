import React from "react";
import { Box, Text } from "zmp-ui";
import pill from "../../../assets-src/pills.png";
import fileH from "../../../assets-src/filehealthy.png";
import HearT from "../../../assets-src/heart.png";

const Listitemsheal = () => {
  return (
    <Box className="relative bg-page-color" pb={4}>
      <div>
        <div className="px-8 space-y-4">
          <div class="rounded-lg shadow-md bg-white">
            <div class="flex items-center text-end">
              <img class="h-12 py-2 px-2" src={pill} alt="" />
              <Text bold className="mx-4">
                Lịch sử mua hàng
              </Text>
            </div>
          </div>
          <div class="rounded-lg shadow-md bg-white ">
            <div class="flex items-center">
              <img class="w-12 h-12 py-2 px-2" src={fileH} alt="" />
              <Text bold className="mx-4">
                Hồ sơ y tế cá nhân
              </Text>
            </div>
          </div>
          <div class="rounded-lg shadow-md bg-white ">
            <div class="flex items-center">
              <img class="w-12 h-12 py-2 px-2" src={HearT} alt="" />
              <Text bold className="mx-4">
                Chỉ số cơ thể
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Listitemsheal;
