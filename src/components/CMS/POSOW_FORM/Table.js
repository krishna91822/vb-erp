import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FormDialog from "./AddEmpToPO";
import { UnAssignThisEmp } from "../../../store/CMS/POSOW-actions";

// function createData(emp_name, emp_id, start_date, end_date) {
//   return { emp_name, emp_id, start_date, end_date };
// }

// const rows = [
//   createData("Alex", 159, "11 / 25 / 2021", "11 / 25 / 2021"),
//   createData("Ravi", 154, "11 / 25 / 2021", "11 / 25 / 2021"),
//   createData("Hari", 149, "11 / 25 / 2021", "11 / 25 / 2021"),
//   createData("Rama", 129, "11 / 25 / 2021", "11 / 25 / 2021"),
//   createData("Srikant", 153, "11 / 25 / 2021", "11 / 25 / 2021"),
// ];

export default function DenseTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.CMS_state.employees);
  // const handleRowOnClick = (row_id) => {
  //   dispatch(GetDetailsOfThisEmp(row_id));
  // };
  const handleUnassignBtnClick = (emp_id) => {
    dispatch(UnAssignThisEmp(emp_id));
  };
  return (
    <TableContainer component={Paper} style={{ height: 200 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
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
              <TableCell align="center">{row.Start_Date}</TableCell>
              <TableCell align="center">{row.End_Date}</TableCell>
              <TableCell align="center">{row.Allocation_Rate}</TableCell>
              <TableCell align="center">
                <FormDialog edit={true} row_id={row._id} />
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
                  data-testid="UpdateBtn"
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
