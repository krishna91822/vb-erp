import * as React from "react";

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import DenseTable from "./Table";
import FormDialog from "./AddEmpToPO";

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SimpleGrow() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: checked ? 230 : 50 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show Employees"
      />
      <Box sx={{ display: "flex" }}>
        <Grow in={checked}>{DenseTable()}</Grow>

        {/* <Grow in={checked}>{FormDialog()}</Grow> */}
        {/* Conditionally applies the timeout prop to change the entry speed. */}
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* <Grow in={checked}>{DenseTable()}</Grow> */}

        <Grow in={checked}>{FormDialog()}</Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
      </Box>
    </Box>
  );
}
