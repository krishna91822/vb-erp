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
import TextField from "@mui/material/TextField";
import "./CapturePO_SOW.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewPO_SOW } from "../../../store/CMS/POSOW-actions";
import { UpdatePO_SOW } from "../../../store/CMS/POSOW-actions";
// import { fetchSpecificPO_SOW } from "./actions";
import { SendForApproval } from "../../../store/CMS/POSOW-actions";
import CustomizedDialogs from "./dialogBox";

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

  // let filteredArr = useSelector((state) => state.SOW_state.dataByID);
  let filteredArr = useSelector(
    (state) => state.poSOWTabViewState.specificPOSOWdata
  );

  const names = useSelector((state) => state.SOW_state.inputFieldsData.names);
  const projects = useSelector(
    (state) => state.SOW_state.inputFieldsData.projects
  );
  const clientFinController = useSelector(
    (state) => state.SOW_state.inputFieldsData.clientFinController
  );
  const targetedResources = useSelector(
    (state) => state.SOW_state.inputFieldsData.targetedResources
  );
  const clientSponsors = useSelector(
    (state) => state.SOW_state.inputFieldsData.clientSponsors
  );
  const types = useSelector((state) => state.SOW_state.inputFieldsData.types);
  const currencies = useSelector(
    (state) => state.SOW_state.inputFieldsData.currencies
  );
  const DocumentTypes = useSelector(
    (state) => state.SOW_state.inputFieldsData.DocumentTypes
  );
  const popupController = useSelector((state) => state.SOW_state.popup);
  const response_msg = useSelector((state) => state.SOW_state.response_message);

  let ReadPersonName = "";
  let ReadProjectName = "";
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
  let userCkdClientSponsor = new Array(clientSponsors.length).fill(false);
  let usrChkdClientFinController = new Array(clientFinController.length).fill(
    false
  );

  const [personName, setPersonName] = React.useState(ReadPersonName);
  const [projectName, setProjectName] = React.useState(ReadProjectName);
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
  const [ClientSponsorCheckedState, setClientSponsorCheckedState] =
    useState(userCkdClientSponsor);
  const [clientFinanceController, setClientFinanceController] = useState(
    usrChkdClientFinController
  );
  const [TargetedResChkBox, setTargetedResChkBox] = useState(
    userTargetResCheckedElems
  );

  useEffect(() => {
    if (props.editBtn && filteredArr !== "undefined") {
      setPersonName(filteredArr[0].Client_Name);
      setProjectName(filteredArr[0].Project_Name);
      setPO_number(filteredArr[0].PO_Number);
      setPOAmt(filteredArr[0].PO_Amount);
      setTypeName(filteredArr[0].Type);
      setCurrName(filteredArr[0].Currency);
      setRemarks(filteredArr[0].Remarks);
      setDocName(filteredArr[0].Document_Name);
      setStatus(filteredArr[0].Status);
      setDocTypes(filteredArr[0].Document_Type);

      let fetchedTargetedRes = filteredArr[0].Targetted_Resources;
      fetchedTargetedRes.map((readElem) => {
        if (targetedResources.includes(readElem)) {
          userTargetResCheckedElems[targetedResources.indexOf(readElem)] = true;
          return targetedResources.indexOf(readElem);
        } else {
          return false;
        }
      });
      setTargetedResChkBox(userTargetResCheckedElems);

      let fetchedClientSponsor = filteredArr[0].Client_Sponser;
      fetchedClientSponsor.map((readElem) => {
        if (clientSponsors.includes(readElem)) {
          userCkdClientSponsor[clientSponsors.indexOf(readElem)] = true;
          return clientSponsors.indexOf(readElem);
        } else {
          return false;
        }
      });
      setClientSponsorCheckedState(userCkdClientSponsor);

      let fetchedClientFinControler = filteredArr[0].Client_Finance_Controller;
      fetchedClientFinControler.map((readElem) => {
        if (clientFinController.includes(readElem)) {
          usrChkdClientFinController[
            clientFinController.indexOf(readElem)
          ] = true;
          return clientFinController.indexOf(readElem);
        } else {
          return false;
        }
      });
      setClientFinanceController(usrChkdClientFinController);
    }
  }, [filteredArr]);

  const handleClientChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProjectName(event.target.value);
  };
  const handleTypeChange = (event) => {
    setTypeName(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setCurrName(event.target.value);
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
  const handleClientOnChange = (position) => {
    const updatedCheckedState = ClientSponsorCheckedState.map((item, index) =>
      index === position ? !item : item
    );
    setClientSponsorCheckedState(updatedCheckedState);
  };
  const handleTargetedResChkBoxOnChange = (position) => {
    const updatedCheckedState = TargetedResChkBox.map((item, index) =>
      index === position ? !item : item
    );
    setTargetedResChkBox(updatedCheckedState);
  };
  const handleClientfinChkBoxOnChange = (position) => {
    const updatedCheckedState = clientFinanceController.map((item, index) =>
      index === position ? !item : item
    );
    setClientFinanceController(updatedCheckedState);
  };
  const handleUploadBtnClick = (e) => {
    setUploadFile(e.target.files[0]);
    if (e.target.files[0] !== undefined) {
      setDocName(e.target.files[0].name);
    } else {
      setDocName("");
    }
  };
  // console.log(uploadFile)
  const handleSendForApprovalBtnOnClk = () => {
    dispatch(SendForApproval({ Status: filteredArr[0].Status }, params.id));
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let SelectedClientSponsors = [];
    let SelectedFinController = [];
    let SelectedTargetedRes = [];
    for (var i = 0; i < ClientSponsorCheckedState.length; i++) {
      if (ClientSponsorCheckedState[i] === true) {
        SelectedClientSponsors.push(clientSponsors[i]);
      }
    }
    for (var i = 0; i < clientFinanceController.length; i++) {
      if (clientFinanceController[i] === true) {
        SelectedFinController.push(clientFinController[i]);
      }
    }
    for (var i = 0; i < TargetedResChkBox.length; i++) {
      if (TargetedResChkBox[i] === true) {
        SelectedTargetedRes.push(targetedResources[i]);
      }
    }
    const DataToSend = {
      Client_Name: personName,
      Project_Name: projectName,
      Client_Sponser: SelectedClientSponsors,
      Client_Finance_Controller: SelectedFinController,
      Targetted_Resources: SelectedTargetedRes,
      Status: status,
      Type: typeName,
      Document_Type: DocTypes,
      Document_Name: DocName,
      PO_Number: PO_number,
      PO_Amount: PO_amt,
      Currency: CurrName,
      Remarks: remarks,
    };
    if (props.editBtn && editTglCheckedState) {
      dispatch(UpdatePO_SOW(DataToSend, params.id));
    } else {
      dispatch(createNewPO_SOW(DataToSend));
    }
  };
  return (
    <div>
      <div className="container">
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <div className="outermostHeader">
              <div>
                <h2>PO/SOW</h2>
              </div>
              {props.editBtn && editTglCheckedState ? (
                <div>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={submitForm}
                    data-testid="UpdateBtn"
                  >
                    Update{" "}
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {/* {popupController ? <CustomizedDialogs msg={(props.editBtn && editTglCheckedState) ? "Updated Successfully" : "Saved Successfully"}/> : <div></div>} */}
            {popupController ? (
              <CustomizedDialogs msg={response_msg} />
            ) : (
              <div></div>
            )}
            <Box
              sx={{
                bgcolor: "white",
                height: "75vh",
                border: "2px solid grey",
                overflowY: "scroll",
              }}
            >
              <div className="ProjectInfoHeader">
                <div className="ProjectHeaderTitle">
                  <h3>Project information</h3>
                </div>
                {props.editBtn ? (
                  <div>
                    <h5>STATUS</h5>
                    <strong>{status}</strong>
                  </div>
                ) : (
                  <div></div>
                )}
                {props.editBtn ? (
                  <div className="SaveButton">
                    <strong className="editTxt">Edit mode</strong>
                    <label className="switch">
                      <input
                        type="checkbox"
                        data-testid="EditToggleBtn"
                        checked={editTglCheckedState}
                        onChange={handleEditTglChange}
                        disabled={status === "Drafted" ? false : true}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ) : (
                  <div className="SaveButton">
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={submitForm}
                      data-testid="saveBtn"
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
              <hr className="projectInfoSeperator" />

              <div className="NameDropdowns">
                <div className="ClientDropdown">
                  <label>
                    <strong>Client name</strong>
                  </label>
                  <div>
                    <FormControl sx={{ m: 1, width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Names
                      </InputLabel>
                      <Select
                        value={personName}
                        onChange={handleClientChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="ProjectDropdown">
                  <label>
                    <strong>Project name</strong>
                  </label>
                  <div>
                    <FormControl sx={{ m: 1, width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Projects
                      </InputLabel>
                      <Select
                        value={projectName}
                        onChange={handleProjectChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        {projects.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="CheckBoxInputs">
                <div>
                  <div className="clientSponsorCBs">
                    <h3>Client Sponsor</h3>
                    <ul className="">
                      {clientSponsors.map((name, index) => {
                        return (
                          <li key={index}>
                            <div className="">
                              <div className="">
                                <input
                                  type="checkbox"
                                  id={`custom-checkbox-${index}`}
                                  name={name}
                                  value={name}
                                  disabled={
                                    props.editBtn && !editTglCheckedState
                                      ? true
                                      : false
                                  }
                                  onChange={() => handleClientOnChange(index)}
                                  checked={ClientSponsorCheckedState[index]}
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
                <div>
                  <div className="ClientFinContChkBoxs">
                    <h3>Client Finance Controller</h3>
                    <ul className="">
                      {clientFinController.map((name, index) => {
                        return (
                          <li key={index}>
                            <div className="">
                              <div className="">
                                <input
                                  type="checkbox"
                                  id={`custom-checkbox-${index}`}
                                  name={name}
                                  value={name}
                                  onChange={() =>
                                    handleClientfinChkBoxOnChange(index)
                                  }
                                  checked={clientFinanceController[index]}
                                  disabled={
                                    props.editBtn && !editTglCheckedState
                                      ? true
                                      : false
                                  }
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
                <div>
                  <div className="targetedResChkBoxs">
                    <h3>Targeted Resources</h3>
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
              <div className="DocheaderTitle">
                <h3>Document information</h3>
              </div>
              <hr className="projectInfoSeperator" />
              <div className="DocInfoinputBoxesRowOne">
                <div className="TypeDropdown">
                  <label>
                    <strong>Type</strong>
                  </label>
                  <div>
                    <FormControl sx={{ m: 1, width: 250 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Type
                      </InputLabel>
                      <Select
                        value={typeName}
                        onChange={handleTypeChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        {types.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}{" "}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="txtBox PoNoTxtBox">
                  <label>
                    <strong>{typeName} Number</strong>
                  </label>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label={"Enter " + typeName + " Number"}
                      variant="outlined"
                      value={PO_number}
                      onChange={handlePoNumTxtBoxChange}
                      disabled={
                        props.editBtn && !editTglCheckedState ? true : false
                      }
                    />
                  </div>
                </div>
                <div className="txtBox PoAmtTxtBox">
                  <label>
                    <strong>{typeName} Amount</strong>
                  </label>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label={"Enter " + typeName + " Amount"}
                      variant="outlined"
                      value={PO_amt}
                      onChange={handlePOAmtTxtBoxChange}
                      disabled={
                        props.editBtn && !editTglCheckedState ? true : false
                      }
                    />
                  </div>
                </div>
                <div className="CurrDropdown">
                  <label>
                    <strong>Currency</strong>
                  </label>
                  <div>
                    <FormControl sx={{ m: 1, width: 250 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Currency
                      </InputLabel>
                      <Select
                        value={CurrName}
                        onChange={handleCurrencyChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        {currencies.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="DocInfoInputBoxesRowTow">
                <div className="txtBox PoAmtTxtBox">
                  <label>
                    <strong>Document Name</strong>
                  </label>
                  <div>
                    <TextField
                      sx={{ m: 1, width: 400 }}
                      id="outlined-basic"
                      label="uploaded Doc"
                      variant="outlined"
                      value={DocName}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="DocTypeDropdown">
                  <label>
                    <strong>Doc Type</strong>
                  </label>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Types
                      </InputLabel>
                      <Select
                        value={DocTypes}
                        onChange={handleDocTypesChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        disabled={
                          props.editBtn && !editTglCheckedState ? true : false
                        }
                      >
                        {DocumentTypes.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
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
                <div className="SaveButton">
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
                        disabled={DocTypes === "" ? true : false}
                      />
                    </Button>
                  ) : (
                    <Link
                      to="/files/testFile.txt"
                      target="_blank"
                      download
                      style={{ textDecoration: "none" }}
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
                <div className="txtBox">
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
