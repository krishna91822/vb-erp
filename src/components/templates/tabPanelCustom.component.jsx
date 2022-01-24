import React from "react";
import Box from "@mui/material/Box";

const TabPanelCustom = (props) => {
  const { children, value, index } = props;
  return (
    <Box
      data-test="tab-panel-test"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ width: "60%", border: "1px solid black" }}>
        {value === index && <h1>{children}</h1>}
      </Box>
    </Box>
  );
};

export default TabPanelCustom;
