import React, { Suspense } from "react";
import { Page, Box } from "zmp-ui";
import Category from "./category";
import Headerr from "./headeruser";
import Swiperbanner from "./swiperbanner";
import Exchange from "./exchange";
import Swipermedicin from "./swipermedicin";
import { RecoilRoot } from "recoil";
import Banneruser from "./banneruser";

//Trang chủ

const HomePage = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-page-color">
      <Headerr />
      <Box className="flex-1 overflow-auto">
        <RecoilRoot>
          <Suspense fallback="loading">
            <Banneruser />
            <Category />
          </Suspense>
        </RecoilRoot>
        <Swiperbanner />
        <Exchange />
        <Suspense>
          <Swipermedicin />
        </Suspense>
      </Box>
    </Page>
  );
};

export default HomePage;
