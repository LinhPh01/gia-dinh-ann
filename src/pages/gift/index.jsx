import React from "react";
import { Page, Box } from "zmp-ui";
import Headergift from "./headergift";

import Listproduct from "./listproduct";
// trang đổi quà từ điểm Ann
const PageGift = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-page-color">
      <Headergift />
      <Box className="flex-1 overflow-auto">
        <Listproduct />
      </Box>
    </Page>
  );
};

export default PageGift;
