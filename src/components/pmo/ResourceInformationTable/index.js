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

const ResourceInformationTable = ({ resources, removeResource, edit }) => {
  return (
    <TableContainer
      data-test="associate-table"
      style={{ flexWrap: "wrap", marginTop: 5 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          style={{
            backgroundColor: "#EDEDED",
            borderWidth: 2,
            borderColor: "rgb(162 157 157)",
            borderStyle: "solid",
          }}
        >
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
                key={eachData.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{eachData.associateName}</TableCell>
                <TableCell align="left">{eachData.startDate}</TableCell>
                <TableCell align="left">{eachData.endDate}</TableCell>
                <TableCell align="left">{eachData.allocation}</TableCell>
                <TableCell align="left">{eachData.rackRate}</TableCell>
                {edit && (
                  <TableCell
                    align="center"
                    onClick={() => removeResource(eachData.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <DeleteIcon />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default ResourceInformationTable;
