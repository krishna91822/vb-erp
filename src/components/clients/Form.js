import React, { useState } from "react";
import {
  Typography,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import UseForm from "./UseForm";
import AddressFields from "./AddressFields";
import ContactForm from "./ContactForm";
import "../../assets/styles/FormStyles.css";
import { useSelector } from "react-redux";

export default function Form() {
  const editMode = useSelector((state) => state.cims.editMode);
  const { formData, setformvalue, errors, companyTypes, handelComAddress } =
    UseForm();
  console.log(formData);
  const [checked, setChecked] = useState(false);
  const handelAddressCheckbox = (e) => {
    setChecked(e.target.checked);
    handelComAddress(e.target.checked);
  };

  return (
    <div className="form-body">
      <form>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={8}>
            <Typography>Legal Name of the entity</Typography>
            <TextField
              label="Enter Legal Name"
              variant="outlined"
              name="designation"
              fullWidth
              required
              disabled={!editMode}
              value={formData.designation}
              size="small"
              onChange={(e) => setformvalue(e)}
              onBlur={(e) => setformvalue(e)}
              {...(errors.designation && {
                error: true,
                helperText: errors.designation,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="align-form-fields">
              <Typography>Brand Name</Typography>
              <TextField
                label="Enter Name"
                variant="outlined"
                name="brandName"
                fullWidth
                required
                disabled={!editMode}
                value={formData.brandName}
                size="small"
                onChange={(e) => setformvalue(e)}
                onBlur={(e) => setformvalue(e)}
                {...(errors.brandName && {
                  error: true,
                  helperText: errors.brandName,
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="right-float-fields">
              <Typography>Domain/Sector</Typography>
              <TextField
                label="Enter Domain/Sector"
                variant="outlined"
                name="domain"
                fullWidth
                required
                disabled={!editMode}
                value={formData.domain}
                size="small"
                onChange={(e) => setformvalue(e)}
                onBlur={(e) => setformvalue(e)}
                {...(errors.domain && {
                  error: true,
                  helperText: errors.domain,
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="align-form-fields">
              <Typography>Base Location</Typography>
              <TextField
                label="Enter Location"
                variant="outlined"
                name="baseLocation"
                fullWidth
                value={formData.baseLocation}
                required
                disabled={!editMode}
                size="small"
                onChange={(e) => setformvalue(e)}
                onBlur={(e) => setformvalue(e)}
                {...(errors.baseLocation && {
                  error: true,
                  helperText: errors.baseLocation,
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="right-float-fields">
              <Typography>Active Client</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="label">Select a Client name</InputLabel>
                  <Select
                    name="clientName"
                    value={formData.clientName}
                    disabled={!editMode}
                    required
                    onChange={(e) => setformvalue(e)}
                    onBlur={(e) => setformvalue(e)}
                    {...(errors.clientName && {
                      error: true,
                      helperText: errors.clientName,
                    })}
                    size="small"
                    input={<OutlinedInput label="Select a Client name" />}
                  >
                    <MenuItem value={"client 1"}>client 1</MenuItem>
                    <MenuItem value={"client 2"}>client 2</MenuItem>
                    <MenuItem value={"client 3"}>client 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              Company Address
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <Typography align="center">Registered address</Typography>
              </Grid>
              <AddressFields type="registeredAddress" />
            </Grid>
            <Grid item xs={12} ml>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => handelAddressCheckbox(e)}
                  />
                }
                label="Is Communication address same as Registered address"
                variant="subtitle1"
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <Typography align="center">Communication address</Typography>
              </Grid>
              <AddressFields type="communicationAddress" />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={3}>
          <Grid item md={6}>
            <TextField
              name="companyType"
              select
              size="small"
              required
              disabled={!editMode}
              fullWidth
              label="Company type"
              value={formData.companyType}
              onChange={(e) => setformvalue(e)}
              onBlur={(e) => setformvalue(e)}
            >
              {companyTypes.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={6}>
            <TextField
              label={
                formData.companyType === "GST Registered" ? "GST No" : "PAN No"
              }
              variant="outlined"
              name={
                formData.companyType === "GST Registered"
                  ? "gstNumber"
                  : "panNumber"
              }
              fullWidth
              required
              disabled={!editMode}
              size="small"
              value={
                formData[
                  formData.companyType === "GST Registered"
                    ? "gstNumber"
                    : "panNumber"
                ]
              }
              onChange={(e) => setformvalue(e)}
              onBlur={(e) => setformvalue(e)}
              {...(errors[
                formData.companyType === "GST Registered"
                  ? "gstNumber"
                  : "panNumber"
              ] && {
                error: true,
                helperText:
                  errors[
                    formData.companyType === "GST Registered"
                      ? "gstNumber"
                      : "panNumber"
                  ],
              })}
            />
          </Grid>
        </Grid>
        <ContactForm />
      </form>
    </div>
  );
}
