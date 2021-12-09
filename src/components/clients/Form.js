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
  const {
    formData,
    setformvalue,
    errors,
    companyTypes,
    handelComAddress,
    handelBrandName,
  } = UseForm();

  const [checked, setChecked] = useState(false);
  const handelAddressCheckbox = (e) => {
    setChecked(e.target.checked);
    handelComAddress(e.target.checked);
  };

  return (
    <div className="form-body">
      <form>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Legal Name"
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
          <Grid item xs={12} sm={6}>
            <div className="align-form-fields">
              <TextField
                label="Brand Name"
                variant="outlined"
                name="brandName"
                fullWidth
                required
                disabled={!editMode}
                value={formData.brandName}
                size="small"
                onChange={(e) => setformvalue(e)}
                onBlur={(e) => handelBrandName(e)}
                {...(errors.brandName && {
                  error: true,
                  helperText: errors.brandName,
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="right-float-fields">
              <TextField
                label="Domain/Sector"
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
          <Grid item xs={12} sm={6}>
            <div className="align-form-fields">
              <TextField
                label="Base Location"
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
        </Grid>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              Company Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Registered address</Typography>
          </Grid>
          <AddressFields type="registeredAddress" />
          <Grid item xs={12} ml mb={2}>
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
          <Grid item xs={12}>
            <Typography variant="h6">Communication address</Typography>
          </Grid>
          <AddressFields type="communicationAddress" />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography align="center" variant="h5">
            Tax details
          </Typography>
        </Grid>
        <Grid container spacing={2} mt={1} mb={3}>
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
                <MenuItem key={option} value={option}>
                  {option}
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
              placeholder={
                formData.companyType === "GST Registered"
                  ? "NNAAAAANNNNAXZX"
                  : "AAAAANNNNA"
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
        <Grid item xs={12} mt={3}>
          <Typography align="center" variant="h5">
            Contacts
          </Typography>
        </Grid>
        <ContactForm />
      </form>
    </div>
  );
}
