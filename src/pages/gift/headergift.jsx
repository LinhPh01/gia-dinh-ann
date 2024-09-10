import React from "react";
import { Header, Box, Text, Icon, useNavigate } from "zmp-ui";

const Headergift = () => {
  const navigate = useNavigate();
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        <Box flex>
          <Icon
            icon="zi-chevron-left"
            onClick={() => {
              navigate("/");
            }}
          />
          <Text.Title size="small">Đổi quà</Text.Title>
        </Box>
      }
    />
  );
};

export default Headergift;
