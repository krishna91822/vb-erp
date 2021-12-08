import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import PageHeader from "./PageHeader";
import "../../assets/styles/ListStyles.css";

import ClientHelpers from "./ClientHelpers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [];

function ClientsList() {
  const { clientsList, handleClientData } = ClientHelpers();

  function EditButton(clientId) {
    return (
      <div>
        <Button
          variant="fab"
          className="edit-btn"
          endIcon={<EditIcon color="warning" />}
          onMouseDown={() => {
            handleClientData(clientId, true);
          }}
        >
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader />
      <div className="ListContainer">
        <TableContainer component={Paper} align="right">
          <Table sx={{ maxWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">
                  Primary Contact
                </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientsList.map((client, idx) => (
                <StyledTableRow
                  onClick={() => {
                    handleClientData(client._id, false);
                  }}
                  className="table-row"
                  key={client._id}
                >
                  <StyledTableCell align="center">{idx + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {client.brandName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {client.contacts.primaryContact
                      ? client.contacts.primaryContact.title
                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {client.status ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {EditButton(client._id)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ClientsList;
