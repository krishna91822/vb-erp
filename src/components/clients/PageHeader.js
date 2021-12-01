import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cimsActions } from "../../store/cims-slice";

export default function PageHeader() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const values = [
    "None",
    "By ID",
    "By location",
    "By start date",
    "By Status",
    "By associate name",
    "By CompanyUID",
  ];
  const handleSortBy = (e) => {
    if (e.target.value === "None") {
      setSortBy("");
    } else {
      setSortBy(e.target.value);
    }
  };

  const handleCreate = () => {
    dispatch(cimsActions.resetForm());
  };

  return (
    <>
      <Grid container justifyContent="flex-end" mb={1}>
        <Typography variant="body1">User-Admin/Approver</Typography>
      </Grid>
      <Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item>
            <Typography variant="h4">CIMS</Typography>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Link to="/cims/create" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCreate}
                variant="contained"
                style={{ backgroundColor: "chocolate" }}
              >
                Create a customer
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="sortBy">sort by</InputLabel>
              <Select
                labelId="sortBy"
                id="select"
                value={sortBy}
                label="sortBy"
                onChange={handleSortBy}
              >
                {values.map((values) => (
                  <MenuItem key={values} value={values}>
                    {values}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
