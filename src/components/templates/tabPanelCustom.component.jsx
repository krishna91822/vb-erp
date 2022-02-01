import React from "react";
import Box from "@mui/material/Box";

const TabPanelCustom = (props) => {
  const { children, value, index } = props;
  return (
    <Box
      data-test="tab-panel-test"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ width: "50%" }}>{value === index && <h1>{children}</h1>}</Box>
    </Box>
  );
};

export default TabPanelCustom;
