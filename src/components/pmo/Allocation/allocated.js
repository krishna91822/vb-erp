import React, { useState, useEffect } from "react";
import { getAllocatedData } from "../../../store/pmo-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Container, MiniHead } from "./style";
import Tpagination from "../../UI/Pagination";

const Allocated = ({ pressed }) => {
  const { allocatedData } = useSelector((state) => state.pmo);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    empId: "",
    projectAllocated: "",
    allocationPercentage: "",
    employeeName: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    dispatch(getAllocatedData(filters));
  }, []);

  let data = allocatedData;
  data = [...data].sort((a, b) =>
    a.empId.empId > b.empId.empId ? 1 : b.empId.empId > a.empId.empId ? -1 : 0
  );

  const filterData = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    if (event.key === "Enter") {
      dispatch(getAllocatedData(filters));
    }
  };

  return (
    <>
      <Container>
        <MiniHead data-test="main-heading">Allocation Information</MiniHead>
        <TableContainer
          sx={{
            border: "0.1em solid #afacacde",
            borderRadius: "6px",
          }}
        >
          <Table data-test="list-table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "100px",
                    minWidth: "100px",
                  }}
                >
                  SNO
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "140px",
                    minWidth: "140px",
                  }}
                >
                  EmpID
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Associate Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Project Allocated
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Percentage Allocated
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  End Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pressed && (
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Emp Id"
                      name="empId"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.empId}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Associate Name"
                      name="employeeName"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.employeeName}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Project Allocated"
                      name="projectAllocated"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.projectAllocated}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="Number"
                      placeholder="Percentage Allocated"
                      name="allocationPercentage"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.allocationPercentage}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="date"
                      name="allocationStartDate"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.startDate}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="date"
                      inputProps={{ style: { fontSize: "small" } }}
                      name="allocationEndDate"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.endDate}
                    />
                  </TableCell>
                </TableRow>
              )}

              {data.map((currElem, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{currElem.empId.empId}</TableCell>
                  <TableCell align="left">
                    {currElem.empId.employeeName}
                  </TableCell>
                  <TableCell align="left">
                    {currElem.projectId.projectName}
                  </TableCell>
                  <TableCell align="left">
                    {currElem.allocationPercentage}
                  </TableCell>
                  <TableCell align="left">
                    {currElem.allocationStartDate}
                  </TableCell>
                  <TableCell align="left">
                    {currElem.allocationEndDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* <Tpagination page={page} setPage={setPage} rows={filteredData} /> */}
    </>
  );
};
export default Allocated;
