/* eslint-disable prettier/prettier */
import { useParams } from "react-router-dom";
import "./Invoice.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  OutlinedInput,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicDatePicker from "./date";
import React, { useEffect } from "react";
import {
  createNew_INVOICE,
  fetchSpecificINVOICE,
  paginationFetchInvoice,
} from "../../../store/CMS/INVOICE-actions";
import validateInvoice from "./validateInvoice";
import { Update_INVOICE } from "../../../store/CMS/INVOICE-actions";
import { fetchPO_SOW_data } from "../../../store/CMS/POSOW-actions";
import { fetch_INVOICE_data } from "../../../store/CMS/INVOICE-actions";
import { invoiceActions } from "../../../store/CMS/INVOICE-slice";
import { paginationFetchPosow } from "../../../store/CMS/POSOW-actions";

function Invoice(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(paginationFetchPosow("id", 1, 50));
    dispatch(paginationFetchInvoice("Id", 1, 50));
  }, []);
  const isRedirect = useSelector((state) => state.INVOICE_state.redirect);
  const allPOSOWs = useSelector((state) => state.CMS_state.poSowData);
  const allINVOICE = useSelector((state) => state.INVOICE_state.invoiceData);

  useEffect(() => {
    if (isRedirect) {
      navigate("/invoices");
      dispatch(invoiceActions.setRedirect(false));
    }
  }, [isRedirect]);

  const allProjects = allPOSOWs.map((val) => {
    return val.Project_Name;
  });
  const allPOId = allINVOICE.map((val) => {
    return val.PO_Id;
  });
  let filteredArr = useSelector((state) => state.INVOICE_state.dataByID);

  const names = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.names
  );
  const projects = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.projects
  );
  const clientFinController = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.clientFinController
  );
  let clientSponsors = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.clientSponsors
  );
  const invoiceRaised = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.invoiceRaised
  );
  const invoiceAmount = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.invoiceAmount
  );
  const VbBankAcc = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.VbBankAcc
  );
  let ReadPersonName = "";
  let ReadProjectName = "";
  let ReadPO_num = "";
  let ReadPO_amt = "";
  let ReadClientFinController = "";
  let Readclientsponsor = "";
  let Readinvoiceraised = "";
  let Readinvoiceamount = "";
  let ReadVbBankAcc = "";
  let ReadDate = null;
  let readtargetedResources = "";
  let readtargetedAllocation = "";

  const [personName, setPersonName] = React.useState(ReadPersonName);
  const [projectName, setProjectName] = React.useState(ReadProjectName);
  const [PO_number, setPO_number] = React.useState(ReadPO_num);
  const [PO_amt, setPOAmt] = React.useState(ReadPO_amt);
  const [Client_Fin_controller, setClientFinController] = React.useState(
    ReadClientFinController
  );
  const [PoCurr, setPoCurr] = useState("");
  const [errors, setErrors] = useState({});
  const [clientFinControllerArr, setClientFinControllerArr] =
    useState(clientFinController);
  const [poId, setPoId] = useState("");
  const [clientSponsorArr, setClientSponsorArr] = useState(clientSponsors);
  const [ClientSponsor, setClientSponsor] = React.useState(Readclientsponsor);
  const [invoice_raised, setInvoiceRaised] = React.useState(Readinvoiceraised);
  const [invoice_amount, setinvoiceAmount] = React.useState(Readinvoiceamount);
  const [Vb_Bank_Acc, setVbbankacc] = React.useState(ReadVbBankAcc);
  const [Date_, setDate] = React.useState(undefined);

  const [invoicereceived, setinvoicereceived] = useState(false);
  const [editTglCheckedState, seteditTglCheckedState] = React.useState(
    props.toggleState
  );
  const [Targetted_Resources, setTargetedResources] = React.useState(
    readtargetedResources
  );
  const [TargettedAllocation, setTargetedAllocation] = React.useState(
    readtargetedAllocation
  );

  const [invoice_raised_yesno, setInvoiceRaisedYesNo] = React.useState("No");
  let [sum, setsum] = useState(0);
  const targetedResourcesName = Object.keys(TargettedAllocation);
  const percentageAllocation = Object.values(TargettedAllocation);

  useEffect(() => {
    if (props.editBtn && filteredArr[0].PO_Id !== undefined) {
      setPersonName(filteredArr[0].PO_Id.Client_Name);
      setProjectName(filteredArr[0].PO_Id.Project_Name);
      setPO_number(filteredArr[0].PO_Id.PO_Number);
      setPOAmt(filteredArr[0].PO_Id.PO_Amount);
      setClientFinController(filteredArr[0].client_finance_controller);
      setClientSponsor(filteredArr[0].client_sponsor);
      setInvoiceRaised(filteredArr[0].invoice_raised);
      setinvoiceAmount(filteredArr[0].invoice_amount_received);
      filteredArr[0].amount_received_on !== undefined
        ? setDate(filteredArr[0].amount_received_on)
        : setDate(null);
      setVbbankacc(filteredArr[0].vb_bank_account);
      setTargetedResources(filteredArr[0].PO_Id.Targetted_Resources);
      setTargetedAllocation(filteredArr[0].PO_Id.Targeted_Res_AllocationRate);
      setPoId(filteredArr[0].PO_Id._id);
    }
  }, [filteredArr]);
  useEffect(() => {
    if (invoicereceived) {
      if (invoice_raised === "Yes" && invoice_amount !== undefined) {
        setinvoicereceived(true);
      }
    }
  }, []);
  useEffect(() => {
    if (invoice_raised === "Yes") {
      setInvoiceRaisedYesNo("Yes");
    }
  }, [editTglCheckedState]);
  useEffect(() => {
    if (!invoicereceived) {
      setinvoiceAmount(null);
      setDate(null);
      setVbbankacc(null);
    }
  }, [invoicereceived]);
  const handleClientChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProjectName(event.target.value);
  };
  const handlePoNumTxtBoxChange = (event) => {
    setPO_number(event.target.value);
  };

  const handleEditTglChange = (e) => {
    seteditTglCheckedState(!editTglCheckedState);
  };

  const handlePOAmtTxtBoxChange = (event) => {
    setPOAmt(event.target.value);
  };
  const handleClientFinController = (event) => {
    setClientFinController(event.target.value);
  };
  const handleClientSponsor = (event) => {
    setClientSponsor(event.target.value);
  };
  const handleInvoiceRaised = (event) => {
    setInvoiceRaised(event.target.value);
    setInvoiceRaisedYesNo(event.target.value);
  };
  const handleInvoiceAmount = (event) => {
    setinvoiceAmount(event.target.value);
  };
  const handlevbbankacc = (event) => {
    setVbbankacc(event.target.value);
  };
  const handleDate = (Date) => {
    setDate(Date);
  };
  const invoicereceivedhandler = (e) => {
    setinvoicereceived(!invoicereceived);
  };
  const updatehandler = (e) => {
    new Date(Date_).getFullYear();
    const DataToSend = {
      PO_Id: poId,
      client_sponsor: ClientSponsor,
      client_finance_controller: Client_Fin_controller,
      invoice_raised: invoice_raised,
      invoice_amount_received: invoice_amount,
      vb_bank_account: Vb_Bank_Acc,
      amount_received_on:
        new Date(Date_).getFullYear() === 1970 ? null : new Date(Date_),
      invoice_received: invoicereceived ? "Yes" : "No",
    };
    const DataToValidate = {
      invoice_received: invoicereceived ? "Yes" : "No",
      invoice_amount_received: invoice_amount,
      PO_amt: PO_amt,
      vb_bank_account: Vb_Bank_Acc,
      amount_received_on:
        new Date(Date_).getFullYear() === 1970 ? null : new Date(Date_),
    };
    const all_errors = validateInvoice(DataToValidate);
    setErrors(all_errors);
    if (Object.keys(all_errors).length === 0) {
      dispatch(Update_INVOICE(DataToSend, params.id));
    } else {
      alert("Error\nThere may be some missing inputs or bad inputs");
    }
  };

  useEffect(() => {
    if (projectName && !params.id) {
      const filtered = allPOSOWs.filter((val) => {
        return projectName === val.Project_Name;
      });
      setPO_number(filtered[0].PO_Number);
      setPersonName(filtered[0].Client_Name);
      setClientSponsorArr(filtered[0].Client_Sponser);
      setClientFinControllerArr(filtered[0].Client_Finance_Controller);
      setPOAmt(filtered[0].PO_Amount);
      setPoCurr(filtered[0].Currency);
      setPoId(filtered[0].PO_Id);
    }
  }, [projectName]);
  const submitForm = async (event) => {
    event.preventDefault();

    const DataToSend = {
      PO_Id: poId,
      invoice_raised: invoice_raised,
      invoice_amount_received: invoice_amount,
      vb_bank_account: Vb_Bank_Acc,
      amount_received_on: new Date(Date_),
      invoice_received: invoicereceived ? "Yes" : "No",
    };
    if (!props.invoicereceived) {
      dispatch(Update_INVOICE(DataToSend, params.id));
    } else {
      dispatch(createNew_INVOICE(DataToSend));
    }
  };
  const filterinvoiceArr = allINVOICE.filter((val) => {
    return poId === val.purchase_orders._id;
  });

  let count = 0;
  useEffect(() => {
    if (invoice_amount !== undefined) {
      const totalinvoiceamount = filterinvoiceArr.map((val) => {
        count = count + val.invoice_amount_received;
      });
      setsum(count);
    } else {
      setsum(0);
    }
  }, [filteredArr]);

  return (
    <div className="maincontainer">
      <Grid container>
        <Grid item lg={11} md={11} sm={12} xs={12}>
          <h3>Invoice</h3>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}>
          {props.editBtn && editTglCheckedState ? (
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={updatehandler}
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

      <form onSubmit={submitForm}>
        <Grid container>
          <Grid item lg={11} md={11} sm={12} xs={12}>
            <h4 className="heading">PO Information</h4>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}>
            <div className="posow-SaveButton">
              <strong className="editTxt" data-test="editModeSwitch-label">
                Edit
              </strong>
              <label className="switch">
                <input
                  type="checkbox"
                  data-test="EditToggleBtn"
                  data-testid="EditToggleBtn"
                  checked={editTglCheckedState}
                  onChange={handleEditTglChange}
                  disabled={
                    invoice_raised === "Yes" &&
                    invoice_amount &&
                    editTglCheckedState === false
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>

        <hr />
        <Grid container columnSpacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <label>Project Name</label>
            <br />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  disabled={true}
                  value={projectName}
                  onChange={handleProjectChange}
                >
                  {allProjects.map((detail) => (
                    <MenuItem value={detail}>{detail}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <label>Client Name</label>
            <br />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <TextField disabled={true} value={personName} />
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Grid container columnSpacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label>Client Sponsor</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField
                      //
                      disabled={true}
                      value={ClientSponsor}
                      onChange={handleClientSponsor}
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label>Client Finance Controller</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField disabled={true} value={Client_Fin_controller} />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={10} xs={10}>
                <label>PO Amount</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField
                      disabled={true}
                      value={PO_amt}
                      onChange={handlePOAmtTxtBoxChange}
                    />
                  </FormControl>
                </Box>
                <span>{PoCurr}</span>
              </Grid>
              <Grid item lg={4} md={4} sm={10} xs={10}>
                <label>PO Number</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField
                      disabled={true}
                      value={PO_number}
                      onChange={handlePoNumTxtBoxChange}
                    />
                  </FormControl>
                </Box>
              </Grid>
              {props.readonly ? (
                <></>
              ) : (
                <Grid item lg={4} md={4} sm={10} xs={10}>
                  <label>PO Amount Left</label>
                  <br />
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField disabled={true} value={PO_amt - sum} />
                    </FormControl>
                  </Box>
                  <span>{PoCurr}</span>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Targeted Resources</TableCell>
                  <TableCell>Percentage Allocation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-row-posow">
                <TableCell component="th" scope="row" className="table-cell">
                  {targetedResourcesName.map((row, index) => (
                    <TableRow>{row}</TableRow>
                  ))}
                </TableCell>
                <TableCell component="th" scope="row" className="table-cell">
                  {percentageAllocation.map((row, index) => (
                    <TableRow>{row}</TableRow>
                  ))}
                </TableCell>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <hr />

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Related Invoices</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead className="tablehead">
                    <TableRow>
                      <TableCell>PO/SOW Order</TableCell>
                      <TableCell>Client Name</TableCell>
                      <TableCell>Invoice raised</TableCell>
                      <TableCell>Invoice Amount received</TableCell>
                      <TableCell>Bank Account</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell>
                      {filterinvoiceArr.map((detail) => (
                        <TableRow>{detail.purchase_orders.PO_Number}</TableRow>
                      ))}
                    </TableCell>
                    <TableCell>
                      {filterinvoiceArr.map((detail) => (
                        <TableRow>
                          {detail.purchase_orders.Client_Name}
                        </TableRow>
                      ))}
                    </TableCell>

                    <TableCell>
                      {filterinvoiceArr.map((detail) => (
                        <TableRow>{detail.invoice_raised}</TableRow>
                      ))}
                    </TableCell>
                    <TableCell>
                      {filterinvoiceArr.map((detail) => (
                        <TableRow>{detail.invoice_amount_received}</TableRow>
                      ))}
                    </TableCell>
                    <TableCell>
                      {filterinvoiceArr.map((detail) => (
                        <TableRow>{detail.vb_bank_account}</TableRow>
                      ))}
                    </TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        <h3>Invoice Status</h3>
        <hr />
        <Grid container>
          <div className="gridcontainer">
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label>Invoice raised</label>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    disabled={!editTglCheckedState}
                    value={invoice_raised}
                    onChange={handleInvoiceRaised}
                  >
                    {invoiceRaised.map((detail) => (
                      <MenuItem value={detail}>{detail}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </div>
          <Grid item lg={12} md={12} sm={122} xs={12}>
            <div className="invoicereceived">
              <span>Invoice Received</span>
              <Switch
                disabled={invoice_raised_yesno === "No" || !editTglCheckedState}
                onChange={invoicereceivedhandler}
                checked={invoicereceived}
              />
            </div>
          </Grid>
          <div className="gridcontainer">
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label>Invoice amount received</label>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <TextField
                    disabled={
                      !invoicereceived ||
                      !editTglCheckedState ||
                      invoice_raised_yesno === "No"
                    }
                    value={invoice_amount}
                    onChange={handleInvoiceAmount}
                  />
                  <span>{PoCurr}</span>
                </FormControl>
              </Box>
              <br />
              <label>VB Bank Account</label>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    disabled={
                      !invoicereceived ||
                      invoice_raised_yesno === "No" ||
                      !editTglCheckedState
                    }
                    value={Vb_Bank_Acc}
                    onChange={handlevbbankacc}
                  >
                    {VbBankAcc.map((detail) => (
                      <MenuItem value={detail}>{detail}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <br />
              <label htmlFor="invoiceamount">Amount Received on</label>
              <br />
              <BasicDatePicker
                onChange={handleDate}
                value={Date_ ? new Date(Date_) : null}
                disabled={
                  !invoicereceived ||
                  invoice_raised_yesno === "No" ||
                  !editTglCheckedState
                }
              />
            </Grid>
          </div>
        </Grid>
      </form>
    </div>
  );
}

export default Invoice;
