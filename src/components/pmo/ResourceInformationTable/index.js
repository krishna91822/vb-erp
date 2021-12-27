import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Container } from "./styles";
const ResourceInformationTable = ({ resources, removeResource, edit }) => {
  return (
    <Container>
      <TableContainer
        data-test="associate-table"
        sx={{
          border: "0.1em solid #afacacde",
          borderRadius: "6px",
        }}
        style={{ flexWrap: "wrap", marginTop: 5 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">SNO</TableCell>
              <TableCell align="left">Associate Name</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">% Allocation</TableCell>
              <TableCell align="left">Rack Rate</TableCell>
              {edit && <TableCell align="center">Remove</TableCell>}
            </TableRow>
          </TableHead>
          {resources.length > 0 && (
            <TableBody>
              {resources.map((eachData, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{eachData.empName}</TableCell>
                  <TableCell align="left">
                    {eachData.allocationStartDate}
                  </TableCell>
                  <TableCell align="left">
                    {eachData.allocationEndDate}
                  </TableCell>
                  <TableCell align="left">
                    {eachData.allocationPercentage}
                  </TableCell>
                  <TableCell align="left">{eachData.rackRate}</TableCell>
                  {edit && (
                    <TableCell
                      align="center"
                      onClick={() => {
                        removeResource(eachData.empId, eachData._id);
                      }}
                    >
                      <DeleteIcon
                        style={{
                          cursor: "pointer",
                          // "&:hover": {
                          //   backgroundColor: "red",
                          //   color: "red",
                          // },
                        }}
                      />
                    </TableCell>
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
