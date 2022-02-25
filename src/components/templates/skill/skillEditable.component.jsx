import React, { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import {
  CustomTextField,
  ContentBox,
  ContentTypo,
} from "./skillEditable.styles";

import { skillConstant } from "./skill.constant";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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

  //dropdown primary capability
  const [primaryCapability, setPrimaryCapability] = useState(
    empPrimaryCapability && empPrimaryCapability.length !== 0
      ? [
          ...empPrimaryCapability.map((el) => {
            return { label: el, value: el };
          }),
        ]
      : null
  );
  const [primaryCapabilityOption, setPrimaryCapabilityOption] = useState([]);
  const [primaryCapabilityLoading, setPrimaryCapabilityLoading] =
    useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/dropdowns?dropdownName=primary-capability`)
      .then(function (response) {
        setPrimaryCapabilityLoading(false);
        const filteredDepartmentOption =
          response.data.data[0].dropdownArray.map((el) => {
            return { label: el.label, value: el.value };
          });
        setPrimaryCapabilityOption(filteredDepartmentOption);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  //dropdown skill set
  const [skillSet, setSkillSet] = useState(
    empSkillSet && empSkillSet.length
      ? [
          ...empSkillSet.map((el) => {
            return { label: el, value: el };
          }),
        ]
      : null
  );
  const [skillSetOption, setSkillSetOption] = useState([]);
  const [skillSetLoading, setSkillSetLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/dropdowns?dropdownName=skill-set`)
      .then(function (response) {
        setSkillSetLoading(false);
        const filteredDepartmentOption =
          response.data.data[0].dropdownArray.map((el) => {
            return { label: el.label, value: el.value };
          });
        setSkillSetOption(filteredDepartmentOption);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

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
      <Grid item sx={{ width: "100%" }}>
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
              <Select
                maxMenuHeight={70}
                className="basic-single"
                classNamePrefix="select"
                isMulti
                isClearable={false}
                value={primaryCapability ? primaryCapability : null}
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
                isLoading={primaryCapabilityLoading}
                isSearchable
                name="empCertifications"
                options={primaryCapabilityOption}
                onChange={(value) => {
                  setPrimaryCapability(value);
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
                value={skillSet ? skillSet : null}
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
                isLoading={skillSetLoading}
                isSearchable
                name="empCertifications"
                options={skillSetOption}
                onChange={(value) => {
                  setSkillSet(value);
                  setEmpData({
                    ...empData,
                    empSkillSet: value.map((item) => item.value),
                  });
                }}
              />
            </Box>
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
            <ContentBox
              key={index}
              sx={{ position: "relative", alignItems: "center" }}
            >
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
                      <CustomTextField
                        {...params}
                        name="fieldValue"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            width: "80%",
                            height: "40px",
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <CustomTextField
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
