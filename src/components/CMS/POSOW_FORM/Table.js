import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";

function createData(emp_name, emp_id, start_date, end_date) {
  return { emp_name, emp_id, start_date, end_date };
}

const rows = [
  createData("Alex", 159, "11 / 25 / 2021", "11 / 25 / 2021"),
  createData("Ravi", 154, "11 / 25 / 2021", "11 / 25 / 2021"),
  createData("Hari", 149, "11 / 25 / 2021", "11 / 25 / 2021"),
  createData("Rama", 129, "11 / 25 / 2021", "11 / 25 / 2021"),
  createData("Srikant", 153, "11 / 25 / 2021", "11 / 25 / 2021"),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper} style={{ height: 150 }}>
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
              key={row.emp_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.emp_name}
              </TableCell>
              <TableCell align="center">{row.emp_id}</TableCell>
              <TableCell align="center">{row.start_date}</TableCell>
              <TableCell align="center">{row.end_date}</TableCell>
              <TableCell align="center">
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
                  // onClick={(event) => submitForm(event)}
                  data-testid="UpdateBtn"
                >
                  <CreateIcon />
                  Edit
                </Button>
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
                  // onClick={(event) => submitForm(event)}
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
