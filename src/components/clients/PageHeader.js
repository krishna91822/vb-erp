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
        <Grid container spacing={2} mb={5}>
          <Grid item>
            <Typography variant="h4">CIMS</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
