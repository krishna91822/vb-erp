import React from "react";

import { Box, Chip } from "@mui/material";
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
    <Box>
      <ContentBox>
        <ContentTypo>{skillConstant.primaryCapability}</ContentTypo>
        <ContentTypoList>
          {/* {!!empPrimaryCapability
            ? empPrimaryCapability.map((data) => (
                <ListItem key={data}>{data}</ListItem>
              ))
            : null} */}
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
            empPrimaryCapability[0] !== ""
              ? empPrimaryCapability.map((data, i) => (
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
        </ContentTypoList>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{skillConstant.skillSet}</ContentTypo>
        <ContentTypoList>
          <ContentTypoList>
            {!!empSkillSet
              ? empSkillSet.map((data) => (
                  <ListItem key={data}>{data}</ListItem>
                ))
              : null}
          </ContentTypoList>
        </ContentTypoList>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{skillConstant.certification}</ContentTypo>
        <ContentTypoList>
          <ContentTypoList>
            {!!empCertifications
              ? empCertifications.map((data) => (
                  <ListItem key={data}>{data}</ListItem>
                ))
              : null}
          </ContentTypoList>
        </ContentTypoList>
      </ContentBox>
      {skillsDetails.map((field) => (
        <ContentBox key={field._id}>
          <ContentTypo>{field.fieldName}:</ContentTypo>
          {field.fieldType === "date" ? (
            <ContentTypoList>
              {new Date(field.fieldValue).toDateString().slice(4)}
            </ContentTypoList>
          ) : (
            <ContentTypoList>{field.fieldValue}</ContentTypoList>
          )}
        </ContentBox>
      ))}
    </Box>
  );
};

export default SkillReadable;
