import React, { useEffect, useState } from "react";
import {
  ContentBox,
  TitleTypo,
  ContentTypo,
  CustomTextField,
} from "./project.styles";
import { projectConstant } from "./project.constant";

import {
  deepPurple,
  pink,
  purple,
  blue,
  teal,
  amber,
  deepOrange,
} from "@mui/material/colors";
import CreatableSelect from "react-select/creatable";

import { Box, Button, Chip, Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ProjectTab = (props) => {
  const {
    editable,
    empData,
    setEmpData,
    // projectDetails,
    // setProjectDetails,
    errors,
    validate,
  } = props;

  const { project } = empData;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      // height: "40px",
      display: "flex",
      alignContent: "center",
    }),
  };

  const chipColors = [
    deepPurple[500],
    purple[500],
    pink[500],
    amber[500],
    deepOrange[500],
    teal[500],
    blue[500],
  ];

  const projectTemplate = {
    projectName: "",
    projectSkill: [],
    projectDescription: "",
  };

  const existingProjects =
    empData?.project &&
    empData.project.map((el) => {
      return {
        projectName: el.projectName,
        projectSkill: el.projectSkill,
        projectDescription: el.projectDescription,
      };
    });

  const [projects, setProjects] = useState(
    empData?.project ? [...existingProjects] : [projectTemplate]
  );
  const addProject = () => {
    setProjects([...projects, projectTemplate]);
  };

  const removeProject = (index) => {
    const filteredProjects = [...projects];
    filteredProjects.splice(index, 1);
    setProjects(filteredProjects);
  };

  const handleChange = (e, index) => {
    const updatedProjects = projects.map((project, i) =>
      index === i
        ? Object.assign(project, { [e.target.name]: e.target.value })
        : project
    );
    setProjects(updatedProjects);
  };

  useEffect(() => {
    setEmpData && setEmpData({ ...empData, project: projects });
  }, [projects]);

  //dropdown
  const [projectSkillDropdown, setProjectSkillDropdown] = useState(
    project && [
      ...project.map((el) =>
        el.projectSkill.map((item) => {
          return {
            label: item,
            value: item,
          };
        })
      ),
    ]
  );

  return editable ? (
    <Grid container spacing={0} sx={{ minHeight: 150 }}>
      <Grid item sm={7}>
        {projects.map((project, index) => (
          <Box
            key={index}
            sx={{
              borderBottom: "1px solid",
              borderColor: "#9e9e9e",
              padding: index === 0 ? "0 0 10px 0" : "10px 0",
              position: "relative",
            }}
          >
            <ContentBox>
              <TitleTypo>{projectConstant.projectName}</TitleTypo>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={project?.projectName}
                name="projectName"
                placeholder="Enter Project Name"
                onChange={(e) => handleChange(e, index)}
                type="text"
              />
            </ContentBox>
            <ContentBox sx={{ fontSize: "16px", fontWeight: "400" }}>
              <TitleTypo>{projectConstant.projectSkills}</TitleTypo>
              <CreatableSelect
                // value={primarySkillDropdown}
                isMulti
                styles={customStyles}
                isSearchable
                name="projectSkill"
                // options={projectSkillDropdown[index]}
                placeholder="Select primary skills"
                onChange={(value) => {
                  const updatedSkills = projects.map((project, i) =>
                    index === i
                      ? Object.assign(project, {
                          projectSkill: value.map((el) => el.value),
                        })
                      : project
                  );
                  setProjects(updatedSkills);
                }}
              />
            </ContentBox>
            <ContentBox>
              <TitleTypo>{projectConstant.projectDes}</TitleTypo>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={project?.projectDescription}
                name="projectDescription"
                placeholder="Enter Project Description"
                onChange={(e) => handleChange(e, index)}
                type="text"
              />
            </ContentBox>
            {index !== 0 && (
              <ClearIcon
                onClick={() => removeProject(index)}
                sx={{
                  position: "absolute",
                  top: "calc(50% - 15px)",
                  right: "-30px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        ))}
        <Button variant="contained" onClick={addProject} sx={{ mt: 2 }}>
          {projectConstant.addProject}
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Box>
      {empData?.project &&
        empData.project.map(
          ({ projectName, projectSkill, projectDescription }, index) => (
            <Box
              key={index}
              sx={{
                borderBottom: "1px solid",
                borderColor: "#9e9e9e",
                padding: index === 0 ? "0 0 16px" : "16px 0",
              }}
            >
              <ContentBox>
                <TitleTypo>{projectConstant.projectName}</TitleTypo>
                <ContentTypo>{projectName}</ContentTypo>
              </ContentBox>
              <ContentBox>
                <TitleTypo>{projectConstant.projectSkills}</TitleTypo>
                <Box sx={{ width: 1, display: "flex" }}>
                  {projectSkill.length !== 0 &&
                    projectSkill.map((el, index) => (
                      <Chip
                        key={index}
                        label={el}
                        size="small"
                        sx={{
                          margin: index === 0 ? "0 3px 0 0" : "0 3px",
                          backgroundColor: chipColors[index],
                          color: "#fff",
                        }}
                      />
                    ))}
                </Box>
              </ContentBox>
              <ContentBox>
                <TitleTypo>{projectConstant.projectDes}</TitleTypo>
                <ContentTypo>{projectDescription}</ContentTypo>
              </ContentBox>
            </Box>
          )
        )}
    </Box>
  );
};

export default ProjectTab;
