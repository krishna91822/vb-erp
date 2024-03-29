/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
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
import { fetchAllClients } from "../../../store/CMS/POSOW-actions";
import {
  fetchAllClientProjects,
  fetchClientProjectSponsor,
} from "../../../store/CMS/POSOW-actions";
import { PoSowActions } from "../../../store/CMS/POSOW-slice";
import { uploadFileAction } from "../../../store/CMS/POSOW-actions";
import { useNavigate } from "react-router-dom";
import validateForm from "./validateForm";
import {
  MiniHeadingTypography,
  StyledTypography,
} from "../../../assets/GlobalStyle/style";
import {
  TitleTypo,
  CustomSwitch,
} from "./../../templates/editMode/editMode.styles";
import useStyles from "../../UI/customStyle";

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
  const classes = useStyles();

  const dispatch = useDispatch();
  const params = useParams();
  let navigate = useNavigate();

  let filteredArr = useSelector((state) => state.CMS_state.dataByID);
  const isRedirect = useSelector((state) => state.CMS_state.redirect);
  const clone = useSelector((state) => state.CMS_state.clone);

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

  let initClientName = null;
  let initProjectName = null;
  let initPO_num = "";
  let initPO_amt = "";
  let initType = "PO";
  let initCurr = "";
  let initStatus = "Active";
  let initremarks = "";
  let initDocName = "";
  let initDocTypes = "";
  let initTargetResCheckedElems = new Array(targetedResources.length).fill(
    false
  );

  const [errors, setErrors] = useState({});
  const [projectId, setProjectId] = useState("");
  const [selectedDate, setPOSOWEndDate] = useState(null);
  const [charsLeft, setCharsLeft] = useState(150);
  const [clientName, setClientName] = React.useState(initClientName);
  const [projectName, setProjectName] = React.useState(initProjectName);
  const [clientProjectSponsor, setclientProjectSponsor] =
    React.useState(clientSponsor);
  const [clientFinanceController, setClientFinanceController] = React.useState(
    clone ? filteredArr[0].Client_Finance_Controller : clientFinController
  );
  const [typeName, setTypeName] = React.useState(initType);
  const [CurrName, setCurrName] = React.useState(initCurr);
  const [remarks, setRemarks] = React.useState(initremarks);
  const [PO_number, setPO_number] = React.useState(initPO_num);
  const [PO_amt, setPOAmt] = React.useState(initPO_amt);
  const [DocName, setDocName] = React.useState(initDocName);
  const [uploadFile, setUploadFile] = React.useState("");
  const [status, setStatus] = React.useState(initStatus);
  const [editTglCheckedState, seteditTglCheckedState] = React.useState(
    props.toggleState
  );

  const [TargetedResChkBox, setTargetedResChkBox] = useState(
    initTargetResCheckedElems
  );

  useEffect(() => {
    if (clientName !== null && !params.id && !clone) {
      setProjectName(null);
      dispatch(PoSowActions.clearData());
      dispatch(fetchAllClientProjects(clientName.clientName));
    }
  }, [clientName]);

  useEffect(() => {
    if (!props.editBtn && projectName !== null && !clone) {
      dispatch(fetchClientProjectSponsor(projectId));
    }
  }, [projectName]);

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
    if (clone) {
      setClientName({ clientName: filteredArr[0].Client_Name });
      setProjectName({ _id: "", projectName: filteredArr[0].Project_Name });
      setPO_number(filteredArr[0].PO_Number);
      setPOAmt(filteredArr[0].PO_Amount);
      setTypeName(filteredArr[0].Type);
      setCurrName(filteredArr[0].Currency);
      setProjectId(filteredArr[0].Project_Id);

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
    if ((props.editBtn && params.id) || clone) {
      setTargetedResChkBox(Object.values(filteredArr[0].Targetted_Resources));
    } else {
      setTargetedResChkBox(new Array(targetedResources.length).fill(false));
    }
  }, [targetedResources]);
  const handleClientChange = (event, value) => {
    if (!!value) {
      setClientName(value);
    } else {
      setClientName(initClientName);
    }
  };
  const handleProjectChange = (event, val) => {
    if (!!val) {
      setProjectName(val);
      setProjectId(val._id);
    } else {
      setProjectName(initProjectName);
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
  useEffect(() => {
    const maxCount = 150;
    setCharsLeft(maxCount - remarks.length);
  }, [remarks]);
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
    if (e.target.files[0] !== undefined) {
      setDocName(e.target.files[0].name);
      setUploadFile(e.target.files[0]);
    } else {
      setDocName("");
    }
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
      const data = new FormData();
      data.append("file", uploadFile);
      if (props.editBtn && editTglCheckedState) {
        dispatch(UpdatePO_SOW(DataToSend, params.id));
        dispatch(uploadFileAction(data));
      } else {
        dispatch(createNewPO_SOW(DataToSend));
        dispatch(uploadFileAction(data));
      }
    }
  };
  return (
    <div>
      <div className="posowForm-container">
        <React.Fragment>
          <CssBaseline />
          <Grid container className="posow-topGrid">
            <Grid item lg={10} md={10} sm={12} xs={12}>
              <StyledTypography data-test="Doc Heading">
                PO/SOW
              </StyledTypography>
            </Grid>
          </Grid>

          <Box>
            <Card sx={{ margin: "0.5rem" }}>
              <div className="form-header">
                <div>
                  <MiniHeadingTypography className="cms-heading">
                    Project information
                  </MiniHeadingTypography>
                </div>
                {/* might be required in future versions. */}
                {/* <Grid item lg={4} md={4} sm={4} xs={12} className="finalgrid">
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
                </Grid> */}

                {user.permissions.includes("upload_PO/SOW/contract") && (
                  <div className="end-btns">
                    <div className="posow-SaveButton">
                      <Button
                        variant="contained"
                        // type="button"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                    </div>
                    {props.editBtn ? (
                      <div style={{ paddingRight: "1rem" }}>
                        <TitleTypo
                          data-test="editModeSwitch-label"
                          sx={{
                            textTransform: "capitalize",
                            pr: 1,
                            display: "inline",
                          }}
                        >
                          Edit Mode
                        </TitleTypo>
                        <CustomSwitch
                          data-test="EditToggleBtn"
                          data-testid="EditToggleBtn"
                          checked={editTglCheckedState}
                          onChange={handleEditTglChange}
                          inputProps={{ "aria-label": "switch" }}
                        />
                      </div>
                    ) : (
                      <div className="posow-SaveButton">
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={(event) => submitForm(event)}
                          data-test="POSOW-save-btn"
                          data-testid="save-btn"
                        >
                          Save
                        </Button>
                      </div>
                    )}
                    <div>
                      {props.editBtn && editTglCheckedState ? (
                        <div className="posow-SaveButton">
                          <Button
                            variant="contained"
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
                    </div>
                  </div>
                )}
              </div>

              <hr className="projectInfoSeperator" />

              <Grid container pr={2} mt={2}>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label>
                    Client Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Autocomplete
                    className={`${classes.div} finalinput`}
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={names}
                    onChange={(event, value) =>
                      handleClientChange(event, value)
                    }
                    disabled={
                      (props.editBtn && !editTglCheckedState) ||
                      (editTglCheckedState ? true : false) ||
                      clone
                    }
                    value={clientName}
                    getOptionLabel={(option) => option.clientName}
                    isOptionEqualToValue={(option, value) =>
                      option.clientName === value.clientName
                    }
                    data-testid="clientNameDropdown-ChangeTest"
                    renderInput={(params) => (
                      <TextField
                        className="finalinput"
                        {...params}
                        placeholder="Enter Client Name"
                        error={errors.Client_Name ? true : false}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label>
                    Project Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Autocomplete
                    className={`${classes.div} finalinput`}
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={projects}
                    onChange={(event, value) =>
                      handleProjectChange(event, value)
                    }
                    disabled={
                      (props.editBtn && !editTglCheckedState) ||
                      (editTglCheckedState ? true : false) ||
                      clone
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
                        placeholder="Ente Project Name"
                        error={errors.Project_Name ? true : false}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container className="posow-parentProjectInfo">
                <Grid item lg={4} md={4} sm={12} xs={12} className="finalgrid">
                  <div className="posow-projectInfo">
                    <MiniHeadingTypography
                      className="posow-projectInfoHeading"
                      data-test="client-sponsor-chkBox-label"
                    >
                      {clientProjectSponsor && "Client Sponsor"}
                    </MiniHeadingTypography>
                    <ul className="posow-ul">
                      <li>{clientProjectSponsor}</li>
                    </ul>
                  </div>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="finalgrid">
                  <div className="posow-projectInfo">
                    <MiniHeadingTypography
                      className="posow-projectInfoHeading"
                      data-test="client-finController-chkBox-label"
                    >
                      {clientFinanceController && "Client Finance Controller"}
                    </MiniHeadingTypography>
                    <ul className="posow-ul">
                      <li>{clientFinanceController}</li>
                    </ul>
                  </div>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="finalgrid">
                  <div className="posow-projectInfo">
                    <MiniHeadingTypography
                      className="posow-projectInfoHeading"
                      data-test="TargetedRes-chkBox-label"
                    >
                      {targetedResources.length !== 0 && "Targeted Resources"}
                    </MiniHeadingTypography>
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
                  </div>
                </Grid>
              </Grid>

              <Grid container pr={2}>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">
                    Type <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    className={`${classes.div} finalinput`}
                    value={typeName}
                    size="small"
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
                    Currency <span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    className={`${classes.div} finalinput`}
                    value={CurrName}
                    size="small"
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
                    {typeName} Amount <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    className={`${classes.input} finalinput`}
                    variant="outlined"
                    placeholder="Enter Amount"
                    value={PO_amt}
                    size="small"
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
                        {typeName} Number
                      </label>
                      <TextField
                        className={`${classes.input} finalinput`}
                        variant="outlined"
                        placeholder="Number"
                        value={PO_number}
                        size="small"
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

              <hr className="projectInfoSeperator2" />

              <Grid container mt={3}>
                <Grid item lg={6} md={6} sm={12} xs={12} className="finalgrid">
                  <label id="demo-multiple-name-label">Uploaded Document</label>
                  <TextField
                    className={`${classes.input} finalinput`}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Uploaded Document"
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
                        style={{
                          backgroundColor: "chocolate",
                          color: "#FFFFFF",
                        }}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        Browse File
                        <input
                          type="file"
                          accept=".doc,.docx,.pdf"
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
                            backgroundColor: "chocolate",
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
                    {typeName + " End Date"}
                  </label>
                  <br />
                  <BasicDatePicker
                    className={`${classes.input} finalinput`}
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

              <Grid container pr={2}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="finalgrid"
                >
                  <label id="demo-multiple-name-label">Remarks/Comments</label>
                  <TextField
                    className={`${classes.div} finalinput`}
                    id="outlined-multiline-static"
                    multiline
                    size="small"
                    placeholder="Enter Remarks/Comments"
                    rows={4}
                    value={remarks}
                    onChange={handleRemarksChange}
                    data-test="comments-remarks-txtBox"
                    inputProps={{
                      "data-testid": "RemarksTxtBox",
                      maxLength: 150,
                    }}
                    error={errors.Remarks ? true : false}
                    disabled={
                      props.editBtn && !editTglCheckedState ? true : false
                    }
                  />
                  <span className="cms-remarksCharCount">
                    ({charsLeft}/150)
                  </span>
                </Grid>
                {/* might be required in future versions */}
                {/* {user.permissions.includes("upload_PO/SOW/contract") && (
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
                )} */}
              </Grid>
            </Card>
          </Box>
        </React.Fragment>
      </div>
    </div>
  );
};
