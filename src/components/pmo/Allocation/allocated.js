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
  const [associateName, setAssociateName] = useState("");
  const [projectAllocated, setProjectAllocated] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = React.useState(0);
  const [empId, setEmpId] = useState("");
  const [percentageAllocation, setPercentageAllocation] = useState("");

  useEffect(() => {
    dispatch(getAllocatedData());
  }, []);

  let data = allocatedData;
  data = [...data].sort((a, b) =>
    a.empId.empId > b.empId.empId ? 1 : b.empId.empId > a.empId.empId ? -1 : 0
  );

  const filterAssociateName = (event) => {
    const assName = event.target.value.toLowerCase();
    setAssociateName(assName);
  };

  const filterProjectAllocated = (event) => {
    const proAll = event.target.value.toLowerCase();
    setProjectAllocated(proAll);
  };

  const filterStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const filterEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const filterEmpId = (event) => {
    const empAll = event.target.value.toUpperCase();
    setEmpId(empAll);
  };

  const filterPercentage = (event) => {
    const perc = event.target.value;
    setPercentageAllocation(perc);
  };

  const filteredData = data.filter((eachData) => {
    return (
      eachData.empId.employeeName.toLowerCase().includes(associateName) &&
      eachData.projectId.projectName.toLowerCase().includes(projectAllocated) &&
      eachData.allocationStartDate.includes(startDate) &&
      eachData.allocationEndDate.includes(endDate) &&
      eachData.empId.empId.toUpperCase().includes(empId) &&
      eachData.allocationPercentage.toString().includes(percentageAllocation)
    );
  });

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
                      onChange={filterEmpId}
                      value={empId}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Associate Name"
                      onChange={filterAssociateName}
                      value={associateName}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Project Allocated"
                      onChange={filterProjectAllocated}
                      value={projectAllocated}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="Number"
                      placeholder="Percentage Allocated"
                      onChange={filterPercentage}
                      value={percentageAllocation}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="date"
                      onChange={filterStartDate}
                      value={startDate}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="date"
                      inputProps={{ style: { fontSize: "small" } }}
                      onChange={filterEndDate}
                      value={endDate}
                    />
                  </TableCell>
                </TableRow>
              )}

              {filteredData
                .slice(page * 5, page * 5 + 5)
                .map((currElem, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + page * 5 + 1}</TableCell>
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
      <Tpagination page={page} setPage={setPage} rows={filteredData} />
    </>
  );
};
export default Allocated;
