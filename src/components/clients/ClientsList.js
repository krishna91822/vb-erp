import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  Pagination,
  Box,
  TextField,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon,
  ManageSearchSharp as ManageSearchSharpIcon,
} from "@mui/icons-material";
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

function ClientsList() {
  const {
    clientsList,
    handleClientData,
    handelActiveStatus,

    pages,
    pageNo,
    handelPageChange,
    handelSearch,
  } = ClientHelpers();

  const [clientId, setClientId] = useState();
  const [clientStatus, setClientStatus] = useState();
  const [brandName, setBrandName] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelMenu = (id, status, brandName) => {
    setClientId(id);
    setClientStatus(status);
    setBrandName(brandName);
  };

  function menuIcon() {
    return (
      <>
        <IconButton
          aria-label="actions"
          id="actions-button"
          aria-controls="actions"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="actions"
          MenuListProps={{
            "aria-labelledby": "actions-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "16ch",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleClientData(clientId, true);
            }}
            disableRipple
          >
            <ListItemIcon>
              <EditIcon color="warning" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              handelActiveStatus(clientId, clientStatus, brandName);
            }}
            disableRipple
          >
            <ListItemIcon>
              {clientStatus ? (
                <DeleteIcon color="error" />
              ) : (
                <RestoreIcon color="success" />
              )}
            </ListItemIcon>
            <ListItemText>
              {clientStatus ? "Deactivate" : "Reactivate"}
            </ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <div>
      <PageHeader />
      <Box m={1} sx={{ display: "flex", alignItems: "flex-end" }}>
        <ManageSearchSharpIcon
          style={{
            margin: "0 .5rem",
            width: "2rem",
            height: "2rem",
          }}
        />
        <TextField
          fullWidth
          id="search"
          placeholder="Search Company Name / Associate Name / Location"
          variant="standard"
          onChange={handelSearch}
        />
      </Box>
      <div className="ListContainer">
        <TableContainer component={Paper} align="right">
          <Table sx={{ maxWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">Associate Name</StyledTableCell>
                <StyledTableCell align="center">Location</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Registered On</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientsList.map((client, idx) => (
                <StyledTableRow className="table-row" key={client._id}>
                  <StyledTableCell
                    onClick={() => {
                      handleClientData(client._id, false);
                    }}
                    align="center"
                  >
                    {client.rowNumber}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      handleClientData(client._id, false);
                    }}
                    align="center"
                  >
                    {client.brandName}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      handleClientData(client._id, false);
                    }}
                    align="center"
                  >
                    {`${client.contacts.primaryContact.firstName} ${client.contacts.primaryContact.lastName}`}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      handleClientData(client._id, false);
                    }}
                    align="center"
                  >
                    {client.registeredAddress.country.split("-")[0]}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      handleClientData(client._id, false);
                    }}
                    align="center"
                  >
                    {client.status ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      handleClientData(client._id, false);
                    }}
                    align="center"
                  >
                    {client.createdAt.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() =>
                      handelMenu(client._id, client.status, client.brandName)
                    }
                    align="center"
                  >
                    {menuIcon()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={pages} page={pageNo} onChange={handelPageChange} />
        </Stack>
      </div>
    </div>
  );
}

export default ClientsList;
