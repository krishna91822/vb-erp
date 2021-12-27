import * as React from "react";
import "./employeeList.css";
import Button from "@mui/material/Button";
import EmployeeTable from "./EmployeeTable";
import { getEmployeesData } from "../../store/employees-actions";
import { useDispatch, useSelector } from "react-redux";
import { searchEmployeeData } from "../../store/employees-actions";
import { updateRewardEmployeeIdArray } from "../../store/rewards-actions";
import { toast } from "react-toastify";

const EmployeesList = (props) => {
  var collectedDataArray = [];
  const rows = [];
  var rowData;

  const dispatch = useDispatch();

  const employeesData = useSelector((state) => state.employee.employees);

  employeesData.forEach((data) => {
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
    let employees_id = [];
    if (props.receiver) {
      props.updaterecipientsData(rowData);
      toast.success("Reward Receivers Added");
    }
    if (props.sender) {
      props.updateSenderData(rowData);
      toast.success("Reward Sender Added");
    }
    rowData.forEach((data) => {
      employees_id.push(data.employee_id);
    });
    const dataIds = {
      recipients_ids: employees_id,
    };
    if (props.rewardList) {
      dispatch(updateRewardEmployeeIdArray(dataIds, props.rewardId));
    }
  };

  const onRowClicked = (rowData, rowState) => {
    let rowStatus = false;
    let rowEmployeeId;
    var collectedDataObject = {};
    collectedDataObject.name = rowData.row.name;
    collectedDataObject.email = rowData.row.email;
    collectedDataObject.employee_id = rowData.row.employee_id;
    for (var i = 0; i < collectedDataArray.length; i++) {
      if (
        collectedDataObject.employee_id === collectedDataArray[i].employee_id
      ) {
        rowStatus = true;
        rowEmployeeId = collectedDataObject.employee_id;
      }
    }

    if (rowStatus === true) {
      collectedDataArray = collectedDataArray.filter(
        (data) => data.employee_id !== rowEmployeeId
      );
    } else {
      collectedDataArray.push(collectedDataObject);
    }
  };

  return (
    <>
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
          <EmployeeTable onRowClicked={onRowClicked} rows={rows} />
        </div>
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
    </>
  );
};

export default EmployeesList;
