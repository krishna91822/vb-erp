import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { Container, MiniHead } from "./style";
import Tpagination from "../../UI/Pagination";

const Bench = ({ pressed }) => {
  const { benchData } = useSelector((state) => state.pmo);
  const [associateName, setAssociateName] = useState("");
  const [lastAllocatedProject, setLastAllocatedProject] = useState("");
  const [primaryCapabilities, setPrimaryCapabilities] = useState("");
  const [lastAllocatedDate, setLastAllocatedDate] = useState("");
  const [page, setPage] = React.useState(0);
  const [empId, setEmpId] = useState("");

  let data = benchData;
  data = [...data].sort((a, b) =>
    a.empId > b.empId ? 1 : b.empId > a.empId ? -1 : 0
  );
  const filterAssociateName = (event) => {
    const assName = event.target.value.toLowerCase();
    setAssociateName(assName);
  };

  const filterLastAllocatedProject = (event) => {
    const lastAllocatedPro = event.target.value.toLowerCase();
    setLastAllocatedProject(lastAllocatedPro);
  };

  const filterPrimaryCapabilities = (event) => {
    const primcapabilty = event.target.value.toLowerCase();
    setPrimaryCapabilities(primcapabilty);
  };

  const filterLastAllocatedDate = (event) => {
    const lastAlloDate = event.target.value;
    setLastAllocatedDate(lastAlloDate);
  };

  const filterEmpId = (event) => {
    const empAll = event.target.value.toUpperCase();
    setEmpId(empAll);
  };

  const filteredData = data.filter((eachData) => {
    return (
      eachData.associateName.toLowerCase().includes(associateName) &&
      eachData.lastAllocatedProject
        .toLowerCase()
        .includes(lastAllocatedProject) &&
      eachData.primaryCapabilities
        .toLowerCase()
        .includes(primaryCapabilities) &&
      eachData.lastallocationDate.includes(lastAllocatedDate) &&
      eachData.empId.toUpperCase().includes(empId)
    );
  });

  return (
    <>
      <Container>
        <MiniHead data-test="main-heading">Bench Capacity</MiniHead>
        <TableContainer>
          <Table data-test="list-table">
            <TableHead>
              <TableRow>
                <TableCell align="left">SNO</TableCell>
                <TableCell align="left">EmpID</TableCell>
                <TableCell align="left">Associate Name</TableCell>
                <TableCell align="left">Last Allocated Project</TableCell>
                <TableCell align="left">Primary Capabilities</TableCell>
                <TableCell align="left">Last Allocation Date</TableCell>
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
                      placeholder="Last Allocated Project"
                      onChange={filterLastAllocatedProject}
                      value={lastAllocatedProject}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Primary Capabilities"
                      onChange={filterPrimaryCapabilities}
                      value={primaryCapabilities}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="date"
                      onChange={filterLastAllocatedDate}
                      value={lastAllocatedDate}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                </TableRow>
              )}

              {filteredData
                .slice(page * 5, page * 5 + 5)
                .map((currElem, index) => (
                  <TableRow key={currElem.id}>
                    <TableCell align="left">{index + page * 5 + 1}</TableCell>
                    <TableCell align="left">{currElem.empId}</TableCell>
                    <TableCell align="left">{currElem.associateName}</TableCell>
                    <TableCell align="left">
                      {currElem.lastAllocatedProject}
                    </TableCell>
                    <TableCell align="left">
                      {currElem.primaryCapabilities}
                    </TableCell>
                    <TableCell align="left">
                      {currElem.lastallocationDate}
                    </TableCell>
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

export default Bench;
