import React from "react";
import { Header, Box, Text } from "zmp-ui";

const Headerfile = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={true}
      title={
        <Box>
          <Text.Title size="small">Hồ sơ sức khoẻ</Text.Title>
        </Box>
      }
    />
  );
};

export default Headerfile;
