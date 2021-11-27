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
import { useParams } from "react-router-dom";
import ComboBox from "../../UI/AutoComplete";
import { AddEmpToThisPO } from "../../../store/CMS/POSOW-actions";
import { GetDetailsOfThisEmp } from "../../../store/CMS/POSOW-actions";
import { PoSowActions } from "../../../store/CMS/POSOW-slice";
import "./CapturePO_SOW.css";

export default function FormDialog(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenForEdit = () => {
    setOpen(true);
    if (props.edit) {
      // GetDetailsOfThisEmp(props.row_id);
      dispatch(PoSowActions.setDefaultEmpDataOnedit(props.row_id));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const specificEmpData = useSelector(
    (state) => state.CMS_state.specificEmpData
  );
  // console.log(specificEmpData);
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState({
    emp_name: "",
    emp_id: "",
  });
  // console.log(emp_name);
  const [emp_id, setEmpId] = useState("");
  const [percentageAlloc, setPercentageAlloc] = useState("");
  useEffect(() => {
    if (props.edit) {
      setStartDate(new Date(specificEmpData[0].Start_Date));
      setEndDate(new Date(specificEmpData[0].End_Date));
      setSelectedOption({
        emp_name: specificEmpData[0].Employee_Name,
        emp_id: specificEmpData[0].Employee_Id,
      });
      setEmpId(specificEmpData[0].Employee_Id);
      setPercentageAlloc(specificEmpData[0].Allocation_Rate);
    }
  }, [specificEmpData]);

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
      Project_Id: params.id,

      Employee_Name: selectedOption.emp_name,
      Allocation_Rate: Number(percentageAlloc),
      Start_Date:
        StartDate.getMonth() +
        "/" +
        StartDate.getDate() +
        "/" +
        StartDate.getFullYear(),
      End_Date:
        EndDate.getMonth() +
        "/" +
        EndDate.getDate() +
        "/" +
        EndDate.getFullYear(),
      Employee_Id: emp_id.toString(),
    };
    console.log(DataToSend);
    dispatch(AddEmpToThisPO(DataToSend));
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
  const employees = useSelector((state) => state.CMS_state.AllAvailableEmp);
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
          onClick={handleClickOpenForEdit}
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
