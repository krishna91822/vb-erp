import React from "react";
import {
  Box,
  Grid,
  Button,
  Tab,
  TextField,
  MenuItem,
  Menu,
  FormControl,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AddRounded as AddRoundedIcon,
  KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
} from "@mui/icons-material";
import UseForm from "./UseForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "../../assets/styles/FormStyles.css";
import { useSelector } from "react-redux";

export default function AddressFields() {
  const editMode = useSelector((state) => state.cims.editMode);

  const {
    contacts,
    n,
    addOthers,
    value,
    setValue,
    handleAddOthers,
    fields,
    formData,
    ComCcode,
    setformvalue,
    errors,
    handelMobile,
    handleClick,
    anchorEl,
    handleClose,
    handleOthers,
    open,
  } = UseForm();

  const tabs = contacts.map((contact) => (
    <Tab
      key={contact.title}
      label={contact.label}
      value={contact.title}
      sx={{ textTransform: "none" }}
    />
  ));

  const dropdown = (
    <Grid>
      <FormControl size="small">
        <Button
          size="small"
          id="othersBtn"
          sx={{ color: "gray", borderColor: "white" }}
          variant="outlined"
          aria-haspopup="true"
          aria-controls="others"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
        <Menu
          id="others"
          sx={{ maxHeight: 230, overflow: "visible" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "othersBtn",
          }}
        >
          {[...Array(n - 3)].map((e, i) => {
            return (
              <MenuItem
                key={i + 1}
                data-label={`Other Contact ${i + 1}`}
                data-title={`otherContact${i + 1}`}
                onClick={handleOthers}
              >
                {`Other Contact ${i + 1}`}
              </MenuItem>
            );
          })}
        </Menu>
      </FormControl>
    </Grid>
  );

  const contactFields = fields.map((field) => {
    const data = formData.contacts[value];
    if (field.id === "contactNumber" || field.id === "otherContactNumber") {
      return (
        <Grid item xs={12} md={4} key={`${value}.${field.id}`}>
          <PhoneInput
            inputProps={{
              required: true,
            }}
            inputStyle={{
              borderColor: errors["contacts"][value][field.id] && "red",
              border: errors["contacts"][value][field.id] && "1px solid red",
              "&:focus": {
                border: "2px solid red",
                borderColor: "red",
              },
            }}
            specialLabel={field.label}
            country={ComCcode}
            disabled={!editMode}
            value={data[field.id]}
            onChange={(phone) => handelMobile(phone, field.id)}
          />
          {errors["contacts"][value][field.id] && (
            <p className="error">{errors["contacts"][value][field.id]}</p>
          )}
        </Grid>
      );
    }
    return (
      <Grid item xs={12} sm={6} md={4} key={`${value}.${field.id}`}>
        <TextField
          variant="outlined"
          label={field.label}
          name={value}
          id={field.id}
          value={data[field.id]}
          disabled={!editMode}
          onChange={(e) => setformvalue(e)}
          onBlur={(e) => setformvalue(e)}
          fullWidth
          size="small"
          autoComplete="none"
          {...(errors["contacts"][value][field.id] && {
            error: true,
            helperText: errors["contacts"][value][field.id],
          })}
        />
      </Grid>
    );
  });

  return (
    <div className="contact-form">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              border: 1,
              borderBottom: 2,
              borderColor: "divider",
            }}
          >
            <TabList
              variant="scrollable"
              onChange={(e, newValue) => setValue(newValue)}
            >
              {tabs}
              {n > 3 ? dropdown : <div></div>}
              <Grid container>
                <Button
                  id="addOthersBtn"
                  sx={{ color: "gray", borderColor: "white" }}
                  variant={!addOthers ? "contained" : "outlined"}
                  onClick={handleAddOthers}
                  disabled={!addOthers}
                >
                  <AddRoundedIcon sx={{ fontSize: "2rem" }} />
                </Button>
              </Grid>
            </TabList>
          </Box>
          <TabPanel value={value}>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {contactFields}
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
