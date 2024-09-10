import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import PageFile from "../pages/file";
import PageGift from "../pages/gift";
import PageUser1 from "../pages/userprofile";
import AboutPage from "../pages/userprofile/about";
import UserPage from "../pages/userprofile/user";
import FormUser from "../pages/userprofile/form";
import Filehealth from "../pages/userprofile/filehealth";
import Filehealth2 from "../pages/userprofile/filehealth2";
import Profile from "../pages/userprofile/profile";
import BottomNav from "./bottomnav";
import Popup from "../pages/popup";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route
                path="/userprofile"
                element={<PageUser1></PageUser1>}
              ></Route>
              <Route path="/profile" element={<Profile></Profile>}></Route>
              <Route
                path="/filehealth"
                element={<Filehealth></Filehealth>}
              ></Route>
              <Route
                path="/filehealth2"
                element={<Filehealth2></Filehealth2>}
              ></Route>
              <Route path="/about" element={<AboutPage></AboutPage>}></Route>
              <Route path="/user" element={<UserPage></UserPage>}></Route>
              <Route path="/form" element={<FormUser></FormUser>}></Route>
              <Route path="/file" element={<PageFile></PageFile>}></Route>
              <Route path="/gift" element={<PageGift></PageGift>}></Route>
              <Route path="/popup" element={<Popup></Popup>}></Route>
            </AnimationRoutes>
            <BottomNav />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
