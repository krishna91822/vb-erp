import React from "react";

import { Box, Chip, Grid } from "@mui/material";
import {
  ContentBox,
  ContentTypo,
  ContentTypoList,
  ListItem,
} from "./skillReadable.styles";
import {
  deepPurple,
  pink,
  purple,
  blue,
  teal,
  amber,
  deepOrange,
} from "@mui/material/colors";
import { skillConstant } from "./skill.constant";

const SkillReadable = ({ empData }) => {
  const {
    empPrimaryCapability,
    empSkillSet,
    empCertifications,
    skillsDetails,
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
          <ContentTypo>{skillConstant.primaryCapability}</ContentTypo>
          <ContentTypoList>
            <Box
              sx={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {empPrimaryCapability !== undefined &&
                empPrimaryCapability.constructor === Array &&
                empPrimaryCapability.length !== 0 &&
                empPrimaryCapability[0] !== "" &&
                empPrimaryCapability.map((data, i) => (
                  <ListItem key={i} sx={{ margin: "2px" }}>
                    <Chip
                      label={data}
                      size="small"
                      sx={{
                        backgroundColor: chipColors[i],
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
            </Box>
          </ContentTypoList>
        </ContentBox>
        <ContentBox>
          <ContentTypo>{skillConstant.skillSet}</ContentTypo>
          <ContentTypoList>
            <Box
              sx={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {empSkillSet !== undefined &&
                empSkillSet.constructor === Array &&
                empSkillSet.length !== 0 &&
                empSkillSet[0] !== "" &&
                empSkillSet.map((data, i) => (
                  <ListItem key={i} sx={{ margin: "2px" }}>
                    <Chip
                      label={data}
                      size="small"
                      sx={{
                        backgroundColor: chipColors[i],
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
            </Box>
          </ContentTypoList>
        </ContentBox>
        <ContentBox>
          <ContentTypo>{skillConstant.certification}</ContentTypo>
          <ContentTypoList>
            <Box
              sx={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {empCertifications !== undefined &&
                empCertifications.constructor === Array &&
                empCertifications.length !== 0 &&
                empCertifications[0] !== "" &&
                empCertifications.map((data, i) => (
                  <ListItem key={i} sx={{ margin: "2px" }}>
                    <Chip
                      label={data}
                      size="small"
                      sx={{
                        backgroundColor: chipColors[i],
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
            </Box>
          </ContentTypoList>
        </ContentBox>
        {skillsDetails.map((field) => (
          <ContentBox key={field._id}>
            <ContentTypo sx={{ mt: 0 }}>{field.fieldName}:</ContentTypo>
            {field.fieldType === "date" ? (
              <ContentTypoList>
                {new Date(field.fieldValue).toDateString().slice(4)}
              </ContentTypoList>
            ) : (
              <ContentTypoList>{field.fieldValue}</ContentTypoList>
            )}
          </ContentBox>
        ))}
      </Grid>
    </Grid>
  );
};

export default SkillReadable;
