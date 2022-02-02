/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { cimsActions } from "../../store/cims-slice";
import ClientHelpers from "./ClientHelpers";

export default function PageHeader() {
  const dispatch = useDispatch();

  const { handelSortBy, handelFilterBy, handelSortingOrder } = ClientHelpers();

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
