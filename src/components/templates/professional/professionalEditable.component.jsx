import React, { useState } from "react";

import { Grid, Box, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { TitleTypo } from "../../UI/commonStyles";

import { CustomTextField, ContentBox } from "./professionalEditable.styles";

import { professionalConstant } from "./professional.constant";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import AsyncSelect from "react-select/async";
import axiosInstance from "./../../../helpers/axiosInstance";

const ProfessionalEditable = ({
  empData,
  setEmpData,
  professionalDetails,
  setProfessionalDetails,
}) => {
  const {
    empBand,
    empGraduation,
    empGraduationUniversity,
    empPostGraduation,
    empPostGraduationUniversity,
    yearsOfExperience,
  } = empData;

  const [UGDropdown, setUGDropdown] = useState(
    empGraduationUniversity
      ? { label: empGraduationUniversity, value: empGraduationUniversity }
      : null
  );
  const [PGDropdown, setPGDropdown] = useState(
    empPostGraduationUniversity
      ? {
          label: empPostGraduationUniversity,
          value: empPostGraduationUniversity,
        }
      : null
  );
  const handleUGChange = (newValue) => {
    if (newValue.value === "others") {
      setUGDropdown({ label: newValue.value, value: newValue.value });
      setEmpData({ ...empData, empGraduationUniversity: "" });
      return;
    }
    setEmpData({ ...empData, empGraduationUniversity: newValue.value });
    setUGDropdown({ label: newValue.value, value: newValue.value });
  };
  const handlePGChange = (newValue) => {
    if (newValue.value === "others") {
      setPGDropdown({ label: newValue.value, value: newValue.value });
      setEmpData({ ...empData, empPostGraduationUniversity: "" });
      return;
    }
    setEmpData({ ...empData, empPostGraduationUniversity: newValue.value });
    setPGDropdown({ label: newValue.value, value: newValue.value });
  };
  const loadUGOptions = (inputValue, callback) => {
    axiosInstance
      .get(`/universities/search?name=${inputValue}`)
      .then(function (response) {
        callback(
          response.data.data.map((el) => {
            return { label: `${el.university}`, value: `${el.university}` };
          })
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleNewFieldChange = (event, index) => {
    const updates = professionalDetails.map((professionalDetail, i) =>
      index === i
        ? { ...professionalDetail, fieldValue: event.target.value }
        : professionalDetail
    );
    setProfessionalDetails(updates);
  };

  const removeFields = (index) => {
    const filteredFields = [...professionalDetails];
    filteredFields.splice(index, 1);
    setProfessionalDetails(filteredFields);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEmpData({ ...empData, [name]: value });
  };

  return (
    <Grid container mb={10} sx={{ minHeight: 150 }}>
      <Grid item sx={{ width: "100%" }}>
        <Box>
          <ContentBox>
            <TitleTypo>{professionalConstant.band}</TitleTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empBand ? empBand : ""}
              name="empBand"
              placeholder="Enter employee bandwidth"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <TitleTypo>{professionalConstant.graduation}</TitleTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empGraduation ? empGraduation : ""}
              name="empGraduation"
              onChange={handleChange}
              placeholder="Enter degree name"
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <TitleTypo
              sx={{
                ...(UGDropdown?.value === "others" && {
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  height: "100%",
                  alignItems: "center",
                  marginBottom: "8px",
                }),
              }}
            >
              {professionalConstant.graduationUniversity}
            </TitleTypo>
            <Box
              sx={{
                width: "100%",
                fontSize: "16px",
                fontWeight: "400",
                textTransform: "capitalize",
              }}
            >
              <AsyncSelect
                value={UGDropdown}
                cacheOptions
                loadOptions={loadUGOptions}
                defaultOptions
                onChange={handleUGChange}
                name="empGraduationUniversity"
                placeholder="Select univeristy"
              />
              {UGDropdown?.value === "others" && (
                <CustomTextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={empGraduationUniversity ? empGraduationUniversity : ""}
                  name="empGraduationUniversity"
                  onChange={handleChange}
                  placeholder="Enter graduation university"
                  type="text"
                  sx={{ width: "100%", mt: 2 }}
                />
              )}
            </Box>
          </ContentBox>
          <ContentBox>
            <TitleTypo>{professionalConstant.postGraduation}</TitleTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empPostGraduation ? empPostGraduation : ""}
              name="empPostGraduation"
              placeholder="Enter degree name"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <TitleTypo
              sx={{
                ...(UGDropdown?.value === "others" && {
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  height: "100%",
                  alignItems: "center",
                  marginBottom: "8px",
                }),
              }}
            >
              {professionalConstant.PgUniversity}
            </TitleTypo>
            <Box
              sx={{
                width: "100%",
                fontSize: "16px",
                fontWeight: "400",
                textTransform: "capitalize",
              }}
            >
              <AsyncSelect
                value={PGDropdown}
                cacheOptions
                loadOptions={loadUGOptions}
                defaultOptions
                onChange={handlePGChange}
                name="empPostGraduationUniversity"
                placeholder="Select univeristy"
              />
              {PGDropdown?.value === "others" && (
                <CustomTextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empPostGraduationUniversity
                      ? empPostGraduationUniversity
                      : ""
                  }
                  name="empPostGraduationUniversity"
                  placeholder="Enter post-graduation university"
                  onChange={handleChange}
                  type="text"
                  sx={{ width: "100%", mt: 2 }}
                />
              )}
            </Box>
          </ContentBox>
          {professionalDetails.map((field, index) => (
            <ContentBox key={index} sx={{ position: "relative" }}>
              <TitleTypo>{field.fieldName}</TitleTypo>
              {field.fieldType === "date" ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={field.fieldValue ? field.fieldValue : null}
                    onChange={(newValue) => {
                      const updates = professionalDetails.map(
                        (professionalDetail, i) =>
                          index === i
                            ? {
                                ...professionalDetail,
                                fieldValue: newValue,
                              }
                            : professionalDetail
                      );
                      setProfessionalDetails(updates);
                    }}
                    renderInput={(params) => (
                      <CustomTextField {...params} name="fieldValue" />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={field.fieldValue}
                  type={field.fieldType}
                  name={field.fieldName}
                  onChange={(event) => handleNewFieldChange(event, index)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "80%",
                      height: "40px",
                    },
                  }}
                />
              )}

              <ClearIcon
                onClick={() => removeFields(index)}
                sx={{
                  fontSize: "20px",
                  cursor: "pointer",
                  position: "absolute",
                  right: "30px",
                }}
              />
            </ContentBox>
          ))}
        </Box>
        <ContentBox>
          <TitleTypo>{professionalConstant.experience}</TitleTypo>
          <CustomTextField
            autoComplete="off"
            required
            id="outlined-basic"
            variant="outlined"
            value={yearsOfExperience ? yearsOfExperience : ""}
            name="yearsOfExperience"
            placeholder="Enter Number of Experience"
            onChange={handleChange}
            type="number"
          />
        </ContentBox>
      </Grid>
    </Grid>
  );
};

export default ProfessionalEditable;
