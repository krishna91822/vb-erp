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
} from "@material-ui/core";

import { Container, MiniHead } from "./style";
import Tpagination from "../UI/Pagination";

const Bench = () => {
  const data = useSelector((state) => state.pmo.benchData);
  const [associateName, setAssociateName] = useState("");
  const [lastAllocatedProject, setLastAllocatedProject] = useState("");
  const [primaryCapabilities, setPrimaryCapabilities] = useState("");
  const [lastAllocatedDate, setLastAllocatedDate] = useState("");
  const [page, setPage] = React.useState(0);

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

  const filteredData = data.filter((eachData) => {
    return (
      eachData.associateName.toLowerCase().includes(associateName) &&
      eachData.lastAllocatedProject
        .toLowerCase()
        .includes(lastAllocatedProject) &&
      eachData.primaryCapabilities
        .toLowerCase()
        .includes(primaryCapabilities) &&
      eachData.lastallocationDate.includes(lastAllocatedDate)
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
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  ID
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  EmpID
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Associate Name
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Last Allocated Project
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Primary Capabilities
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Last Allocation Date
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Percentage Allocated
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{ backgroundColor: "rgb(227, 231, 231)" }}>
                <TableCell
                  align="left"
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                >
                  <TextField
                    type="text"
                    placeholder="Associate Name"
                    onChange={filterAssociateName}
                    value={associateName}
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                >
                  <TextField
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="text"
                    placeholder="Last Allocated Project"
                    onChange={filterLastAllocatedProject}
                    value={lastAllocatedProject}
                  />
                </TableCell>
                <TableCell
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  align="left"
                >
                  <TextField
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="text"
                    placeholder="Primary Capabilities"
                    onChange={filterPrimaryCapabilities}
                    value={primaryCapabilities}
                  />
                </TableCell>
                <TableCell
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  align="left"
                >
                  <TextField
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="date"
                    onChange={filterLastAllocatedDate}
                    value={lastAllocatedDate}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                ></TableCell>
              </TableRow>
              {filteredData.slice(page * 5, page * 5 + 5).map((currElem) => (
                <TableRow key={currElem.id}>
                  <TableCell align="left">{currElem.id}</TableCell>
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
                  <TableCell align="left">
                    {currElem.percentAllocated}
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
