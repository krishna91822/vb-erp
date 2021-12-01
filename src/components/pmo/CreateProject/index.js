import React, { useState, useLayoutEffect, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import EditViewSwitchs from "../EditViewSwitch";
import ResourceInformation from "../ResourceInformation";
import {
  HeadingStyle,
  Heading,
  StyledHeader,
  FormHeadingStyled,
  FormElementsStyled,
  FormContainerStyled,
  DateContainerStyled,
  PmoContainer,
  DateElementStyled,
  NumberStyle,
} from "./styles";
import {
  createProject,
  updateProject,
  getProjectById,
} from "../../../store/pmo-actions";
import { pmoActions } from "../../../store/pmo-slice";
import validateForm from "./validateCreateForm";
import validateResourceForm from "../ResourceInformation/validateResourceForm";

const initialState = {
  project: {
    clientName: "",
    projectName: "",
    clientProjectManager: "",
    clientPrimaryContact: "",
    clientProjectSponsor: "",
    domainSector: "",
    clientFinanceController: "",
    startDate: "",
    endDate: "",
    vbProjectManager: "",
    vbProjectStatus: "",
    vbProjectId: "",
  },
  resource: {
    associateName: "",
    startDate: "",
    endDate: "",
    allocation: "0",
    rackRate: "",
  },
  resources: [],
};

const CreateProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const history = useHistory();
  const { redirect, projectById } = useSelector((state) => state.pmo);
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [resourceErrors, setResourceErrors] = useState({});

  const {
    project: {
      clientName,
      projectName,
      clientProjectManager,
      clientPrimaryContact,
      clientProjectSponsor,
      domainSector,
      clientFinanceController,
      startDate,
      endDate,
      vbProjectManager,
      vbProjectStatus,
    },
    resource,
    resources,
  } = state;

  useLayoutEffect(() => {
    if (location.includes("createproject") || location.includes("edit")) {
      setEdit(true);
    }

    if (id) {
      dispatch(getProjectById(id));
    }

    return () => {
      dispatch(pmoActions.clearCreateProjectState());
    };
  }, []);

  useEffect(() => {
    if (redirect) {
      const url = id ? `/pmo/projects/${id}` : "/pmo/projects";
      history.push(url);
      dispatch(pmoActions.redirectToProjectList());
    }
  }, [redirect]);

  useEffect(() => {
    if (projectById.length) {
      const projectInfo = { ...projectById[0] };
      delete projectInfo.resources;

      setState({
        ...state,
        project: projectInfo,
        resources: projectById[0].resources,
      });
    }
  }, [projectById]);

  const handleProjectChange = ({ target }) => {
    if (target.name === "endDate") {
      if (startDate > target.value) {
        alert("End Date need to be grater than Start Date");
      } else {
        setState({
          ...state,
          project: {
            ...state.project,
            [target.name]: target.value,
          },
        });
      }
    } else {
      setState({
        ...state,
        project: {
          ...state.project,
          [target.name]: target.value,
        },
      });
    }
  };

  const handleResourceChange = ({ target }) => {
    if (target.name === "startDate") {
      if (target.value < startDate || target.value > endDate) {
        alert("Start Date need to be in range");
      } else if (startDate === "" || endDate === "") {
        alert("Please enter project start date|end date");
      } else {
        setState({
          ...state,
          resource: {
            ...state.resource,
            [target.name]: target.value,
          },
        });
      }
    } else if (target.name === "endDate") {
      if (target.value > endDate || target.value < startDate) {
        alert("End Date need to be in range");
      } else if (target.value < resource.startDate) {
        alert("End Date need to be grater than Start Date");
      } else {
        setState({
          ...state,
          resource: {
            ...state.resource,
            [target.name]: target.value,
          },
        });
      }
    } else {
      setState({
        ...state,
        resource: {
          ...state.resource,
          [target.name]: target.value,
        },
      });
    }
  };

  const addResource = () => {
    const validationErrors = validateResourceForm(state.resource);
    const noErrors = Object.keys(validationErrors).length === 0;
    setResourceErrors(validationErrors);

    if (noErrors) {
      setState({
        ...state,
        resources: [
          ...state.resources,
          { ...resource, id: Date.now().toString() },
        ],
        resource: initialState.resource,
      });
    }
  };

  const removeResource = (id) => {
    const filterResources = resources.filter((resource) => resource.id !== id);
    setState({
      ...state,
      resources: filterResources,
      resource: initialState.resource,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(state.project);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      if (location.includes("createproject")) {
        dispatch(
          createProject({
            ...state.project,
            vbProjectId: nanoid(7).toUpperCase(),
            resources,
          })
        );
      }
      if (location.includes("edit")) {
        dispatch(
          updateProject({
            ...state.project,
            vbProjectId: id,
            resources,
          })
        );
      }
    }
  };

  return (
    <>
      <PmoContainer>
        <HeadingStyle>
          <p data-test="user">user-Admin/Approver</p>
          <Heading>
            <h2 data-test="page-title">PMO</h2>
            <EditViewSwitchs
              edit={edit}
              setEdit={setEdit}
              id={id}
              onUpdate={handleSubmit}
            />
          </Heading>
        </HeadingStyle>
        <StyledHeader onSubmit={handleSubmit} data-test="create-project-form">
          <FormHeadingStyled>
            <h3 data-test="form-title">Project Information </h3>
            <h3
              style={{ display: id ? "block" : "none" }}
              data-test="project-id"
            >
              Project Id {`-${id}`}
            </h3>
            <Button
              type="submit"
              data-test="submit-button"
              variant="contained"
              color="primary"
              style={{ display: !id ? "block" : "none" }}
            >
              Save
            </Button>
          </FormHeadingStyled>
          <FormContainerStyled>
            <FormElementsStyled>
              <label htmlFor="cn" data-test="client-name-label">
                Client Name
              </label>
              <Select
                error={errors.clientName ? true : false}
                id="cn"
                name="clientName"
                value={clientName}
                data-test="client-name-input"
                size="small"
                variant="outlined"
                disabled={!edit}
                displayEmpty
                style={{ margin: "0.3em", width: "98.5%" }}
                onChange={handleProjectChange}
              >
                <MenuItem value="" disabled>
                  <span style={{ color: "rgb(190, 190, 190)" }}>
                    Select Client Name
                  </span>
                </MenuItem>
                <MenuItem value="ValueBound">ValueBound</MenuItem>
              </Select>
              <FormHelperText error sx={{ mx: 2 }}>
                {errors.clientName}
              </FormHelperText>
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="pn" data-test="project-name-label">
                Project Name
              </label>
              <TextField
                error={errors.projectName ? true : false}
                id="pn"
                name="projectName"
                data-test="project-name-input"
                size="small"
                variant="outlined"
                disabled={!edit}
                placeholder="Enter Project Name"
                value={projectName}
                style={{ padding: "0.3em", width: "100%" }}
                onChange={handleProjectChange}
                helperText={errors.projectName}
              />
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="cpm" data-test="client-project-manager-label">
                Client Project Manager
              </label>
              <TextField
                id="cpm"
                name="clientProjectManager"
                data-test="client-project-manager-input"
                size="small"
                variant="outlined"
                error={errors.clientProjectManager ? true : false}
                helperText={errors.clientProjectManager}
                disabled={!edit}
                value={clientProjectManager}
                placeholder="Enter Client Project"
                style={{ padding: "0.3em", width: "100%" }}
                onChange={handleProjectChange}
              />
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="cpc" data-test="client-primary-contact-label">
                Client Primary Contact
              </label>
              <NumberStyle>
                <TextField
                  type="number"
                  id="cpc"
                  name="clientPrimaryContact"
                  data-test="client-primary-contact-input"
                  size="small"
                  variant="outlined"
                  disabled={!edit}
                  error={errors.clientPrimaryContact ? true : false}
                  helperText={errors.clientPrimaryContact}
                  value={clientPrimaryContact}
                  placeholder="Enter Client Primary Contact"
                  style={{ padding: "0.3em", width: "100%" }}
                  onChange={handleProjectChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                />
              </NumberStyle>
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="cps" data-test="client-project-sponsor-label">
                Client Project Sponsor
              </label>
              <TextField
                id="cps"
                name="clientProjectSponsor"
                data-test="client-project-sponsor-input"
                size="small"
                variant="outlined"
                disabled={!edit}
                error={errors.clientProjectSponsor ? true : false}
                helperText={errors.clientProjectSponsor}
                value={clientProjectSponsor}
                placeholder="Enter Client Project Sponser"
                style={{ padding: "0.3em", width: "100%" }}
                onChange={handleProjectChange}
              />
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="ds" data-test="domain-sector-label">
                Domain/Sector
              </label>
              <TextField
                id="ds"
                name="domainSector"
                data-test="domain-sector-input"
                size="small"
                variant="outlined"
                disabled={!edit}
                value={domainSector}
                placeholder="Enter Domain/Sector"
                style={{ padding: "0.3em", width: "100%" }}
                onChange={handleProjectChange}
              />
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="cfc" data-test="client-finance-controller-label">
                Client Finance Controller
              </label>
              <TextField
                id="cfc"
                name="clientFinanceController"
                data-test="client-finance-controller-input"
                size="small"
                variant="outlined"
                disabled={!edit}
                error={errors.clientFinanceController ? true : false}
                helperText={errors.clientFinanceController}
                value={clientFinanceController}
                placeholder="Enter Client Finance Controller"
                style={{ padding: "0.3em", width: "100%" }}
                onChange={handleProjectChange}
              />
            </FormElementsStyled>
            <DateContainerStyled>
              <DateElementStyled>
                <label htmlFor="sd" data-test="start-date-label">
                  Start Date
                </label>
                <TextField
                  type="date"
                  id="sd"
                  name="startDate"
                  data-test="start-date-input"
                  size="small"
                  variant="outlined"
                  disabled={!edit}
                  error={errors.startDate ? true : false}
                  helperText={errors.startDate}
                  value={startDate}
                  placeholder="enter name"
                  style={{ padding: "0.3em", width: "100%" }}
                  onChange={handleProjectChange}
                />
              </DateElementStyled>
              <DateElementStyled>
                <label htmlFor="ed" data-test="end-date-label">
                  End Date
                </label>
                <TextField
                  type="date"
                  id="ed"
                  name="endDate"
                  data-test="end-date-input"
                  size="small"
                  variant="outlined"
                  disabled={!edit}
                  error={errors.endDate ? true : false}
                  helperText={errors.endDate}
                  value={endDate}
                  placeholder="enter name"
                  style={{ padding: "0.3em", width: "100%" }}
                  onChange={handleProjectChange}
                />
              </DateElementStyled>
            </DateContainerStyled>
            <FormElementsStyled>
              <label htmlFor="vpm" data-test="vb-project-manager-label">
                VB Project Manager
              </label>
              <Select
                id="vpm"
                name="vbProjectManager"
                data-test="vb-project-manager-select"
                defaultValue="1"
                value={vbProjectManager}
                size="small"
                variant="outlined"
                displayEmpty
                disabled={!edit}
                style={{ margin: "0.3em", width: "98.5%" }}
                onChange={handleProjectChange}
              >
                <MenuItem value="" disabled>
                  <span style={{ color: "rgb(190, 190, 190)" }}>
                    Select VB Project Manager
                  </span>
                </MenuItem>
                <MenuItem value="Valuebound">ValueBound</MenuItem>
              </Select>
            </FormElementsStyled>
            <FormElementsStyled>
              <label htmlFor="vpm" data-test="project-status-label">
                Project Status
              </label>
              <Select
                id="vpm"
                name="vbProjectStatus"
                data-test="project-status-input"
                defaultValue="Un Assigned"
                value={vbProjectStatus}
                size="small"
                variant="outlined"
                disabled={!edit}
                displayEmpty
                style={{ margin: "0.3em", width: "98.5%" }}
                onChange={handleProjectChange}
              >
                <MenuItem value="" disabled>
                  <span style={{ color: "rgb(190, 190, 190)" }}>
                    Select Project Status
                  </span>
                </MenuItem>
                <MenuItem value="Un Assigned">Un Assigned</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormElementsStyled>
          </FormContainerStyled>
          <ResourceInformation
            edit={edit}
            id={id}
            resource={resource}
            resources={resources}
            handleResourceChange={handleResourceChange}
            addResource={addResource}
            removeResource={removeResource}
            resourceErrors={resourceErrors}
          />
        </StyledHeader>
      </PmoContainer>
    </>
  );
};

export default CreateProject;
