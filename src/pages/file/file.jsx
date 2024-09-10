import React from "react";
import { Box } from "zmp-ui";

const Filehealth = () => {
  return (
    <Box className="bg-teal-50" pb={4}>
      <div>
        <div className="px-8 py-8">
          <Box
            className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
            style={{ backgroundColor: "#37deb7" }}
          />
        </div>
      </div>
    </Box>
  );
};

export default Filehealth;
