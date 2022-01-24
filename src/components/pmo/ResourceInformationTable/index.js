import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell } from "./../../../assets/GlobalStyle/style";
import { Container } from "./styles";
const ResourceInformationTable = ({ resources, removeResource, edit }) => {
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <StyledTableCell align="left">SNO</StyledTableCell>
              <StyledTableCell align="left">Associate Name</StyledTableCell>
              <StyledTableCell align="left">Start Date</StyledTableCell>
              <StyledTableCell align="left">End Date</StyledTableCell>
              <StyledTableCell align="left">% Allocation</StyledTableCell>
              <StyledTableCell align="left">Rack Rate</StyledTableCell>
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
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {eachData.empName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {eachData.allocationStartDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {eachData.allocationEndDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {eachData.allocationPercentage}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {eachData.rackRate}
                  </StyledTableCell>
                  {edit && (
                    <StyledTableCell
                      align="center"
                      onClick={() => {
                        removeResource(eachData.empId, eachData._id);
                      }}
                    >
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </StyledTableCell>
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
