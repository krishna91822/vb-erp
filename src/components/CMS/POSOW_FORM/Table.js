import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FormDialog from "./AddEmpToPO";
import { UnAssignThisEmp } from "../../../store/CMS/POSOW-actions";

export default function DenseTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.CMS_state.employees);

  const handleUnassignBtnClick = (emp_id) => {
    dispatch(UnAssignThisEmp(emp_id));
  };
  function formatDate(date) {
    const currentMonth = date.getMonth() + 1;
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate() + 1;
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${monthString}/${dateString}/${date.getFullYear()}`;
  }
  return (
    <TableContainer component={Paper} style={{ height: 200 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead data-test="emp-table-head">
          <TableRow>
            <TableCell align="center">
              <strong>Employee Name</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Employee ID</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Start Date</strong>
            </TableCell>
            <TableCell align="center">
              <strong>End Date</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Allocation Rate</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Option</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Employee_Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              // onClick={() => GetDetailsOfThisEmp(row.Employee_Id)}
            >
              <TableCell component="th" scope="row" align="center">
                {row.Employee_Name}
              </TableCell>
              <TableCell align="center">{row.Employee_Id}</TableCell>
              <TableCell align="center">
                {formatDate(new Date(row.Start_Date))}
              </TableCell>
              <TableCell align="center">
                {formatDate(new Date(row.End_Date))}
              </TableCell>
              <TableCell align="center">{row.Allocation_Rate}</TableCell>
              <TableCell align="center">
                <FormDialog
                  edit={true}
                  row_id={row._id}
                  data-test="Add-emp-dialogBox"
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "85px",
                    maxHeight: "35px",
                    minWidth: "50px",
                    minHeight: "30px",
                    backgroundColor: "maroon",
                  }}
                  type="button"
                  onClick={() => {
                    handleUnassignBtnClick(row.Employee_Id);
                  }}
                  data-test="Unassign-emp-btn"
                >
                  Unassign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
