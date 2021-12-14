import * as React from "react";
import "./employeeList.css";
import Button from "@mui/material/Button";
// import Pagination from "@mui/material/Pagination";
import EmployeeTable from "./EmployeeTable";
import { getEmployeesData } from "../../store/employees-actions";
import { useDispatch, useSelector } from "react-redux";
import { searchEmployeeData } from "../../store/employees-actions";
import { updateRewardEmployeeIdArray } from "../../store/rewards-actions";

const EmployeesList = (props) => {
  var collectedDataArray = [];
  const rows = [];
  var rowData;

  const dispatch = useDispatch();

  const employeesData = useSelector((state) => state.employee.employees);

  employeesData.map((data) => {
    rows.push({
      employee_id: data._id,
      id: data.empId,
      name: data.empName,
      email: data.empEmail,
    });
  });

  const updatePopupState = () => {
    collectedDataArray = [];
    props.setOpenPopup(false);
  };

  React.useEffect(() => {
    dispatch(getEmployeesData());
  }, [dispatch]);

  const getTextFieldData = (e) => {
    const data = e.target.value;
    dispatch(searchEmployeeData(data));
  };

  const getSelectedRowsData = () => {
    rowData = collectedDataArray;
    collectedDataArray = [];
    props.setOpenPopup(false);
    dispatch(updateRewardEmployeeIdArray(rowData, props.rewardId));
    console.log("hello", rowData);
  };

  return (
    <div className="employee-container">
      <div className="employee-search-container">
        <div className="employee-search-title">
          <p>Search:</p>
        </div>
        <div className="employee-search-form">
          <input
            onChange={getTextFieldData}
            type="text"
            placeholder="Search"
          ></input>
        </div>
      </div>
      <div className="employee-table-container">
        <EmployeeTable collectedDataArray={collectedDataArray} rows={rows} />
      </div>
      {/* <div className="employee-pagination-container">
        <Pagination count={2} color="primary" />
      </div> */}
      <div className="employee-button-container">
        <div className="employee-close-button">
          <Button onClick={updatePopupState} variant="outlined" color="error">
            Close
          </Button>
        </div>
        <div className="employee-save-button">
          <Button onClick={getSelectedRowsData} variant="contained">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
