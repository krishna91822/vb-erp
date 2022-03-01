import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Card,
  Autocomplete,
} from "@mui/material";
import UseForm from "./UseForm";
import AddressFields from "./AddressFields";
import ContactForm from "./ContactForm";
import "./styles/ClientFormStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { setDomainSector } from "../../store/cims-actions";
import useStyles from "../UI/customStyle";

export default function Form() {
  const classes = useStyles();
  const editMode = useSelector((state) => state.cims.editMode);
  const { domain } = useSelector((state) => state.cims);
  const {
    formData,
    setformvalue,
    errors,
    companyTypes,
    handelComAddress,
    handelBrandName,
    handelLegalName,
  } = UseForm();

  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const handelAddressCheckbox = (e) => {
    setChecked(e.target.checked);
    handelComAddress(e.target.checked);
  };

  useEffect(() => {
    formData.communicationAddress.pincode !== "" &&
      setChecked(
        JSON.stringify(formData.communicationAddress) ===
          JSON.stringify(formData.registeredAddress)
      );
  }, [formData]);

  useEffect(() => {
    dispatch(setDomainSector());
    // eslint-disable-next-line
  }, []);

  const handleOnClick = (event, value) => {
    if (value) {
      setSelectedValue(value.value);
    }
  };

  const handleInputChange = (event, value) => {
    if (event) {
      setSelectedValue(value);
    }
  };

  const handleOnBlur = (event) => {
    if (event) {
      setformvalue(event);
    }
  };

  const dropdownValue = domain.data ? domain.data[0].dropdownArray : "";

  return (
    <div className="cims-form-body">
      <form>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12}>
            <TextField
              id=""
              label="Legal Name"
              variant="outlined"
              name="legalName"
              fullWidth
              required
              disabled={!editMode}
              className={classes.input}
              value={formData.legalName}
              size="small"
              onChange={(e) => setformvalue(e)}
              onBlur={(e) => handelLegalName(e)}
              {...(errors.legalName && {
                error: true,
                helperText: errors.legalName,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="align-form-fields">
              <TextField
                id=""
                label="Brand Name"
                variant="outlined"
                name="brandName"
                fullWidth
                required
                disabled={!editMode}
                className={classes.input}
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
              <Autocomplete
                disablePortal
                fullWidth
                disableClearable
                options={dropdownValue}
                disabled={!editMode}
                className={classes.input}
                id=""
                getOptionLabel={(option) => option.label}
                inputValue={selectedValue || formData.domain}
                onChange={handleOnClick}
                onInputChange={handleInputChange}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Domain/Sector"
                    name="domain"
                    required
                    id=""
                    onChange={(e) => handleOnBlur(e)}
                    onBlur={(e) => handleOnBlur(e)}
                    {...(errors.domain && {
                      error: true,
                      helperText: errors.domain,
                    })}
                  />
                )}
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
            <Typography variant="h6">Registered Address</Typography>
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
            <Typography variant="h6">Communication Address</Typography>
          </Grid>
          <AddressFields type="communicationAddress" />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography align="center" variant="h5">
            Tax Details
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
              className={classes.div}
              fullWidth
              label="Company Type"
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
              id=""
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
              disabled={!editMode || formData.companyType === "Overseas"}
              size="small"
              className={classes.input}
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
        <Card>
          <ContactForm />
        </Card>
      </form>
    </div>
  );
}
