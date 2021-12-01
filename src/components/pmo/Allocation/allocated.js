import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Container, MiniHead } from "./style";
import Tpagination from "../../UI/Pagination";

const Allocated = ({ pressed }) => {
  const { allocatedData } = useSelector((state) => state.pmo);
  const [associateName, setAssociateName] = useState("");
  const [projectAllocated, setProjectAllocated] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = React.useState(0);
  const [empId, setEmpId] = useState("");
  const [percentageAllocation, setPercentageAllocation] = useState("");

  let data = allocatedData;
  data = [...data].sort((a, b) =>
    a.empId > b.empId ? 1 : b.empId > a.empId ? -1 : 0
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
    const perc = event.target.value.toUpperCase();
    setPercentageAllocation(perc);
  };

  const filteredData = data.filter((eachData) => {
    return (
      eachData.associateName.toLowerCase().includes(associateName) &&
      eachData.projectAllocated.toLowerCase().includes(projectAllocated) &&
      eachData.startDate.includes(startDate) &&
      eachData.endDate.includes(endDate) &&
      eachData.empId.toUpperCase().includes(empId) &&
      eachData.percentAllocated.toUpperCase().includes(percentageAllocation)
    );
  });

  return (
    <>
      <TextField type="text" placeholder="Emp Id" />
      <Container>
        <MiniHead data-test="main-heading">Allocation Information</MiniHead>
        <TableContainer>
          <Table data-test="list-table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">EmpID</TableCell>
                <TableCell align="left">Associate Name</TableCell>
                <TableCell align="left">Project Allocated</TableCell>
                <TableCell align="left" style={{ minWidth: "170px" }}>
                  Percentage Allocated
                </TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pressed && (
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    <TextField
                      type="text"
                      placeholder="Emp Id"
                      onChange={filterEmpId}
                      value={empId}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="text"
                      placeholder="Associate Name"
                      onChange={filterAssociateName}
                      value={associateName}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="text"
                      placeholder="Project Allocated"
                      onChange={filterProjectAllocated}
                      value={projectAllocated}
                    />
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    <TextField
                      type="date"
                      onChange={filterStartDate}
                      value={startDate}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      type="date"
                      onChange={filterEndDate}
                      value={endDate}
                    />
                  </TableCell>
                </TableRow>
              )}

              {filteredData
                .slice(page * 5, page * 5 + 5)
                .map((currElem, index) => (
                  <TableRow key={currElem.id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{currElem.empId}</TableCell>
                    <TableCell align="left">{currElem.associateName}</TableCell>
                    <TableCell align="left">
                      {currElem.projectAllocated}
                    </TableCell>
                    <TableCell align="left">
                      {currElem.percentAllocated}
                    </TableCell>
                    <TableCell align="left">{currElem.startDate}</TableCell>
                    <TableCell align="left">{currElem.endDate}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Tpagination page={page} setPage={setPage} rows={filteredData} />
      </Container>
    </>
  );
};
export default Allocated;
