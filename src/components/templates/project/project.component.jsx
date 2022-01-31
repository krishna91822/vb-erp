import React, { useEffect, useState } from "react";
import {
  ContentBox,
  TitleTypo,
  ContentTypo,
  CustomTextField,
} from "./project.styles";
import { projectConstant } from "./project.constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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

import { Box, Chip, Grid, Divider } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ProjectTab = (props) => {
  const { editable, empData, setEmpData } = props;

  // eslint-disable-next-line no-unused-vars
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

  const handleDropdownChange = (value, index) => {
    const updatedSkills = projects.map((project, i) =>
      index === i
        ? Object.assign(project, {
            projectSkill: value.map((el) => el.value),
          })
        : project
    );
    setProjects(updatedSkills);
    const skillArray = projects.map((el) =>
      el.projectSkill.map((arr) => {
        return { label: arr, value: arr };
      })
    );
    setProjectSkillDropdown(skillArray);
  };

  useEffect(() => {
    setEmpData && setEmpData({ ...empData, project: projects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  //dropdown
  const projectSkillOptions = [
    {
      label: "aws",
      value: "aws",
    },
    {
      label: "full-stack",
      value: "full-stack",
    },
    {
      label: "mern",
      value: "mern",
    },
    {
      label: "react-native",
      value: "react-native",
    },
    {
      label: "drupal",
      value: "drupal",
    },
  ];

  const [projectSkillDropdown, setProjectSkillDropdown] = useState(
    projects
      ? projects.map((el) =>
          el.projectSkill.map((arr) => {
            return { label: arr, value: arr };
          })
        )
      : []
  );

  return editable ? (
    <Grid container sx={{ minHeight: 150 }}>
      {projects.map((project, index) => (
        <Grid item mb={5} sx={{ width: "100%" }}>
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
                sx={{ height: "40px" }}
              />
            </ContentBox>
            <ContentBox sx={{ fontSize: "16px", fontWeight: "400" }}>
              <TitleTypo>{projectConstant.projectSkills}</TitleTypo>
              <CreatableSelect
                value={projectSkillDropdown[index]}
                isMulti
                styles={customStyles}
                isSearchable
                name="projectSkill"
                options={projectSkillOptions}
                placeholder="Select primary skills"
                onChange={(value) => handleDropdownChange(value, index)}
              />
            </ContentBox>
            <ContentBox>
              <TitleTypo>{projectConstant.projectDes}</TitleTypo>
              <CustomTextField
                autoComplete="off"
                multiline
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
        </Grid>
      ))}
      <Grid
        container
        onClick={addProject}
        sx={{ mt: 2, ml: 1, cursor: "pointer" }}
      >
        <Grid item>
          <AddCircleOutlineIcon />
        </Grid>
        <Grid item sx={{ marginLeft: "5px" }}>
          <ContentTypo>Add more</ContentTypo>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid container mb={10} sx={{ minHeight: 150 }}>
      <Grid item sx={{ width: "100%" }}>
        <Box>
          {empData?.project &&
            empData.project.map(
              ({ projectName, projectSkill, projectDescription }, index) => (
                <Box
                  key={index}
                  sx={{
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
                  {index < empData.project.length - 1 && <Divider />}
                </Box>
              )
            )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProjectTab;
