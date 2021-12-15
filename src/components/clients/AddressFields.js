import React from "react";
import {
  InputLabel,
  Select,
  Grid,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import UseForm from "./UseForm";
import "../../assets/styles/FormStyles.css";
import { useSelector } from "react-redux";

export default function AddressFields(props) {
  const {
    formData,
    setAddress,
    countries,
    locReg,
    locCom,
    errors,
    addressFields,
    handelCountry,
    handelAddressOnBlur,
  } = UseForm();
  const loc = props.type === "registeredAddress" ? locReg : locCom;
  const editMode = useSelector((state) => state.cims.editMode);
  return addressFields.map((field) => {
    const gridStyle =
      field.name === "addressLine1" || field.name === "addressLine2" ? 12 : 6;
    if (field.name === "country") {
      return (
        <Grid item xs={12} sm={gridStyle}>
          <FormControl size="small" fullWidth>
            <InputLabel id="country">{field.label}</InputLabel>
            <Select
              labelId="country"
              name={field.name}
              value={formData[props.type][field.name]}
              label={field.label}
              disabled={!editMode}
              onChange={(e) => handelCountry(e, props.type)}
            >
              {Object.keys(countries).map((key) => (
                <MenuItem
                  key={key}
                  value={`${countries[key].name}-${countries[key].code}`}
                >
                  {countries[key].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      );
    }
    if (
      field.name === "district" &&
      formData[props.type].pincode !== "" &&
      formData[props.type].state !== "" &&
      Object.keys(loc["districts"]).length > 1
    ) {
      return (
        <Grid item xs={12} sm={gridStyle}>
          <FormControl size="small" fullWidth>
            <InputLabel id="district">{field.label}</InputLabel>
            <Select
              labelId="district"
              name={field.name}
              value={formData[props.type][field.name]}
              label={field.label}
              disabled={!editMode}
              onChange={(e) => handelCountry(e, props.type)}
              onBlur={(e) => handelCountry(e, props.type)}
            >
              {Object.keys(loc["districts"]).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      );
    }
    if (
      field.name === "area" &&
      formData[props.type].district !== "" &&
      formData[props.type].pincode !== "" &&
      loc["districts"][formData[props.type]["district"]].length > 1
    ) {
      return (
        <Grid item xs={12} sm={gridStyle}>
          <FormControl size="small" fullWidth>
            <InputLabel id="area">{field.label}</InputLabel>
            <Select
              labelId="area"
              name={field.name}
              value={formData[props.type][field.name]}
              label={field.label}
              disabled={!editMode}
              onChange={(e) => handelCountry(e, props.type)}
              onBlur={(e) => handelCountry(e, props.type)}
            >
              {loc["districts"][formData[props.type]["district"]].map(
                (dist) => (
                  <MenuItem key={dist} value={dist}>
                    {dist}
                  </MenuItem>
                )
              ) || ""}
            </Select>
          </FormControl>
        </Grid>
      );
    }
    return (
      <Grid item xs={12} sm={gridStyle}>
        <TextField
          label={field.label}
          variant="outlined"
          name={field.name}
          fullWidth
          size="small"
          disabled={!editMode}
          value={formData[props.type][field.name]}
          onChange={(e) => setAddress(e, props.type)}
          onBlur={(e) => handelAddressOnBlur(e, props.type)}
          {...(errors[props.type][field.name] && {
            error: true,
            helperText: errors[props.type][field.name],
          })}
        />
      </Grid>
    );
  });
}
