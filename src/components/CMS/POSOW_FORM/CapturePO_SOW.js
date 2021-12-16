import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SimpleGrow from "./EmpList";
import BasicDatePicker from "../invoice_FORM/date";
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
  fetchTargetedResources,
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

  let DefaultClientName = null;
  let ReadProjectName = null;
  let ReadPO_num = "";
  let ReadPO_amt = "";
  let ReadType = "PO";
  let ReadCurr = "";
  let init_Status = "Drafted";
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
  const [DocTypes, setDocTypes] = React.useState(initDocTypes);
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
    if (clientName !== null && !params.id)
      dispatch(fetchAllClientProjects(clientName.clientName));
  }, [clientName]);
  useEffect(() => {
    if (projectName !== null && !params.id) {
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
      setDocTypes(filteredArr[0].Document_Type);
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
      // setTargetedResChkBox(Object.values(filteredArr[0].Targetted_Resources));
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
  const handleDocTypesChange = (event) => {
    setDocTypes(event.target.value);
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
  const handleSendForApprovalBtnOnClk = () => {
    dispatch(SendForApproval({ Status: filteredArr[0].Status }, params.id));
  };

  const submitForm = (event) => {
    event.preventDefault();

    let testObjTargetedRes = {};

    for (var i = 0; i < TargetedResChkBox.length; i++) {
      testObjTargetedRes[targetedResources[i]] = TargetedResChkBox[i];
    }

    const DataToSend = {
      Project_Id: projectId,
      Client_Name: clientName.clientName,
      Project_Name: projectName.projectName,
      Client_Sponser: clientProjectSponsor,
      Client_Finance_Controller: clientFinanceController,
      Targetted_Resources: testObjTargetedRes,
      Status: status,
      Type: typeName,
      Document_Type: DocTypes,
      Document_Name: DocName,
      // PO_Number: PO_number,
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
          <Container fixed>
            <div className="outermostHeader">
              <div>
                <h2 data-test="Doc Heading">PO/SOW</h2>
              </div>
              {props.editBtn && editTglCheckedState ? (
                <div>
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
            </div>
            <Box
              sx={{
                bgcolor: "white",
                height: "75vh",
                border: "2px solid grey",
                overflowY: "scroll",
              }}
            >
              <div className="posow-ProjectInfoHeader">
                <div className="ProjectHeaderTitle">
                  <h3>Project information</h3>
                </div>
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
                {props.editBtn ? (
                  <div className="posow-SaveButton">
                    <strong
                      className="editTxt"
                      data-test="editModeSwitch-label"
                    >
                      Edit mode
                    </strong>
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
              </div>
              <hr className="projectInfoSeperator" />

              <div className="posow-Dropdowns">
                <div className="ClientDropdown">
                  <label>
                    <strong>Client name</strong>
                  </label>
                  <div>
                    <Autocomplete
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
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Client Name" />
                      )}
                    />
                  </div>
                </div>
                <div className="ProjectDropdown">
                  <label>
                    <strong>Project name</strong>
                  </label>
                  <div>
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
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Projects" />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="posow-CheckBoxInputs">
                <div>
                  <div className="clientSponsorCBs">
                    <h3 data-test="client-sponsor-chkBox-label">
                      Client Sponsor
                    </h3>
                    <ul className="">
                      <li>{clientProjectSponsor}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="ClientFinContChkBoxs">
                    <h3 data-test="client-finController-chkBox-label">
                      Client Finance Controller
                    </h3>
                    <ul className="">
                      <li>{clientFinanceController}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="targetedResChkBoxs">
                    <h3 data-test="TargetedRes-chkBox-label">
                      Targeted Resources
                    </h3>
                    <ul className="">
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
                  </div>
                </div>
              </div>

              <hr className="projectInfoSeperator" />
              <div className="DocInfoinputBoxesRowOne">
                <div className="txtBox TypeDropdown ">
                  <div>
                    <FormControl sx={{ m: 1 }} className="inputField">
                      <InputLabel id="demo-multiple-name-label">
                        Type
                      </InputLabel>
                      <Select
                        value={typeName}
                        onChange={handleTypeChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        data-test="Doc-Type-dropdown"
                        inputProps={{ "data-testid": "Doc-Type-dropdown" }}
                        error={errors.Type ? true : false}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
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
                    </FormControl>
                  </div>
                </div>
                {props.editBtn ? (
                  <div className="txtBox PoNoTxtBox">
                    <div>
                      <TextField
                        className="inputTxtField inputField"
                        id="outlined-basic"
                        label={typeName + " Number"}
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
                  </div>
                ) : (
                  <div></div>
                )}
                <br />
                <div className="txtBox CurrDropdown">
                  <div>
                    <FormControl sx={{ m: 1 }} className="inputField">
                      <InputLabel id="demo-multiple-name-label">
                        Currency
                      </InputLabel>
                      <Select
                        className="inputField"
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
                    </FormControl>
                  </div>
                </div>
                <div className="txtBox PoAmtTxtBox">
                  <div>
                    <TextField
                      className="inputTxtField inputField "
                      id="outlined-basic"
                      label={typeName + " Amount"}
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
                  </div>
                </div>
              </div>
              <div className="newRowtwo">
                <div className="PO-endDate">
                  <label>
                    <strong>{typeName + " End Date"}</strong>
                  </label>
                  <div>
                    <BasicDatePicker
                      className="inputField"
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
                  </div>
                </div>
              </div>
              <div className="DocInfoInputBoxesRowTow">
                <div className="txtBox PoAmtTxtBox">
                  <div>
                    <TextField
                      className="inputField"
                      sx={{ m: 1, width: 400 }}
                      id="outlined-basic"
                      label="uploaded Doc"
                      variant="outlined"
                      value={DocName}
                      data-test="uploaded-doc-name-txtBox"
                      error={errors.Document_Name ? true : false}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="DocTypeDropdown">
                  {/* <label>
                    <strong>Doc Type</strong>
                  </label> */}
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Doc type
                      </InputLabel>
                      <Select
                        className="inputField"
                        value={DocTypes}
                        onChange={handleDocTypesChange}
                        input={<OutlinedInput label="Doc type" />}
                        MenuProps={MenuProps}
                        data-test="doc-typeForUpload-dropdown"
                        inputProps={{
                          "data-testid": "UploadDocTypeDropdown",
                        }}
                        error={errors.Document_Type ? true : false}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        {DocumentTypes.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, typeName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="docInfoBottomFields">
                <div className="posow-SaveButton">
                  {(props.editBtn && editTglCheckedState) || !props.editBtn ? (
                    <Button
                      variant="contained"
                      component="label"
                      style={{ backgroundColor: "#f57c00", color: "#FFFFFF" }}
                      disabled={
                        props.editBtn && !editTglCheckedState ? true : false
                      }
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                        onChange={handleUploadBtnClick}
                        accept={DocTypes}
                        data-test="upload-file-input"
                        data-testid="upload-file-input-ClickTest"
                        disabled={DocTypes === "" ? true : false}
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
                        style={{ backgroundColor: "03A9F4", color: "#FFFFFF" }}
                      >
                        Download
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="posow-txtBox">
                  <label>
                    <strong>Remarks/Comments</strong>
                  </label>
                  <Box
                    component="form"
                    sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                    noValidat
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Remarks"
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
                  </Box>
                </div>
                {props.editBtn && status === "Drafted" ? (
                  <Button
                    variant="contained"
                    component="label"
                    style={{ backgroundColor: "03A9F4", color: "#FFFFFF" }}
                    onClick={handleSendForApprovalBtnOnClk}
                    disabled={editTglCheckedState ? true : false}
                    data-test="sendForApproval-btn"
                    data-testid="sendForApproval-btn-ClickTest"
                  >
                    Send For Approval
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
};
