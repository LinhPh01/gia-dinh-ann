import React, { useState, useEffect } from "react";
import { BottomNavigation } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { HiGift } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Trang Chủ");

  useEffect(() => {
    // Xác định tab active dựa trên đường dẫn hiện tại
    switch (location.pathname) {
      case "/":
        setActiveTab("home");
        break;
      case "/gift":
        setActiveTab("gif");
        break;
      case "/userprofile":
        setActiveTab("me");
        break;
      // default:
      //   setActiveTab("Trang Chủ");
      //   break;
    }
  }, [location]);

  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => {
        setActiveTab(key);
        switch (key) {
          case "home":
            navigate("/");
            break;
          case "gif":
            navigate("/gift");
            break;
          case "me":
            navigate("/userprofile");
            break;
          // default:
          //   navigate("");
          //   break;
        }
      }}
      className="z-50 zalo-mini bottom-nav-container"
    >
      <BottomNavigation.Item
        key="home"
        label="Trang Chủ"
        className={
          activeTab === "home" ? "bottom-nav-item-active" : "bottom-nav-item"
        }
        icon={
          <HiHome
            className={
              activeTab === "home"
                ? "bottom-nav-icon-active"
                : "bottom-nav-icon"
            }
          />
        }
      />

      <BottomNavigation.Item
        label="Đổi Quà"
        className={
          activeTab === "gif" ? "bottom-nav-item-active" : "bottom-nav-item"
        }
        key="gif"
        icon={
          <HiGift
            className={
              activeTab === "gif" ? "bottom-nav-icon-active" : "bottom-nav-icon"
            }
          />
        }
      />

      <BottomNavigation.Item
        key="me"
        label="Cá nhân"
        className={
          activeTab === "me" ? "bottom-nav-item-active" : "bottom-nav-item"
        }
        icon={
          <FaUser
            className={
              activeTab === "me" ? "bottom-nav-icon-active" : "bottom-nav-icon"
            }
          />
        }
      />
    </BottomNavigation>
  );
};

export default BottomNav;
