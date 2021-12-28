import React from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cimsActions } from "../../store/cims-slice";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ClientHelpers from "./ClientHelpers";

export default function PageHeader() {
  const dispatch = useDispatch();

  const {
    sortBy,
    filterBy,
    sortingOrder,
    handelSortBy,
    handelFilterBy,
    handelSortingOrder,

    user,
  } = ClientHelpers();

  const sortByFields = [
    { id: "createdAt", label: "By Start Date" },
    { id: "brandName", label: "By Company" },
    { id: "contacts.primaryContact.firstName", label: "By Associate Name" },
    { id: "registeredAddress.country", label: "By Location" },
  ];

  const filterByFields = [
    { id: 1, label: "Active Client" },
    { id: 0, label: "Inactive Client" },
  ];

  const handleSortBy = (e) => {
    handelSortBy(e.target.value);
  };

  const handleFilterBy = (e) => {
    handelFilterBy(e.target.value);
  };

  const handleSortOrder = (e) => {
    handelSortingOrder(e.target.checked);
  };

  const handleCreate = () => {
    dispatch(cimsActions.resetForm());
  };

  return (
    <>
      <Grid mt={2}>
        <Grid container spacing={2} mb={1}>
          <Grid item>
            <Typography variant="h4">CIMS</Typography>
          </Grid>
          <Grid item sm></Grid>
          {user.permissions.includes("create_CIMS_module") && (
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
          )}
          <Grid item>
            <FormControl size="small">
              <InputLabel id="filterBy">Filter By</InputLabel>
              <Select
                labelId="filterBy"
                id="select"
                value={filterBy}
                label="filterBy"
                onChange={handleFilterBy}
              >
                {filterByFields.map((field) => (
                  <MenuItem key={field.id} value={field.id}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="sortBy">Sort By</InputLabel>
              <Select
                labelId="sortBy"
                id="select"
                value={sortBy}
                label="sortBy"
                onChange={handleSortBy}
              >
                {sortByFields.map((field) => (
                  <MenuItem key={field.id} value={field.id}>
                    {field.label}
                  </MenuItem>
                ))}

                <Divider sx={{ borderBottomWidth: 2 }} component="li" />

                <FormControlLabel
                  sx={{
                    marginLeft: ".5rem",
                  }}
                  control={
                    <Checkbox
                      onChange={(e) => handleSortOrder(e)}
                      size="small"
                      checked={sortingOrder === 1}
                    />
                  }
                  label={<SortByAlphaIcon />}
                />
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ borderBottomWidth: 2 }} />
    </>
  );
}
