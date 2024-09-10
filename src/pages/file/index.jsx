import React from "react";
import { Page, Box } from "zmp-ui";
import Headerfile from "./headerfile";
import Filehealth from "./file";
import Listitemsheal from "./listitemsheal";

const PageFile = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-teal-50">
      <Headerfile />
      <Box className="flex-1 overflow-auto">
        <Filehealth />
        <Listitemsheal />
      </Box>
    </Page>
  );
};

export default PageFile;
