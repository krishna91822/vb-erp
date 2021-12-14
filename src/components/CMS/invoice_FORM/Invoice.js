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
import { createNew_INVOICE } from "../../../store/CMS/INVOICE-actions";
import { Update_INVOICE } from "../../../store/CMS/INVOICE-actions";
import { fetchPO_SOW_data } from "../../../store/CMS/POSOW-actions";
import { PoSowActions } from "../../../store/CMS/POSOW-slice";

function Invoice(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRedirect = useSelector((state) => state.CMS_state.redirect);
  useEffect(() => {
    if (isRedirect) {
      navigate("/invoices");
      dispatch(PoSowActions.setRedirect(false));
    }
  }, [isRedirect]);
  useEffect(() => {
    dispatch(fetchPO_SOW_data());
  }, []);

  const allPOSOWs = useSelector((state) => state.CMS_state.poSowData);
  const allINVOICE = useSelector((state) => state.INVOICE_state.invoiceData);

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

  const [personName, setPersonName] = React.useState(ReadPersonName);
  const [projectName, setProjectName] = React.useState(ReadProjectName);
  const [PO_number, setPO_number] = React.useState(ReadPO_num);
  const [PO_amt, setPOAmt] = React.useState(ReadPO_amt);
  const [Client_Fin_controller, setClientFinController] = React.useState(
    ReadClientFinController
  );
  const [PoCurr, setPoCurr] = useState("");
  const [clientFinControllerArr, setClientFinControllerArr] =
    useState(clientFinController);
  const [poId, setPoId] = useState("");
  const [clientSponsorArr, setClientSponsorArr] = useState(clientSponsors);
  const [ClientSponsor, setClientSponsor] = React.useState(Readclientsponsor);
  const [invoice_raised, setInvoiceRaised] = React.useState(Readinvoiceraised);
  const [invoice_amount, setinvoiceAmount] = React.useState(Readinvoiceamount);
  const [Vb_Bank_Acc, setVbbankacc] = React.useState(ReadVbBankAcc);
  const [Date_, setDate] = React.useState(ReadDate);
  const [invoicereceived, setinvoicereceived] = useState(props.invoicereceived);
  // const [filterinvoiceArr, setfilterinvoiceArr] = useState([]);
  let [sum, setsum] = useState(0);

  useEffect(() => {
    if (props.readonly && filteredArr[0].PO_Id !== undefined) {
      setPersonName(filteredArr[0].PO_Id.Client_Name);
      setProjectName(filteredArr[0].PO_Id.Project_Name);
      setPO_number(filteredArr[0].PO_Id.PO_Number);
      setPOAmt(filteredArr[0].PO_Id.PO_Amount);
      setClientFinController(filteredArr[0].client_finance_controller);
      setClientSponsor(filteredArr[0].client_sponsor);
      setInvoiceRaised(filteredArr[0].invoice_raised);
      setinvoiceAmount(filteredArr[0].invoice_amount_received);
      setDate(filteredArr[0].amount_received_on);
      setVbbankacc(filteredArr[0].vb_bank_account);
    }
  }, [filteredArr]);

  const handleClientChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProjectName(event.target.value);
  };
  const handlePoNumTxtBoxChange = (event) => {
    setPO_number(event.target.value);
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
      setPoId(filtered[0]._id);
    }
  }, [projectName]);
  const submitForm = async (event) => {
    event.preventDefault();

    const DataToSend = {
      PO_Id: poId,
      client_sponsor: ClientSponsor,
      client_finance_controller: Client_Fin_controller,
      invoice_raised: invoice_raised,
      invoice_amount_received: invoice_amount,
      vb_bank_account: Vb_Bank_Acc,
      amount_received_on: new Date(Date_),
    };
    console.log(DataToSend);
    if (!props.invoicereceived) {
      dispatch(Update_INVOICE(DataToSend, params.id));
    } else {
      dispatch(createNew_INVOICE(DataToSend));
    }
  };
  const filterinvoiceArr = allINVOICE.filter((val) => {
    return poId === val.purchase_orders._id;
  });
  // setfilterinvoiceArr([...filterinvoiceData]);
  // console.log(filterinvoiceArr);
  let count = 0;
  useEffect(() => {
    const totalinvoiceamount = filterinvoiceArr.map((val) => {
      count = count + val.invoice_amount_received;
    });

    setsum(count);
  });
  return (
    <div className="maincontainer">
      <h3>Invoice</h3>
      <form onSubmit={submitForm}>
        <Grid container>
          <Grid item lg={11} md={11} sm={12} xs={12}>
            <h4 className="heading">PO Information</h4>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={(event) => submitForm(event)}
            >
              SAVE
            </Button>
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
                  disabled={props.readonly}
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
                    <Select
                      disabled={projectName ? false : true}
                      value={ClientSponsor}
                      onChange={handleClientSponsor}
                    >
                      {clientSponsorArr.map((detail) => (
                        <MenuItem value={detail}>{detail}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label>Client Finance Controller</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      disabled={projectName ? false : true}
                      value={Client_Fin_controller}
                      onChange={handleClientFinController}
                    >
                      {clientFinControllerArr.map((detail) => (
                        <MenuItem value={detail}>{detail}</MenuItem>
                      ))}
                    </Select>
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
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Res.Name</th>
                  <th>%Allocation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Harry P.</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Josh Calf</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Sumit Jha</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zayn M</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Liam P</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
        <hr />
        {props.readonly ? (
          <></>
        ) : (
          <Accordion>
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
                        <TableCell>Invoice ID</TableCell>
                        <TableCell>Client Name</TableCell>
                        <TableCell>PO/SOW Order</TableCell>
                        <TableCell>Invoice raised</TableCell>
                        <TableCell>Invoice Amount received</TableCell>
                        <TableCell>Bank Account</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableCell>
                        {filterinvoiceArr.map((detail) => (
                          <TableRow>{detail._id}</TableRow>
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
                          <TableRow>
                            {detail.purchase_orders.PO_Number}
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
          </Accordion>
        )}
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
                    disabled={props.readonly}
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
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label>Invoice amount received</label>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    disabled={props.readonly}
                    value={invoice_amount}
                    onChange={handleInvoiceAmount}
                  >
                    {invoiceAmount.map((detail) => (
                      <MenuItem value={detail}>{detail}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <span>{PoCurr}</span>
            </Grid>
          </div>
          <Grid item lg={12} md={12} sm={122} xs={12}>
            <div className="invoicereceived">
              <span>Invoice Received</span>
              <Switch defaultChecked onChange={invoicereceivedhandler} />
            </div>
          </Grid>
          <div className="gridcontainer">
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label>VB Bank Account</label>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    disabled={props.readonly || !invoicereceived}
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
              <label htmlFor="invoiceamount">Amount Received on</label>
              <br />
              <BasicDatePicker
                onChange={handleDate}
                inputFormat="MM/dd/yyyy"
                value={Date_}
                disabled={props.readonly || !invoicereceived}
              />
            </Grid>
          </div>
        </Grid>
      </form>
    </div>
  );
}

export default Invoice;
