import { useParams } from "react-router-dom";
import "./Invoice.css";
import data from "./Data.json";
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

function Invoice(props) {
  const params = useParams();
  const x = params.id - 1;

  const [clientname, setclientname] = useState(
    props.readonly ? data.posts[x].clientname : ""
  );
  const [projectname, setprojectname] = useState(
    props.readonly ? data.posts[x].Projectname : ""
  );
  const [clientsponsor, setclientsponsor] = useState(
    props.readonly ? data.posts[x].ClientSponsor : ""
  );
  const [clientfinancecontroller, setclientfinancecontroller] = useState(
    props.readonly ? data.posts[x].ClientFinanceController : ""
  );
  const [poamount, setpoamount] = useState(
    props.readonly ? data.posts[x].POAmount : ""
  );
  const [ponumber, setponumber] = useState(
    props.readonly ? data.posts[x].PONumber : ""
  );
  const [invoiceraised, setinvoiceraised] = useState(
    props.readonly ? data.posts[x].Invoiceraised : ""
  );
  const [invoiceamount, setinvoiceamount] = useState(
    props.readonly ? data.posts[x].Invoiceamount : ""
  );
  const [vbbankacc, setvbbankacc] = useState(
    props.readonly ? data.posts[x].VbBankAcc : ""
  );
  const [amtdate, setamtdate] = useState(
    props.readonly ? data.posts[x].AmountReceivedDate : null
  );
  const [invoicereceived, setinvoicereceived] = useState(props.invoicereceived);

  const clientnamehandler = (e) => {
    setclientname(e.target.value);
  };
  const projectnamehandler = (e) => {
    setprojectname(e.target.value);
  };
  const clientsponsorhandler = (e) => {
    setclientsponsor(e.target.value);
  };
  const clientfinancecontrollerhandler = (e) => {
    setclientfinancecontroller(e.target.value);
  };
  const poamounthandler = (e) => {
    setpoamount(e.target.value);
  };
  const ponumberhandler = (e) => {
    setponumber(e.target.value);
  };
  const invoiceraisedhandler = (e) => {
    setinvoiceraised(e.target.value);
  };
  const invoiceamounthandler = (e) => {
    setinvoiceamount(e.target.value);
  };
  const vbbankacchandler = (e) => {
    setvbbankacc(e.target.value);
  };
  const amtdatehandler = (date) => {
    setamtdate(date);
  };
  const invoicereceivedhandler = (e) => {
    setinvoicereceived(!invoicereceived);
  };
  const submithandler = (event) => {
    event.preventDefault();
    const values = {
      clientname: clientname,
      projectname: projectname,
      clientsponsor: clientsponsor,
      clientfinancecontroller: clientfinancecontroller,
      poamount: poamount,
      ponumber: ponumber,
      invoiceraised: invoiceraised,
      invoiceamount: invoiceamount,
      vbbankacc: vbbankacc,
      amtdate: amtdate,
      invoicereceived: invoicereceived,
    };
    console.log(values);
    setamtdate(null);
    setvbbankacc(0);
  };

  return (
    <div className="maincontainer">
      <h3>PO/SOW</h3>
      <form onSubmit={submithandler}>
        <Grid container>
          <Grid item lg={11} md={11} sm={12} xs={12}>
            <h4 className="heading">PO Information</h4>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}>
            <Dialog
              className="savebtn"
              variant="contained"
              color="success"
              onClick={submithandler}
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
                  value={clientname}
                  onChange={clientnamehandler}
                >
                  {data.posts.map((detail) => (
                    <MenuItem value={detail.clientname}>
                      {detail.clientname}
                    </MenuItem>
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
                  value={projectname}
                  onChange={projectnamehandler}
                >
                  {data.posts.map((detail) => (
                    <MenuItem value={detail.Projectname}>
                      {detail.Projectname}
                    </MenuItem>
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
                      value={clientsponsor}
                      onChange={clientsponsorhandler}
                    >
                      {data.posts.map((detail) => (
                        <MenuItem value={detail.ClientSponsor}>
                          {detail.ClientSponsor}
                        </MenuItem>
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
                      value={clientfinancecontroller}
                      onChange={clientfinancecontrollerhandler}
                    >
                      {data.posts.map((detail) => (
                        <MenuItem value={detail.ClientFinanceController}>
                          {detail.ClientFinanceController}
                        </MenuItem>
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
                    <Select
                      disabled={props.readonly}
                      value={poamount}
                      onChange={poamounthandler}
                    >
                      {data.posts.map((detail) => (
                        <MenuItem value={detail.POAmount}>
                          {detail.POAmount}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <span>USD</span>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label>PO Number</label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      disabled={props.readonly}
                      value={ponumber}
                      onChange={ponumberhandler}
                    >
                      {data.posts.map((detail) => (
                        <MenuItem value={detail.PONumber}>
                          {detail.PONumber}
                        </MenuItem>
                      ))}
                    </Select>
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
                    value={invoiceraised}
                    onChange={invoiceraisedhandler}
                  >
                    {data.posts.map((detail) => (
                      <MenuItem value={detail.Invoiceraised}>
                        {detail.Invoiceraised}
                      </MenuItem>
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
                    value={invoiceamount}
                    onChange={invoiceamounthandler}
                  >
                    {data.posts.map((detail) => (
                      <MenuItem value={detail.Invoiceamount}>
                        {detail.Invoiceamount}
                      </MenuItem>
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
                    value={vbbankacc}
                    onChange={vbbankacchandler}
                  >
                    {data.posts.map((detail) => (
                      <MenuItem value={detail.VbBankAcc}>
                        {detail.VbBankAcc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={122} xs={12}>
              <label htmlFor="invoiceamount">Amount Received on</label>
              <br />
              <Date
                onChange={amtdatehandler}
                value={amtdate}
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
