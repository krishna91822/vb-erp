import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import DenseTable from "./Table";
import FormDialog from "./AddEmpToPO";
import { fetchPOs_emp_data } from "../../../store/CMS/POSOW-actions";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const params = useParams();
  let popup = useSelector((state) => state.CMS_state.popup);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    if (checked) {
      dispatch(fetchPOs_emp_data(params.id));
    }
  }, [checked, popup]);

  return (
    <Box sx={{ height: checked ? 300 : 50 }}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            data-testid="empListGrowin"
          />
        }
        label={<strong>View Assigned Employees</strong>}
        sx={{ margin: "0.5rem" }}
      />
      <Box sx={{ display: "flex" }}>
        <Grow in={checked}>{DenseTable()}</Grow>
      </Box>
      <Box
        sx={{
          display: "flex",
          float: "right",
          marginTop: "0.3rem",
          marginRight: "0.5rem",
        }}
      >
        <Grow in={checked}>{FormDialog({ edit: false })}</Grow>
      </Box>
    </Box>
  );
}
