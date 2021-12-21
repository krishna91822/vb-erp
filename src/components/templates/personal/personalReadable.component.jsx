import React, { memo } from "react";

import { Grid, TextField, Box, Chip } from "@mui/material";

import {
  ListItem,
  ContentBox,
  ContentTypo,
  TitleTypo,
} from "./personalReadable.styles";
import { personal } from "./personal.constant";

// import { TitleTypo } from "../../UI/commonStyles";
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
    empConnections,
    empHobbies,
    empPersonalEmail,
    empDob,
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
    <Grid container spacing={0} sx={{ minHeight: 150 }}>
      <Grid
        item
        sm={5}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-input": {
            minHeight: 200,
          },
          "& .MuiFormControl-root": { minHeight: 200 },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "0.1em solid",
            borderColor: "textColor.paletteGrey",
          },
        }}
      >
        <TitleTypo sx={{ textTransform: "capitalize", mb: 1, ml: 1 }}>
          {personal.aboutMe}
        </TitleTypo>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          defaultValue={empAboutMe}
        />
      </Grid>
      <Grid item sm={7}>
        <Box sx={{ mt: 4, ml: 4 }}>
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
                      <ListItem key={i}>
                        <Chip
                          label={data}
                          sx={{
                            backgroundColor: chipColors[i],
                            color: "#fff",
                            height: 30,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        />
                      </ListItem>
                    ))
                  : ""}
              </Box>
            </ContentTypo>
          </ContentBox>
          {/* <ContentBox>
            <ContentTypo>{personal.connections}</ContentTypo>
            <ContentTypo>{empConnections}</ContentTypo>
          </ContentBox> */}
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
                      {new Date(field.fieldValue).toDateString().slice(4)}
                    </ContentTypo>
                  ) : (
                    <ContentTypo>{field.fieldValue}</ContentTypo>
                  )}
                </ContentBox>
              ))
            : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(PersonalReadable);
