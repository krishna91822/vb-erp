import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledTableCell,
  StyledTableCell2,
} from "./../../../assets/GlobalStyle/style";
import { Container } from "./styles";
const ResourceInformationTable = ({ resources, removeResource, edit }) => {
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <StyledTableCell align="center">SNO</StyledTableCell>
              <StyledTableCell align="center">Associate Name</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center">% Allocation</StyledTableCell>
              <StyledTableCell align="center">Rack Rate</StyledTableCell>
              {edit && <StyledTableCell align="center">Remove</StyledTableCell>}
            </TableRow>
          </TableHead>
          {resources.length > 0 && (
            <TableBody>
              {resources.map((eachData, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell2 align="center">
                    {index + 1}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {eachData.empName}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {eachData.allocationStartDate}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {eachData.allocationEndDate}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {eachData.allocationPercentage}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {eachData.rackRate}
                  </StyledTableCell2>
                  {edit && (
                    <StyledTableCell2
                      align="center"
                      onClick={() => {
                        removeResource(eachData.empId, eachData._id);
                      }}
                    >
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                          color: "grey",
                        }}
                      />
                    </StyledTableCell2>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!resources.length && (
          <p style={{ textAlign: "center", color: "grey", margin: "15px" }}>
            No Resource Allocated!!!
          </p>
        )}
      </TableContainer>
    </Container>
  );
};
export default ResourceInformationTable;
