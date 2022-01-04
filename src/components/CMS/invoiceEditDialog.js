import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { invoiceActions } from "../../store/CMS/INVOICE-slice";
import { useDispatch, useSelector } from "react-redux";
import "./Main.css";

export default function FormDialog(props) {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.INVOICE_state.popup);

  const handleClose = () => {
    dispatch(invoiceActions.setPopupOpen());
    dispatch(invoiceActions.setpopupVisibility());
  };
  const [invoiceRaisedFlag, setInvoiceRaisedFlag] = useState("No");
  const [amountReceivedFlag, setAmountReceivedFlag] = useState("No");
  const [amount, setAmount] = useState("");
  const handleInvoiceRaised = (event) => {
    setInvoiceRaisedFlag(event.target.value);
  };
  const handleAmountReceived = (event) => {
    setAmountReceivedFlag(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleUpdate = () => {
    const dataToSend = {
      invoice_raised: invoiceRaisedFlag,
      invoice_received: amountReceivedFlag,
      invoice_amount_received: Number(amount),
    };
    console.log("update clicked", dataToSend);
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
                      onChange={handleInvoiceRaised}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
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
                    onChange={handleAmountReceived}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
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
            label="Invoice amount received"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
