import React from "react";

import { Box } from "@mui/material";
import {
  ContentBox,
  ContentTypo,
  ContentTypoList,
  ListItem,
} from "./skillReadable.styles";

import { skillConstant } from "./skill.constant";

const SkillReadable = ({ empData }) => {
  const {
    empPrimaryCapability,
    empSkillSet,
    empCertifications,
    skillsDetails,
  } = empData;

  return (
    <Box>
      <ContentBox>
        <ContentTypo>{skillConstant.primaryCapability}</ContentTypo>
        <ContentTypoList>
          {!!empPrimaryCapability
            ? empPrimaryCapability.map((data) => (
                <ListItem key={data}>{data}</ListItem>
              ))
            : null}
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
          <ContentTypo>{field.fieldName}</ContentTypo>
          {field.fieldType === "date" ? (
            <ContentTypo>
              {new Date(field.fieldValue).toDateString().slice(4)}
            </ContentTypo>
          ) : (
            <ContentTypo>{field.fieldValue}</ContentTypo>
          )}
        </ContentBox>
      ))}
    </Box>
  );
};

export default SkillReadable;
