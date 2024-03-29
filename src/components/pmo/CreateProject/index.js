import React, { useState, useLayoutEffect, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import useStyles from "../../UI/customStyle";
import { uiActions } from "../../../store/ui-slice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  Card,
} from "@mui/material";

import EditViewSwitchs from "../EditViewSwitch";
import ResourceInformation from "../ResourceInformation";
import {
  Heading,
  StyledHeader,
  FormHeadingStyled,
  FormElementsStyled,
  FormContainerStyled,
  DateContainerStyled,
  PmoContainer,
  DateElementStyled,
} from "./styles";
import {
  createProject,
  updateProject,
  getProjectById,
  getPercentageAllocated,
  deleteResource,
  getAllClientData,
  getClinetById,
  searchVbManager,
} from "../../../store/pmo-actions";
import { pmoActions } from "../../../store/pmo-slice";
import validateForm from "./validateCreateForm";
import validateResourceForm from "../ResourceInformation/validateResourceForm";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../../assets/GlobalStyle/style";

const initialState = {
  project: {
    clientId: "",
    clientName: "",
    projectName: "",
    clientProjectManager: "",
    clientPrimaryContact: "",
    clientPrimaryContactName: "",
    clientProjectSponsor: "",
    domainSector: "",
    clientFinanceController: "",
    startDate: "",
    endDate: "",
    vbProjectManager: "",
    vbProjectStatus: "",
  },
  resource: {
    empName: "",
    allocationStartDate: "",
    allocationEndDate: "",
    allocationPercentage: "0",
    rackRate: "",
    empId: "",
  },
  resources: [],
};

const CreateProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const {
    redirect,
    projectById,
    allClients,
    allEmployees,
    clientNames,
    percentageAllocated,
    vbManagers,
  } = useSelector((state) => state.pmo);
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [resourceErrors, setResourceErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [openVbMan, setOpenVbMan] = useState(false);
  const [vbManInput, setVbManInput] = useState("");
  const [tempClientName, setTempClientName] = useState("");

  const {
    project: {
      clientName,
      projectName,
      clientProjectManager,
      clientPrimaryContact,
      clientPrimaryContactName,
      clientProjectSponsor,
      domainSector,
      clientFinanceController,
      startDate,
      endDate,
      vbProjectStatus,
    },
    resource,
    resources,
  } = state;

  useLayoutEffect(() => {
    if (location.includes("create") || location.includes("edit")) {
      setEdit(true);
    }

    if (id) {
      dispatch(getProjectById(id));
    }

    return () => {
      dispatch(pmoActions.clearCreateProjectState());
      setState(initialState);
    };
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (location.includes("create")) {
      dispatch(pmoActions.clearCreateProjectState());
      setState(initialState);
      setEdit(true);
      setVbManInput("");
    } // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (redirect) {
      const url = id ? `/pmo/projects/${id}` : "/pmo/projects";
      navigate(url, { replace: true });
      dispatch(pmoActions.redirectToProjectList());
      setEdit(false);
    }
    // eslint-disable-next-line
  }, [redirect]);

  useEffect(() => {
    if (!isEmpty(projectById)) {
      setState({
        ...state,
        project: projectById.project,
        resources: projectById.resources.map((eachResource) => ({
          ...eachResource,
          empId: eachResource.empId.empId,
          empName: `${eachResource.empId.empName} (${eachResource.empId.empId})`,
        })),
      });
      dispatch(getClinetById(projectById.project.clientId));
      setVbManInput(projectById.project.vbProjectManager);
    }
    // eslint-disable-next-line
  }, [projectById]);

  useEffect(() => {
    if (clientNames.length > 0) {
      setNames(clientNames);
    }
    // eslint-disable-next-line
  }, [clientNames]);

  useEffect(() => {
    setState({
      ...state,
      resource: {
        ...state.resource,
        allocationPercentage: 100 - percentageAllocated,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageAllocated]);

  const handelAssociate = (value) => {
    dispatch(getPercentageAllocated(value.empId));
    setState({
      ...state,
      resource: {
        ...state.resource,
        empName: value.empName ? `${value.empName} (${value.empId})` : "",
        empId: value._id || "",
      },
    });
  };

  const handleProjectChange = ({ target }) => {
    if (target.name === "endDate") {
      if (startDate > target.value) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: "End Date need to be greater than Start Date",
          })
        );
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
    if (target.name === "allocationStartDate") {
      if (target.value < startDate || target.value > endDate) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message:
              "Start Date need to be in range between project start and end date",
          })
        );
      } else if (startDate === "" || endDate === "") {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: "Please enter project start date|end date",
          })
        );
      } else {
        setState({
          ...state,
          resource: {
            ...state.resource,
            [target.name]: target.value,
          },
        });
      }
    } else if (target.name === "allocationEndDate") {
      if (target.value > endDate || target.value < startDate) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message:
              "End Date need to be in range between project start and end date",
          })
        );
      } else if (target.value < resource.startDate) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: "End Date need to be grater than Start Date",
          })
        );
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
        resources: [...state.resources, { ...resource }],
        resource: initialState.resource,
      });
    }
  };

  const removeResource = (empId, id) => {
    if (location.includes("edit") && id) {
      dispatch(deleteResource(id));
    }
    const filterResources = resources.filter(
      (resource) => resource.empId !== empId
    );
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
      if (location.includes("create")) {
        dispatch(
          createProject({
            project: { ...state.project },
            resources,
          })
        );
      }
      if (location.includes("edit")) {
        dispatch(
          updateProject({
            project: { ...state.project, vbProjectId: id },
            resources,
          })
        );
      }
    }
  };

  const handleAutoselect = (value) => {
    setState({
      ...state,
      project: {
        ...state.project,
        clientName: value.brandName,
        clientPrimaryContact: value.contacts.primaryContact.contactNumber,
        clientId: value._id,
        clientPrimaryContactName: `${value.contacts.primaryContact.firstName} ${value.contacts.primaryContact.lastName}`,
        domainSector: value.domain,
      },
    });
    setNames(
      [
        `${value.contacts.primaryContact.firstName} ${value.contacts.primaryContact.lastName}`,
        `${value.contacts.secondaryContact.firstName} ${value.contacts.secondaryContact.lastName}`,
        `${value.contacts.tertiaryContact.firstName} ${value.contacts.tertiaryContact.lastName}`,
      ].filter((data) => {
        return data.trim().length > 0;
      })
    );
  };
  const handleInputChange = (event, value) => {
    if (event) {
      setTempClientName(event.target.value);
      setOpen(false);
      if (event.target.value && event.target.value.length > 2) {
        setOpen(true);
        dispatch(getAllClientData(event.target.value));
      }
    }
  };
  const handleOnClick = (event, value) => {
    if (value) {
      handleAutoselect(value);
      setOpen(false);
      setTempClientName("");
    }
    setTempClientName("");
  };

  const handlePhoneNumber = (number) => {
    setState({
      ...state,
      project: {
        ...state.project,
        clientPrimaryContact: number,
      },
    });
  };
  const handleVbManOpen = () => {
    if (vbManInput && vbManInput.length > 2) {
      setOpenVbMan(true);
    } else {
      setOpenVbMan(false);
    }
  };
  const handleVbManInputChange = (event) => {
    const newInputValue = event.target.value;
    setVbManInput(newInputValue);
    if (newInputValue.length > 2) {
      dispatch(searchVbManager(newInputValue));
      setOpenVbMan(true);
    } else {
      setOpenVbMan(false);
    }
  };
  const handleVbManAutoselect = (value) => {
    if (value) {
      setVbManInput(value.empName);
      setState({
        ...state,
        project: {
          ...state.project,
          vbProjectManager: value.empName,
        },
      });
    }
  };

  const classes = useStyles();

  return (
    <>
      <PmoContainer>
        <Heading>
          <StyledTypography data-test="page-title">PMO</StyledTypography>
          <EditViewSwitchs
            edit={edit}
            setEdit={setEdit}
            id={id}
            onUpdate={handleSubmit}
          />
        </Heading>
        <Card sx={{ margin: "1rem", padding: "0.5rem" }}>
          <StyledHeader onSubmit={handleSubmit} data-test="create-project-form">
            <FormHeadingStyled>
              <MiniHeadingTypography data-test="form-title">
                Project Information{" "}
              </MiniHeadingTypography>
              <MiniHeadingTypography
                style={{ display: id ? "block" : "none" }}
                data-test="project-id"
              >
                Project Id - {id}
              </MiniHeadingTypography>
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
                  Client Name <span>*</span>{" "}
                  <small>(min 3 letters required)</small>
                </label>
                <Autocomplete
                  name="clientName"
                  id="cn"
                  data-test="client-name-input"
                  disabled={!edit}
                  size="small"
                  className={classes.div}
                  onInputChange={handleInputChange}
                  onBlur={() => {
                    setTempClientName("");
                    setOpen(false);
                  }}
                  getOptionLabel={(option) => option.brandName}
                  onChange={handleOnClick}
                  style={{ width: "100%" }}
                  options={allClients || []}
                  open={open}
                  disableClearable
                  inputValue={tempClientName || clientName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter Client name"
                      name="clientName"
                      error={errors.clientName ? true : false}
                      width="100%"
                      onChange={handleProjectChange}
                    />
                  )}
                />
              </FormElementsStyled>
              <FormElementsStyled>
                <label htmlFor="pn" data-test="project-name-label">
                  Project Name <span>*</span>
                </label>
                <TextField
                  error={errors.projectName ? true : false}
                  id="pn"
                  name="projectName"
                  data-test="project-name-input"
                  size="small"
                  variant="outlined"
                  className={classes.input}
                  disabled={!edit}
                  placeholder="Enter Project Name"
                  value={projectName}
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                />
              </FormElementsStyled>
              <FormElementsStyled>
                <label htmlFor="pn" data-test="project-name-label">
                  Client Primary Contact Name
                </label>
                <TextField
                  error={errors.clientPrimaryContactName ? true : false}
                  id="cpcn"
                  name="clientPrimaryContactName"
                  data-test="client-primary-contact-name-input"
                  size="small"
                  variant="outlined"
                  disabled
                  className={classes.input}
                  placeholder="Enter Client Primary Contact Name"
                  value={clientPrimaryContactName}
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                />
              </FormElementsStyled>
              <FormElementsStyled>
                <label htmlFor="cpc" data-test="client-primary-contact-label">
                  Client Primary Contact
                </label>
                <PhoneInput
                  disabled
                  className={classes.input}
                  error={errors.clientPrimaryContact ? true : false}
                  onChange={(e) => handlePhoneNumber(e)}
                  value={clientPrimaryContact.toString() || "+91"}
                  name="clientPrimaryContact"
                  inputProps={{
                    name: "phone",
                    autoFocus: true,
                  }}
                  inputStyle={{
                    height: "40px",
                    width: "100%",
                    fontSize: "inherit",
                    color: "#a2a2a2",
                  }}
                />
              </FormElementsStyled>
              <FormElementsStyled>
                <label htmlFor="cpm" data-test="client-project-manager-label">
                  Client Project Manager <span>*</span>
                </label>
                <Select
                  id="cpm"
                  name="clientProjectManager"
                  data-test="client-project-manager-input"
                  defaultValue="1"
                  error={errors.clientProjectManager ? true : false}
                  disabled={!edit}
                  className={classes.div}
                  value={clientProjectManager}
                  size="small"
                  variant="outlined"
                  displayEmpty
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                >
                  <MenuItem value="" disabled>
                    <span style={{ color: "rgb(190, 190, 190)" }}>
                      Select Client Project
                    </span>
                  </MenuItem>
                  {names.map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                </Select>
              </FormElementsStyled>
              <FormElementsStyled>
                <label htmlFor="cps" data-test="client-project-sponsor-label">
                  Client Project Sponsor <span>*</span>
                </label>
                <Select
                  id="cps"
                  name="clientProjectSponsor"
                  data-test="client-project-sponsor-input"
                  defaultValue="1"
                  error={errors.clientProjectSponsor ? true : false}
                  value={clientProjectSponsor}
                  disabled={!edit}
                  className={classes.div}
                  size="small"
                  variant="outlined"
                  displayEmpty
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                >
                  <MenuItem value="" hidden>
                    <span style={{ color: "rgb(190, 190, 190)" }}>
                      Select Client Project Sponser
                    </span>
                  </MenuItem>
                  {names.map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                </Select>
              </FormElementsStyled>
              <FormElementsStyled>
                <label
                  htmlFor="cfc"
                  data-test="client-finance-controller-label"
                >
                  Client Finance Controller <span>*</span>
                </label>
                <Select
                  id="cfc"
                  name="clientFinanceController"
                  data-test="client-finance-controller-input"
                  defaultValue="1"
                  error={errors.clientFinanceController ? true : false}
                  value={clientFinanceController}
                  disabled={!edit}
                  className={classes.div}
                  size="small"
                  variant="outlined"
                  displayEmpty
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                >
                  <MenuItem value="" disabled>
                    <span style={{ color: "rgb(190, 190, 190)" }}>
                      Select Client Project Sponser
                    </span>
                  </MenuItem>
                  {names.map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                </Select>
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
                  disabled
                  className={classes.input}
                  value={domainSector}
                  placeholder="Enter Domain/Sector"
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                />
              </FormElementsStyled>
              <DateContainerStyled
                sColor={!startDate ? "#a2a2a2" : "black"}
                eColor={!endDate ? "#a2a2a2" : "black"}
              >
                <DateElementStyled>
                  <label htmlFor="sd" data-test="start-date-label">
                    Start Date <span>*</span>
                  </label>
                  <TextField
                    type="date"
                    id="sd"
                    name="startDate"
                    data-test="start-date-input"
                    size="small"
                    variant="outlined"
                    disabled={!edit}
                    className={classes.input}
                    error={errors.startDate ? true : false}
                    value={startDate}
                    style={{ width: "100%" }}
                    onChange={handleProjectChange}
                  />
                </DateElementStyled>
                <DateElementStyled>
                  <label htmlFor="ed" data-test="end-date-label">
                    End Date <span>*</span>
                  </label>
                  <TextField
                    type="date"
                    id="ed"
                    name="endDate"
                    data-test="end-date-input"
                    size="small"
                    variant="outlined"
                    disabled={!edit}
                    className={classes.input}
                    error={errors.endDate ? true : false}
                    value={endDate}
                    style={{ width: "100%" }}
                    onChange={handleProjectChange}
                  />
                </DateElementStyled>
              </DateContainerStyled>
              <FormElementsStyled>
                <label htmlFor="vpm" data-test="vb-project-manager-label">
                  VB Project Manager <span>*</span>{" "}
                  <small>(min 3 letters required)</small>
                </label>
                <Autocomplete
                  id="cn"
                  data-test="client-name-input"
                  disabled={!edit}
                  className={classes.div}
                  disableClearable
                  size="small"
                  onOpen={handleVbManOpen}
                  onClose={() => setOpenVbMan(false)}
                  getOptionLabel={(option) =>
                    option.empName + " (" + option.empId + ")"
                  }
                  onChange={(event, value) => {
                    handleVbManAutoselect(value);
                  }}
                  style={{ width: "100%" }}
                  options={vbManagers || []}
                  open={openVbMan}
                  inputValue={vbManInput}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter VB Manager"
                      name="vbProjectManager"
                      error={errors.vbProjectManager ? true : false}
                      width="100%"
                      onChange={handleVbManInputChange}
                    />
                  )}
                />
              </FormElementsStyled>
              <FormElementsStyled>
                <label htmlFor="vpm" data-test="project-status-label">
                  Project Status <span>*</span>
                </label>
                <Select
                  error={errors.vbProjectStatus ? true : false}
                  id="vpm"
                  name="vbProjectStatus"
                  data-test="project-status-input"
                  defaultValue="Un Assigned"
                  value={vbProjectStatus}
                  size="small"
                  variant="outlined"
                  disabled={!edit}
                  className={classes.div}
                  displayEmpty
                  style={{ width: "100%" }}
                  onChange={handleProjectChange}
                >
                  <MenuItem value="" disabled>
                    <span style={{ color: "rgb(190, 190, 190)" }}>
                      Select Project Status
                    </span>
                  </MenuItem>
                  <MenuItem value="Yet to Begin">Yet to Begin</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
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
              handelAssociate={handelAssociate}
              removeResource={removeResource}
              resourceErrors={resourceErrors}
              allEmployees={allEmployees}
              percentageAllocated={percentageAllocated}
            />
          </StyledHeader>
        </Card>
      </PmoContainer>
    </>
  );
};

export default CreateProject;
