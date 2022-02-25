import React, { memo } from "react";

import { Grid, Box, Chip } from "@mui/material";

import {
  ListItem,
  ContentBox,
  ContentTypo,
  TitleTypo,
} from "./personalReadable.styles";
import { personal } from "./personal.constant";

import {
  deepPurple,
  pink,
  purple,
  blue,
  teal,
  amber,
  deepOrange,
} from "@mui/material/colors";

const PersonalReadable = ({ empData }) => {
  const {
    empDob,
    slackMemId,
    empHobbies,
    empPersonalEmail,
    empAboutMe,
    empCurrentAddress,
    empResidentialAddress,
    personalDetails,
  } = empData;

  const chipColors = [
    deepPurple[500],
    purple[500],
    pink[500],
    amber[500],
    deepOrange[500],
    teal[500],
    blue[500],
  ];

  return (
    <Grid container sx={{ minHeight: 150 }}>
      <Grid item mb={5} sx={{ width: "100%" }}>
        <ContentBox>
          <TitleTypo>{personal.aboutMe}</TitleTypo>
          <ContentTypo>{empAboutMe}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{personal.personalEmail}</TitleTypo>
          <ContentTypo>{empPersonalEmail}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{personal.dob}</TitleTypo>
          <ContentTypo>
            {empDob ? new Date(empDob).toDateString().slice(4) : ""}
          </ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{personal.hobbies}</TitleTypo>
          <ContentTypo>
            <Box
              sx={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {empHobbies !== undefined &&
              empHobbies.constructor === Array &&
              empHobbies.length !== 0 &&
              empHobbies[0] !== ""
                ? empHobbies.map((data, i) => (
                    <ListItem key={i} sx={{ margin: "2px" }}>
                      <Chip
                        label={data}
                        size="small"
                        sx={{
                          backgroundColor: chipColors[i],
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 400,
                        }}
                      />
                    </ListItem>
                  ))
                : ""}
            </Box>
          </ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{personal.slackMemberId}</TitleTypo>
          <ContentTypo>{slackMemId}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{personal.currentAddress}</TitleTypo>
          <Box sx={{ width: 1 }}>
            {empCurrentAddress ? (
              <ContentTypo>
                {empCurrentAddress.empAddressLineOne},{" "}
                {empCurrentAddress.empAddressCity},{" "}
                {empCurrentAddress.empAddressState},{" "}
                {empCurrentAddress.empAddressPinCode}
              </ContentTypo>
            ) : null}
          </Box>
        </ContentBox>

        <ContentBox>
          <TitleTypo>{personal.residentialAddress}</TitleTypo>
          <Box sx={{ width: 1 }}>
            {empResidentialAddress ? (
              <ContentTypo>
                {empResidentialAddress.empAddressLineOne},{" "}
                {empResidentialAddress.empAddressCity},{" "}
                {empResidentialAddress.empAddressState},{" "}
                {empResidentialAddress.empAddressPinCode}
              </ContentTypo>
            ) : null}
          </Box>
        </ContentBox>
        {personalDetails
          ? personalDetails.map((field) => (
              <ContentBox key={field._id}>
                <TitleTypo>{field.fieldName}:</TitleTypo>
                {field.fieldType === "date" ? (
                  <ContentTypo>
                    {new Date(field.fieldValue)?.toDateString().slice(4)}
                  </ContentTypo>
                ) : (
                  <ContentTypo>{field.fieldValue}</ContentTypo>
                )}
              </ContentBox>
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default memo(PersonalReadable);
