import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BasicDatePicker from "../invoice_FORM/date";
import { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch, useSelector } from "react-redux";
import ComboBox from "../../UI/AutoComplete";
import "./CapturePO_SOW.css";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const specificEmpData = useSelector(
    (state) => state.CMS_state.specificEmpData
  );
  const [StartDate, setStartDate] = useState(
    props.edit ? new Date(specificEmpData[0].start_date) : new Date()
  );
  const [EndDate, setEndDate] = useState(
    props.edit ? new Date(specificEmpData[0].end_date) : new Date()
  );
  const [selectedOption, setSelectedOption] = useState(
    props.edit
      ? {
          emp_name: specificEmpData[0].emp_name,
          emp_id: specificEmpData[0].emp_id,
          start_date: "11 / 25 / 2021",
          end_date: "11 / 25 / 2021",
          percentage_alloc: 5,
        }
      : {
          emp_name: "",
          emp_id: "",
          start_date: new Date(),
          end_date: new Date(),
          percentage_alloc: 5,
        }
  );
  // console.log(emp_name);
  const [emp_id, setEmpId] = useState(
    props.edit ? specificEmpData[0].emp_id : ""
  );
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
  const handleEmpNameChange = (value) => {
    if (!!value) {
      setSelectedOption(value);
      setEmpId(value.emp_id);
    } else {
      setSelectedOption(selectedOption);
      setEmpId("");
    }
  };
  // const handleEmpIdChange = (e) => {
  //   setEmpId(e.target.value);
  // };
  const handleAddOnClick = (e) => {
    e.preventDefault();
    const DataToSend = {
      Employee_Name: selectedOption.emp_name,
      Allocation_Rate: percentageAlloc,
      Start_Date: StartDate,
      End_Date: EndDate,
      emp_id: Number(emp_id),
    };
    console.log(DataToSend);
  };
  // const employees = [
  //   { emp_name: "Alex", emp_id: 1994 },
  //   { emp_name: "David", emp_id: 1972 },
  //   { emp_name: "yusuf", emp_id: 1974 },
  //   { emp_name: "Aquib", emp_id: 2008 },
  //   { emp_name: "yash DY", emp_id: 1957 },
  //   { emp_name: "Ayushi", emp_id: 1993 },
  //   { emp_name: "Tanmay", emp_id: 1994 },
  // ];
  const employees = useSelector((state) => state.CMS_state.employees);
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
            {/* <div>
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
            </div> */}
            <div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={employees}
                onChange={(event, value) => handleEmpNameChange(value)}
                // onChange={(event, value) => console.log(value)}
                value={selectedOption}
                getOptionLabel={(option) => option.emp_name}
                isOptionEqualToValue={(option, value) =>
                  option.emp_id === value.emp_id
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Employee Name" />
                )}
              />
            </div>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Employee ID"
                value={emp_id}
                // onChange={handleEmpIdChange}
                disabled={true}
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
