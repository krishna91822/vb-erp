import React, { useEffect, useState } from "react";

import { Grid, Box, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import {
  CustomTextField,
  ContentBox,
  ContentTypo,
} from "./skillEditable.styles";

import { skillConstant } from "./skill.constant";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../../helpers/axiosInstance";
import Select from "react-select";

const SkillEditable = ({
  empData,
  setEmpData,
  skillsDetails,
  setSkillsDetails,
}) => {
  const { empPrimaryCapability, empSkillSet, empCertifications } = empData;

  const handleNewFieldChange = (event, index) => {
    const updates = skillsDetails.map((skillsDetail, i) =>
      index === i
        ? { ...skillsDetail, fieldValue: event.target.value }
        : skillsDetail
    );
    setSkillsDetails(updates);
  };

  const removeFields = (index) => {
    const filteredFields = [...skillsDetails];
    filteredFields.splice(index, 1);
    setSkillsDetails(filteredFields);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (
      name === "empPrimaryCapability" ||
      name === "empSkillSet" ||
      name === "empCertifications"
    ) {
      setEmpData({ ...empData, [name]: value.split(",") });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      display: "flex",
      alignContent: "center",
    }),
  };

  //dropdowns
  const primarySkill = [
    "aws",
    "full-stack",
    "mern",
    "mean",
    "react-native",
    "drupal",
  ];
  const primarySkillOptions = primarySkill.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const [primarySkillDropdown, setPrimarySkillDropdown] = useState([
    ...empPrimaryCapability.map((item) => {
      return {
        label: item,
        value: item,
      };
    }),
  ]);

  //dropdown certificate
  const [certificate, setCertificate] = useState(
    empCertifications && empCertifications.length !== 0
      ? [
          ...empCertifications.map((el) => {
            return { label: el, value: el };
          }),
        ]
      : null
  );
  const [certificateOption, setCertificateOption] = useState([]);
  const [certificateLoading, setCertificateLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/dropdowns?dropdownName=certificate`)
      .then(function (response) {
        setCertificateLoading(false);
        const filteredDepartmentOption =
          response.data.data[0].dropdownArray.map((el) => {
            return { label: el.label, value: el.value };
          });
        setCertificateOption(filteredDepartmentOption);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <Grid container mb={5} sx={{ minHeight: 150 }}>
      <Grid item sm={7}>
        <Box>
          <ContentBox>
            <ContentTypo>{skillConstant.primaryCapability}</ContentTypo>
            <Box
              sx={{
                width: "100%",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              <CreatableSelect
                value={primarySkillDropdown}
                isMulti
                styles={customStyles}
                isSearchable
                name="empPrimaryCapability"
                options={primarySkillOptions}
                placeholder="Select primary skills"
                onChange={(value) => {
                  setPrimarySkillDropdown(value);
                  setEmpData({
                    ...empData,
                    empPrimaryCapability: value.map((item) => item.value),
                  });
                }}
              />
            </Box>
          </ContentBox>
          <ContentBox>
            <ContentTypo>{skillConstant.skillSet}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empSkillSet ? empSkillSet : ""}
              name="empSkillSet"
              placeholder="Enter employee skillset"
              onChange={handleChange}
              type="text"
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                },
              }}
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{skillConstant.certification}</ContentTypo>
            <Box
              sx={{
                width: "100%",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              <Select
                maxMenuHeight={70}
                className="basic-single"
                classNamePrefix="select"
                isMulti
                isClearable={false}
                value={certificate ? certificate : null}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: "35px",
                    display: "flex",
                    alignContent: "center",
                    borderColor: "hsl(0, 0%, 80%)",
                  }),
                  indicatorsContainer: (provided, state) => ({
                    ...provided,
                    width: "30px",
                    padding: "0",
                  }),
                }}
                isLoading={certificateLoading}
                isSearchable
                name="empCertifications"
                options={certificateOption}
                onChange={(value) => {
                  setCertificate(value);
                  setEmpData({
                    ...empData,
                    empCertifications: value.map((item) => item.value),
                  });
                }}
              />
            </Box>
          </ContentBox>
          {skillsDetails.map((field, index) => (
            <ContentBox key={index} sx={{ position: "relative" }}>
              <ContentTypo>{field.fieldName}</ContentTypo>
              {field.fieldType === "date" ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={field.fieldValue ? field.fieldValue : null}
                    onChange={(newValue) => {
                      const updates = skillsDetails.map((skillsDetail, i) =>
                        index === i
                          ? {
                              ...skillsDetail,
                              fieldValue: newValue,
                            }
                          : skillsDetail
                      );
                      setSkillsDetails(updates);
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
      </Grid>
    </Grid>
  );
};

export default SkillEditable;
