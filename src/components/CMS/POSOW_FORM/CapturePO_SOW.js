import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import BasicDatePicker from "../invoice_FORM/date";
import { Grid } from "@mui/material";
import "./CapturePO_SOW.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewPO_SOW } from "../../../store/CMS/POSOW-actions";
import { UpdatePO_SOW } from "../../../store/CMS/POSOW-actions";
import { SendForApproval } from "../../../store/CMS/POSOW-actions";
import { fetchAllClients } from "../../../store/CMS/POSOW-actions";
import {
  fetchAllClientProjects,
  fetchClientProjectSponsor,
} from "../../../store/CMS/POSOW-actions";
import { PoSowActions } from "../../../store/CMS/POSOW-slice";
import { useNavigate } from "react-router-dom";
import validateForm from "./validateForm";

// materialUI stylings for select dropdowns.
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CapturePO_SOW = (props) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const params = useParams();
  let navigate = useNavigate();

  let filteredArr = useSelector((state) => state.CMS_state.dataByID);
  const isRedirect = useSelector((state) => state.CMS_state.redirect);
  useEffect(() => {
    if (isRedirect) {
      navigate("/posow");
      dispatch(PoSowActions.setRedirect(false));
    }
  }, [isRedirect]);
  useEffect(() => {
    dispatch(fetchAllClients());
  }, []);

  const names = useSelector((state) => state.CMS_state.inputFieldsData.clients);
  const projects = useSelector(
    (state) => state.CMS_state.inputFieldsData.projects
  );
  const clientFinController = useSelector(
    (state) => state.CMS_state.inputFieldsData.clientFinController
  );
  const targetedResources = useSelector(
    (state) => state.CMS_state.inputFieldsData.targetedResources
  );
  const clientSponsor = useSelector(
    (state) => state.CMS_state.inputFieldsData.clientSponsor
  );
  const types = useSelector((state) => state.CMS_state.inputFieldsData.types);
  const currencies = useSelector(
    (state) => state.CMS_state.inputFieldsData.currencies
  );
  const DocumentTypes = useSelector(
    (state) => state.CMS_state.inputFieldsData.DocumentTypes
  );
  const allocationRateArr = useSelector(
    (state) => state.CMS_state.allocationRate
  );
  const user = useSelector((state) => state.user.user);

  let DefaultClientName = null;
  let ReadProjectName = null;
  let ReadPO_num = "";
  let ReadPO_amt = "";
  let ReadType = "PO";
  let ReadCurr = "";
  let init_Status = "Active";
  let Readremarks = "";
  let ReadDocName = "";
  let initDocTypes = "";
  let userTargetResCheckedElems = new Array(targetedResources.length).fill(
    false
  );

  const [errors, setErrors] = useState({});
  const [projectId, setProjectId] = useState("");
  const [selectedDate, setPOSOWEndDate] = useState(null);
  const [clientName, setClientName] = React.useState(DefaultClientName);
  const [projectName, setProjectName] = React.useState(ReadProjectName);
  const [clientProjectSponsor, setclientProjectSponsor] =
    React.useState(clientSponsor);
  const [clientFinanceController, setClientFinanceController] =
    React.useState(clientFinController);
  const [typeName, setTypeName] = React.useState(ReadType);
  const [CurrName, setCurrName] = React.useState(ReadCurr);
  const [remarks, setRemarks] = React.useState(Readremarks);
  const [PO_number, setPO_number] = React.useState(ReadPO_num);
  const [PO_amt, setPOAmt] = React.useState(ReadPO_amt);
  const [DocName, setDocName] = React.useState(ReadDocName);
  const [uploadFile, setUploadFile] = React.useState();
  const [status, setStatus] = React.useState(init_Status);
  const [editTglCheckedState, seteditTglCheckedState] = React.useState(
    props.toggleState
  );

  const [TargetedResChkBox, setTargetedResChkBox] = useState(
    userTargetResCheckedElems
  );
  useEffect(() => {
    if (clientName !== null && !params.id) {
      setProjectName(null);
      dispatch(PoSowActions.clearData());
      dispatch(fetchAllClientProjects(clientName.clientName));
    }
  }, [clientName]);
  useEffect(() => {
    if ((!props.editBtn && projectName !== null) || editTglCheckedState) {
      dispatch(fetchClientProjectSponsor(projectId));
    }
  }, [projectName, editTglCheckedState]);

  useEffect(() => {
    setclientProjectSponsor(clientSponsor);
    setClientFinanceController(clientFinController);
  });
  useEffect(() => {
    if (props.editBtn && filteredArr !== undefined) {
      setClientName({ clientName: filteredArr[0].Client_Name });
      setProjectName({ _id: "", projectName: filteredArr[0].Project_Name });
      setPO_number(filteredArr[0].PO_Number);
      setPOAmt(filteredArr[0].PO_Amount);
      setTypeName(filteredArr[0].Type);
      setCurrName(filteredArr[0].Currency);
      setRemarks(filteredArr[0].Remarks);
      setDocName(filteredArr[0].Document_Name);
      setStatus(filteredArr[0].Status);
      setProjectId(filteredArr[0].Project_Id);
      setPOSOWEndDate(new Date(filteredArr[0].POSOW_endDate));

      dispatch(
        PoSowActions.setClientProjectSponsor(filteredArr[0].Client_Sponser)
      );
      dispatch(
        PoSowActions.setClientFinanceController(
          filteredArr[0].Client_Finance_Controller
        )
      );

      dispatch(
        PoSowActions.setTargetedResourcesOnReadPage(
          Object.keys(filteredArr[0].Targetted_Resources)
        )
      );
    }
  }, [filteredArr]);
  useEffect(() => {
    if (props.editBtn && params.id) {
      setTargetedResChkBox(Object.values(filteredArr[0].Targetted_Resources));
    } else {
      setTargetedResChkBox(new Array(targetedResources.length).fill(false));
    }
  }, [targetedResources]);
  const handleClientChange = (event, value) => {
    if (!!value) {
      setClientName(value);
    } else {
      setClientName(DefaultClientName);
    }
  };
  const handleProjectChange = (event, val) => {
    if (!!val) {
      setProjectName(val);
      setProjectId(val._id);
    } else {
      setProjectName(ReadProjectName);
    }
  };
  const handleTypeChange = (event) => {
    setTypeName(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setCurrName(event.target.value);
  };
  const handleDateChange = (changedDate) => {
    setPOSOWEndDate(changedDate);
  };
  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };
  const handlePoNumTxtBoxChange = (event) => {
    setPO_number(event.target.value);
  };
  const handlePOAmtTxtBoxChange = (event) => {
    if (!isNaN(Number(event.target.value))) {
      setPOAmt(event.target.value);
    }
    if (isNaN(Number(event.target.value))) {
      setPOAmt(PO_amt);
    }
  };

  const handleEditTglChange = (e) => {
    seteditTglCheckedState(!editTglCheckedState);
  };

  const handleTargetedResChkBoxOnChange = (position) => {
    const updatedCheckedState = TargetedResChkBox.map((item, index) =>
      index === position ? !item : item
    );
    setTargetedResChkBox(updatedCheckedState);
  };

  const handleUploadBtnClick = (e) => {
    setUploadFile(e.target.files[0]);
    if (e.target.files[0] !== undefined) {
      setDocName(e.target.files[0].name);
    } else {
      setDocName("");
    }
  };
  const handleSendForApprovalBtnOnClk = (statusToChange) => {
    dispatch(SendForApproval("Pending", params.id));
  };
  const handleApproveReject = (statusToChange) => {
    dispatch(SendForApproval(statusToChange, params.id));
  };
  const submitForm = (event) => {
    event.preventDefault();
    let selectedTargetedRes = {};
    let selectedTargetedResAllocationRate = {};
    for (var i = 0; i < TargetedResChkBox.length; i++) {
      selectedTargetedRes[targetedResources[i]] = TargetedResChkBox[i];
      if (TargetedResChkBox[i]) {
        selectedTargetedResAllocationRate[targetedResources[i]] =
          allocationRateArr[i];
      }
    }

    const DataToSend = {
      Project_Id: projectId,
      Client_Name: clientName ? clientName.clientName : "",
      Project_Name: projectName ? projectName.projectName : "",
      Client_Sponser: clientProjectSponsor,
      Client_Finance_Controller: clientFinanceController,
      Targetted_Resources: selectedTargetedRes,
      Targeted_Res_AllocationRate: selectedTargetedResAllocationRate,
      // Status: status,
      Type: typeName,
      Document_Name: DocName,
      PO_Amount: PO_amt,
      POSOW_endDate: new Date(selectedDate),
      Currency: CurrName,
      Remarks: remarks,
    };

    const all_errors = validateForm(DataToSend);

    setErrors(all_errors);
    if (Object.keys(all_errors).length === 0) {
      if (props.editBtn && editTglCheckedState) {
        dispatch(UpdatePO_SOW(DataToSend, params.id));
      } else {
        dispatch(createNewPO_SOW(DataToSend));
      }
    } else {
      alert("Error\nThere may be some missing inputs or bad inputs");
    }
  };
  return (
    <div>
      <div className="posowForm-container">
        <React.Fragment>
          <CssBaseline />
          <Grid container className="posow-topGrid">
            <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
              <h2 data-test="Doc Heading">PO/SOW</h2>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid ">
              {props.editBtn && editTglCheckedState ? (
                <div className="posow-SaveButton">
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={(event) => submitForm(event)}
                    data-test="UpdateBtn"
                  >
                    Update{" "}
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>
          <Container fixed>
            <Box
              sx={{
                bgcolor: "white",
                height: "75vh",
                border: "2px solid grey",
                overflowY: "scroll",
              }}
            >
              <Grid container>
                <Grid item lg={4} md={4} sm={4} xs={12} className="finalgrid">
                  <h3>Project information</h3>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={12} className="finalgrid">
                  {props.editBtn ? (
                    <div className="posow-status">
                      <h5 data-test="status-label">STATUS</h5>
                      <strong data-testid="status">
                        {" - " + "  " + status}
                      </strong>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Grid>
                {user.permissions.includes("upload_PO/SOW/contract") && (
                  <Grid item lg={4} md={4} sm={4} xs={12} className="finalgrid">
                    {props.editBtn ? (
                      <div className="posow-SaveButton">
                        <strong
                          className="editTxt"
                          data-test="editModeSwitch-label"
                        >
                          Edit
                        </strong>
                        <br />
                        <label className="switch">
                          <input
                            type="checkbox"
                            data-test="EditToggleBtn"
                            data-testid="EditToggleBtn"
                            checked={editTglCheckedState}
                            onChange={handleEditTglChange}
                            disabled={status === "Drafted" ? false : true}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    ) : (
                      <div className="posow-SaveButton">
                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                          onClick={(event) => submitForm(event)}
                          data-test="POSOW-save-btn"
                          data-testid="save-btn"
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </Grid>
                )}
              </Grid>
              <hr className="projectInfoSeperator" />

              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label>
                    <strong>Client name</strong>
                  </label>
                  <Autocomplete
                    className="finalinput"
                    disablePortal
                    id="combo-box-demo"
                    options={names}
                    onChange={(event, value) =>
                      handleClientChange(event, value)
                    }
                    disabled={
                      (props.editBtn && !editTglCheckedState) ||
                      editTglCheckedState
                        ? true
                        : false
                    }
                    value={clientName}
                    getOptionLabel={(option) => option.clientName}
                    isOptionEqualToValue={(option, value) =>
                      option.clientName === value.clientName
                    }
                    data-testid="clientNameDropdown-ChangeTest"
                    error={true}
                    renderInput={(params) => (
                      <TextField
                        className="finalinput"
                        {...params}
                        error={errors.Client_Name ? true : false}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label>
                    <strong>Project name</strong>
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={projects}
                    onChange={(event, value) =>
                      handleProjectChange(event, value)
                    }
                    disabled={
                      (props.editBtn && !editTglCheckedState) ||
                      editTglCheckedState
                        ? true
                        : false
                    }
                    value={projectName}
                    getOptionLabel={(option) => option.projectName}
                    isOptionEqualToValue={(option, value) =>
                      option.projectName === value.projectName
                    }
                    data-testid="projectDropdown-ChangeTest"
                    renderInput={(params) => (
                      <TextField
                        className="finalinput"
                        {...params}
                        error={errors.Project_Name ? true : false}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <hr className="projectInfoSeperator" />

              <Grid container>
                <Grid item lg={4} md={4} sm={12} xs={12} className="finalgrid">
                  <h3 data-test="client-sponsor-chkBox-label">
                    Client Sponsor
                  </h3>
                  <ul className="posow-ul">
                    <li>{clientProjectSponsor}</li>
                  </ul>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="finalgrid">
                  <h3 data-test="client-finController-chkBox-label">
                    Client Finance Controller
                  </h3>
                  <ul className="posow-ul">
                    <li>{clientFinanceController}</li>
                  </ul>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="finalgrid">
                  <h3 data-test="TargetedRes-chkBox-label">
                    Targeted Resources
                  </h3>
                  <ul className="posow-ul">
                    {targetedResources.map((name, index) => {
                      return (
                        <li key={index}>
                          <div className="">
                            <div className="">
                              <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={name}
                                value={name}
                                data-test="targetedRes-chkBox-input"
                                data-testid={`targetedRes${index}`}
                                disabled={
                                  props.editBtn && !editTglCheckedState
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  handleTargetedResChkBoxOnChange(index)
                                }
                                checked={TargetedResChkBox[index]}
                              />
                              <label>{name}</label>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">
                    <strong>Type</strong>
                  </label>
                  <Select
                    className="finalinput"
                    value={typeName}
                    onChange={handleTypeChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    data-test="Doc-Type-dropdown"
                    inputProps={{ "data-testid": "Doc-Type-dropdown" }}
                    error={errors.Type ? true : false}
                    disabled={props.editBtn ? true : false}
                  >
                    {types.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, typeName, theme)}
                      >
                        {name}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">
                    <strong>Currency</strong>
                  </label>
                  <Select
                    className="finalinput"
                    value={CurrName}
                    onChange={handleCurrencyChange}
                    input={<OutlinedInput label="Currency" />}
                    variant="outlined"
                    MenuProps={MenuProps}
                    data-test="currency-dropdown"
                    inputProps={{
                      "data-testid": "currencyDropdown-onChangeTest",
                    }}
                    error={errors.Currency ? true : false}
                    disabled={
                      props.editBtn && !editTglCheckedState ? true : false
                    }
                  >
                    {currencies.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, typeName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">
                    <strong>{typeName} Amount</strong>
                  </label>
                  <TextField
                    className="finalinput"
                    variant="outlined"
                    value={PO_amt}
                    onChange={handlePOAmtTxtBoxChange}
                    inputProps={{ "data-testid": "po-sow-amt" }}
                    error={errors.PO_Amount ? true : false}
                    helperText={errors.PO_Number ? errors.PO_Amount : ""}
                    disabled={
                      props.editBtn && !editTglCheckedState ? true : false
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  {props.editBtn ? (
                    <div>
                      <label id="demo-multiple-name-label">
                        <strong>{typeName} Number</strong>
                      </label>
                      <TextField
                        className="finalinput"
                        variant="outlined"
                        value={PO_number}
                        onChange={handlePoNumTxtBoxChange}
                        inputProps={{ "data-testid": "po-sow-num" }}
                        data-test="po-sow-num"
                        error={errors.PO_Number ? true : false}
                        helperText={errors.PO_Number ? errors.PO_Number : ""}
                        disabled={props.editBtn ? true : false}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>

              <hr className="projectInfoSeperator" />

              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">
                    <strong>Uploaded Document</strong>
                  </label>
                  <TextField
                    className="finalinput"
                    id="outlined-basic"
                    variant="outlined"
                    value={DocName}
                    data-test="uploaded-doc-name-txtBox"
                    error={errors.Document_Name ? true : false}
                    disabled={true}
                  />
                  <div className="posow-updownBtn">
                    {(props.editBtn && editTglCheckedState) ||
                    !props.editBtn ? (
                      <Button
                        variant="contained"
                        component="label"
                        style={{ backgroundColor: "#f57c00", color: "#FFFFFF" }}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        Browse File
                        <input
                          type="file"
                          hidden
                          onChange={handleUploadBtnClick}
                          data-test="upload-file-input"
                          data-testid="upload-file-input-ClickTest"
                        />
                      </Button>
                    ) : (
                      <Link
                        to="/files/testFile.txt"
                        target="_blank"
                        download
                        style={{ textDecoration: "none" }}
                        data-test="download-link"
                      >
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "03A9F4",
                            color: "#FFFFFF",
                          }}
                        >
                          Download
                        </Button>
                      </Link>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">
                    <strong>{typeName + " End Date"}</strong>
                  </label>
                  <br />
                  <BasicDatePicker
                    className="finalinput"
                    // className="inputField txtBox"
                    maxDate="POSOW"
                    label={typeName + " End Date"}
                    value={selectedDate}
                    onChange={handleDateChange}
                    helperText="Choose Date"
                    disabled={
                      props.editBtn && !editTglCheckedState ? true : false
                    }
                    data-testid="BasicdatePicker"
                  />
                </Grid>
              </Grid>

              <Grid container>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="finalgrid"
                >
                  <label id="demo-multiple-name-label">
                    <strong>Remarks/Comments</strong>
                  </label>
                  <TextField
                    className="finalinput"
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    value={remarks}
                    onChange={handleRemarksChange}
                    data-test="comments-remarks-txtBox"
                    inputProps={{ "data-testid": "RemarksTxtBox" }}
                    error={errors.Remarks ? true : false}
                    disabled={
                      props.editBtn && !editTglCheckedState ? true : false
                    }
                  />
                </Grid>
                {user.permissions.includes("upload_PO/SOW/contract") && (
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="finalgrid"
                  >
                    {props.editBtn && status === "Drafted" ? (
                      <Button
                        className="finalinput"
                        variant="contained"
                        component="label"
                        style={{ backgroundColor: "03A9F4", color: "#FFFFFF" }}
                        onClick={handleSendForApprovalBtnOnClk}
                        disabled={editTglCheckedState ? true : false}
                        data-test="sendForApproval-btn"
                        data-testid="sendForApproval-btn-ClickTest"
                      >
                        SEND FOR APPROVAL
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                )}
                {user.permissions.includes("recieve_slack_notification") && (
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="finalgrid"
                  >
                    {props.editBtn && status === "Pending" ? (
                      <div>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleApproveReject("Approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleApproveReject("Rejected")}
                          >
                            Reject
                          </Button>
                        </Stack>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                )}
              </Grid>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
};
