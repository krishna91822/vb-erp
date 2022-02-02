import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BasicDatePicker from "../CMS/invoice_FORM/date";
import FormLabel from "@mui/material/FormLabel";
import { invoiceActions } from "../../store/CMS/INVOICE-slice";
import { useDispatch, useSelector } from "react-redux";
import "./Main.css";
import validateInvoice from "./invoice_FORM/validateInvoice";
import {
  Update_INVOICE,
  fetchVBBankAccount,
} from "../../store/CMS/INVOICE-actions";
import { useNavigate } from "react-router-dom";

export default function FormDialog(props) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRedirect = useSelector((state) => state.INVOICE_state.redirect);
  const [remarks, setRemarks] = React.useState(null);
  const [charsLeft, setCharsLeft] = useState(150);

  useEffect(() => {
    if (isRedirect) {
      navigate("/invoices");
      dispatch(invoiceActions.setRedirect(false));
    }
  }, [isRedirect]);

  useEffect(() => {
    if (remarks) {
      const maxCount = 150;
      setCharsLeft(maxCount - remarks.length);
    }
  }, [remarks]);

  const open = useSelector((state) => state.INVOICE_state.popup);

  const VbBankAcc = useSelector(
    (state) => state.INVOICE_state.inputFieldsData.VbBankAcc
  );
  const handleClose = () => {
    dispatch(invoiceActions.setPopupOpen());
    dispatch(invoiceActions.setpopupVisibility());
  };
  const [invoiceRaisedFlag, setInvoiceRaisedFlag] = useState(
    props.invoice_raised
  );
  const [amountReceivedFlag, setAmountReceivedFlag] = useState(
    props.invoice_received
  );
  const [amount, setAmount] = useState("");
  const [Vb_Bank_Acc, setVbbankacc] = React.useState("");
  const [Date_, setDate] = React.useState(undefined);

  useEffect(() => {
    if (invoiceRaisedFlag === "No") {
      setAmountReceivedFlag("No");
    }
  }, [invoiceRaisedFlag]);

  useEffect(() => {
    if (amountReceivedFlag === "No") {
      setAmount("");
      setVbbankacc(null);
      setDate(null);
    }
  }, [amountReceivedFlag]);

  const handleInvoiceRaised = (event) => {
    setInvoiceRaisedFlag(event.target.value);
  };
  const handleAmountReceived = (event) => {
    setAmountReceivedFlag(event.target.value);
    if (event.target.value === "Yes") {
      dispatch(fetchVBBankAccount());
    }
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };
  const handlevbbankacc = (event) => {
    setVbbankacc(event.target.value);
  };
  const handleDate = (Date) => {
    setDate(Date);
  };

  const handleUpdate = () => {
    const dataToSend = {
      invoice_raised: invoiceRaisedFlag,
      invoice_received: amountReceivedFlag,
      invoice_amount_received: Number(amount),
      Remarks: remarks,
      vb_bank_account: Vb_Bank_Acc ? Vb_Bank_Acc : null,
      amount_received_on:
        new Date(Date_).getFullYear() === 1970 ? null : new Date(Date_),
    };

    const DataToValidate = {
      invoice_raised: invoiceRaisedFlag,
      invoice_received: amountReceivedFlag,
      invoice_amount_received: Number(amount),
      vb_bank_account: Vb_Bank_Acc,
      amount_received_on:
        new Date(Date_).getFullYear() === 1970 ? null : new Date(Date_),
    };
    const all_errors = validateInvoice(DataToValidate);
    setErrors(all_errors);
    if (Object.keys(all_errors).length === 0) {
      dispatch(Update_INVOICE(dataToSend, props.invoiceID));
    } else {
      alert("Error\nThere may be some missing inputs or bad inputs");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Invoice</DialogTitle>
        <DialogContent className="invoice-editDialog">
          <div className="invoice-RadioButtons">
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Invoice Raised</FormLabel>
                <RadioGroup
                  row
                  aria-label="Invoice Raised"
                  name="row-radio-buttons-group"
                >
                  <div className="invoice-radioInputs">
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      checked={invoiceRaisedFlag === "Yes"}
                      onChange={handleInvoiceRaised}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      checked={invoiceRaisedFlag === "No"}
                      onChange={handleInvoiceRaised}
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Amount Received</FormLabel>
                <RadioGroup
                  row
                  aria-label="Amount Received"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={invoiceRaisedFlag === "No"}
                    checked={amountReceivedFlag === "Yes"}
                    onChange={handleAmountReceived}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    disabled={invoiceRaisedFlag === "No"}
                    checked={amountReceivedFlag === "No"}
                    onChange={handleAmountReceived}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="invoiceAmt"
            value={amount}
            onChange={handleAmount}
            disabled={amountReceivedFlag === "No"}
            label="Invoice amount received"
            type="number"
            fullWidth
            variant="standard"
          />
          <br />
          <label>VB Bank Account</label>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                disabled={amountReceivedFlag === "No"}
                value={Vb_Bank_Acc}
                onChange={handlevbbankacc}
              >
                {VbBankAcc.map((bank) => (
                  <MenuItem value={bank.bank_account}>
                    {bank.bank_account}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br />
          <label htmlFor="invoiceamount">Amount Received on</label>
          <br />
          <BasicDatePicker
            onChange={handleDate}
            value={Date_ ? new Date(Date_) : null}
            disabled={amountReceivedFlag === "No"}
          />
          <br />
          <label id="demo-multiple-name-label">Remarks</label>
          <TextField
            className="finalinput"
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={remarks}
            onChange={handleRemarksChange}
            data-test="comments-remarks-txtBox"
            inputProps={{
              "data-testid": "RemarksTxtBox",
              maxLength: 150,
            }}
          />
          <span className="cms-remarksCharCount">({charsLeft}/150)</span>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "gray",
              border: "1px solid gray",
              ":hover": {
                border: "1px solid gray",
              },
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
