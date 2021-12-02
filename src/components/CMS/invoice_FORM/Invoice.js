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
import Dialog from "./dialog";
import { useState } from "react";
import Date from "./date";
import React, { useEffect } from "react";
import { createNew_INVOICE } from "../../../store/CMS/INVOICE-actions";
import { Update_INVOICE } from "../../../store/CMS/INVOICE-actions";
import { fetchSpecificINVOICE } from "../../../store/CMS/INVOICE-actions";

function Invoice(props) {
  console.log(props);
  const params = useParams();
  const dispatch = useDispatch();
  let filteredArr = useSelector((state) => state.INVOICE_state.dataByID);
  console.log(filteredArr[0]);
  const names = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.names
  );
  const projects = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.projects
  );
  const clientFinController = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.clientFinController
  );

  const clientSponsors = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.clientSponsors
  );
  const invoiceRaised = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.invoiceRaised
  );
  console.log(invoiceRaised);
  const invoiceAmount = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.invoiceAmount
  );
  const popupController = useSelector((state) => state.INVOICE_state.popup);
  const response_msg = useSelector(
    (state) => state.INVOICE_state.response_message
  );
  let ReadPersonName = "";
  let ReadProjectName = "";
  let ReadPO_num = "";
  let ReadPO_amt = "";
  let ReadClientFinController = "";
  let Readclientsponsor = "";
  let Readinvoiceraised = "";
  let Readinvoiceamount = "";

  const [personName, setPersonName] = React.useState(ReadPersonName);
  const [projectName, setProjectName] = React.useState(ReadProjectName);
  const [PO_number, setPO_number] = React.useState(ReadPO_num);
  const [PO_amt, setPOAmt] = React.useState(ReadPO_amt);
  const [Client_Fin_controller, setClientFinController] = React.useState(
    ReadClientFinController
  );
  const [ClientSponsor, setClientSponsor] = React.useState(Readclientsponsor);
  const [invoice_raised, setInvoiceRaised] = React.useState(Readinvoiceraised);
  const [invoice_amount, setinvoiceAmount] = React.useState(Readinvoiceamount);

  useEffect(() => {
    if (props.readonly && filteredArr !== "undefined") {
      setPersonName(filteredArr[0].Client_Name);
      console.log(filteredArr[0].Client_Name);
      setProjectName(filteredArr[0].Project_Name);
      setPO_number(filteredArr[0].PO_Number);
      setPOAmt(filteredArr[0].PO_Amount);
      setClientFinController(filteredArr[0].Client_Finance_Controller);
      setClientSponsor(filteredArr[0].Client_Sponser);
      setInvoiceRaised(filteredArr[0].invoiceRaised);
      setinvoiceAmount(filteredArr[0].invoiceAmount);
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
  const submitForm = async (event) => {
    event.preventDefault();

    const DataToSend = {
      Client_Name: personName,
      Project_Name: projectName,
      PO_Number: PO_number,
      PO_Amount: PO_amt,
      Client_Sponser: ClientSponsor,
      Client_Finance_Controller: Client_Fin_controller,
      invoiceRaised: invoice_raised,
      invoiceAmount: invoice_amount,
    };
    console.log(DataToSend);
    if (!props.invoicereceived) {
      dispatch(Update_INVOICE(DataToSend, params.id));
    } else {
      dispatch(createNew_INVOICE(DataToSend));
    }
  };
  return (
    <div className="maincontainer">
      <h3>PO/SOW</h3>
      <form onSubmit={submitForm}>
        <Grid container>
          <Grid item lg={11} md={11} sm={12} xs={12}>
            <h4 className="heading">PO Information</h4>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}>
            <Dialog
              className="savebtn"
              variant="contained"
              color="success"
              onClick={submitForm}
            />
          </Grid>
        </Grid>

        <hr />
        <Grid container columnSpacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <label>Client Name</label>
            <br />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  disabled={props.readonly}
                  value={personName}
                  onChange={handleClientChange}
                >
                  {names.map((detail) => (
                    <MenuItem value={detail}>{detail}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
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
                  {projects.map((detail) => (
                    <MenuItem value={detail}>{detail}</MenuItem>
                  ))}
                </Select>
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
                      disabled={props.readonly}
                      value={ClientSponsor}
                      onChange={handleClientSponsor}
                    >
                      {clientSponsors.map((detail) => (
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
                      disabled={props.readonly}
                      value={Client_Fin_controller}
                      onChange={handleClientFinController}
                    >
                      {clientFinController.map((detail) => (
                        <MenuItem value={detail}>{detail}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label>PO Amount</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField
                      disabled={props.readonly}
                      value={PO_amt}
                      onChange={handlePOAmtTxtBoxChange}
                      label={"Enter PO Amount"}
                    />
                  </FormControl>
                </Box>
                <span>USD</span>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label>PO Number</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField
                      disabled={props.readonly}
                      value={PO_number}
                      onChange={handlePoNumTxtBoxChange}
                      label={"Enter PO Number"}
                    />
                  </FormControl>
                </Box>
              </Grid>
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
              <span>USD</span>
            </Grid>
          </div>
          <Grid item lg={12} md={12} sm={122} xs={12}>
            <div className="invoicereceived">
              <span>Invoice Received</span>
              <Switch />
            </div>
          </Grid>
          <div className="gridcontainer">
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label>VB Bank Account</label>
              <br />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select disabled={props.readonly || !props.invoicereceived}>
                    {/* {data.posts.map((detail) => (
                      <MenuItem value={detail.VbBankAcc}>
                        {detail.VbBankAcc}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label htmlFor="invoiceamount">Amount Received on</label>
              <br />
              <Date disabled={props.readonly || !props.invoicereceived} />
            </Grid>
          </div>
        </Grid>
      </form>
    </div>
  );
}

export default Invoice;
