import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BasicDatePicker from "../invoice_FORM/date";
import { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./CapturePO_SOW.css";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [emp_name, setEmpName] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [percentageAlloc, setPercentageAlloc] = useState("");
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };
  const handlePercentageAllocChange = (e) => {
    setPercentageAlloc(e.target.value);
  };
  const handleEmpNameChange = (e) => {
    setEmpName(e.target.value);
  };
  const handleEmpIdChange = (e) => {
    setEmpId(e.target.value);
  };
  const handleAddOnClick = (e) => {
    e.preventDefault();
    const DataToSend = {
      Employee_Name: emp_name,
      Allocation_Rate: percentageAlloc,
      Start_Date: StartDate,
      End_Date: EndDate,
      emp_id: emp_id,
    };
    console.log(DataToSend);
  };

  return (
    <div>
      {props.edit ? (
        <Button
          variant="contained"
          color="success"
          style={{
            maxWidth: "70px",
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
          }}
          type="button"
          onClick={handleClickOpen}
          data-testid="UpdateBtn"
        >
          <CreateIcon />
          Edit
        </Button>
      ) : (
        <AddBoxIcon fontSize="large" onClick={handleClickOpen} />
      )}
      {/* <AddBoxIcon fontSize="large" onClick={handleClickOpen} /> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {props.edit ? "Update Details" : "Assign Employee to this PO"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Add Employee</DialogContentText> */}
          <div className="AssignEmpParentDiv">
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Employee Name"
                value={emp_name}
                onChange={handleEmpNameChange}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Employee ID"
                value={emp_id}
                onChange={handleEmpIdChange}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div>
              <label>Start Date</label>
              <br />
              <BasicDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={StartDate}
                onChange={handleStartDateChange}
              />
              <br />
            </div>
            <div>
              <label>End Date</label>
              <br />
              <BasicDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={EndDate}
                onChange={handleEndDateChange}
              />
              <br />
            </div>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Percentage Allocation"
                value={percentageAlloc}
                onChange={handlePercentageAllocChange}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(e) => handleAddOnClick(e)}>
            {props.edit ? "Update" : "Assign"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
