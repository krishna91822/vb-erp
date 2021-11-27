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
const Allocated = () => {
  const data = useSelector((state) => state.pmo.allocatedData);
  const [associateName, setAssociateName] = useState("");
  const [projectAllocated, setProjectAllocated] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const filteredData = data.filter((eachData) => {
    return (
      eachData.associateName.toLowerCase().includes(associateName) &&
      eachData.projectAllocated.toLowerCase().includes(projectAllocated) &&
      eachData.startDate.includes(startDate) &&
      eachData.endDate.includes(endDate)
    );
  });
  return (
    <>
      <Container>
        <MiniHead data-test="main-heading">Allocation Information</MiniHead>
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
                  Project Allocated
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Percentage Allocated
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  Start Date
                </TableCell>
                <TableCell align="left" style={{ paddingBottom: "2px" }}>
                  End Date
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
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="text"
                    placeholder="Associate Name"
                    onChange={filterAssociateName}
                    value={associateName}
                  />
                </TableCell>
                <TableCell
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  align="left"
                >
                  <TextField
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="text"
                    placeholder="Project Allocated"
                    onChange={filterProjectAllocated}
                    value={projectAllocated}
                  />
                </TableCell>
                <TableCell
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  align="left"
                >
                  {"  "}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  align="left"
                >
                  {" "}
                  <TextField
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="date"
                    onChange={filterStartDate}
                    value={startDate}
                  />
                </TableCell>
                <TableCell
                  style={{ padding: "0px 8px", paddingBottom: "5px" }}
                  align="left"
                >
                  {" "}
                  <TextField
                    style={{ padding: "0px 8px", paddingBottom: "5px" }}
                    type="date"
                    onChange={filterEndDate}
                    value={endDate}
                  />
                </TableCell>
              </TableRow>
              {filteredData.map((currElem) => (
                <TableRow key={currElem.id}>
                  <TableCell align="left">{currElem.id}</TableCell>
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
      </Container>
    </>
  );
};
export default Allocated;
