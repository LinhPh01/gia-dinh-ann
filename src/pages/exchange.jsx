import React from "react";
import { Text, Box } from "zmp-ui";
import gift from "../../assets-src/gift-box.png";
import headerlogo from "../../assets-src/header.svg";
// đổi điểm
const Exchange = () => {
  return (
    <Box pb={4}>
      <div className="px-4 flex flex-cols-2 justify-between items-center">
        <div>
          <Text.Title bold>Đổi Ann ring quà</Text.Title>
          <Text>Nhận quà tại nhà thuốc gần bạn nhất</Text>
          <Text size="xxSmall">Sản phẩm tham khảo</Text>
        </div>
        <Box flex>
          <img className="h-12" src={headerlogo} alt="" />
          <img className="h-12" src={gift} alt="" />
        </Box>
        {/* <div className="flex flex-cols-2 text-nowrap">
          <Text className="text-icon" bold size="xSmallx">
            Xem thêm
          </Text>
          <Icon icon="zi-chevron-right" />
        </div> */}
      </div>
    </Box>
  );
};

export default Exchange;
