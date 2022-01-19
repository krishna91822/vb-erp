import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Stack,
  Pagination,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  SvgIcon,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cimsActions } from "../../store/cims-slice";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ClientHelpers from "./ClientHelpers";
import { StyledTypography } from "../../assets/GlobalStyle/style";
import { StyledTableCell } from "../../assets/GlobalStyle/style";

import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon,
  ManageSearchRounded as ManageSearchRoundedIcon,
  ClearRounded as ClearRoundedIcon,
} from "@mui/icons-material";
import PageHeader from "./PageHeader";
import "./styles/ClientListStyles.css";

function ClientsList() {
  const {
    clientsList,
    handleClientData,
    handelActiveStatus,
    sortBy,
    filterBy,
    sortingOrder,
    handelSortBy,
    handelFilterBy,
    handelSortingOrder,
    user,
    pages,
    pageNo,
    searchBy,
    handelPageChange,
    handelSearch,
    handelClearSearch,
  } = ClientHelpers();

  const dispatch = useDispatch();

  const sortByFields = [
    { id: "createdAt", label: "By Start Date" },
    { id: "brandName", label: "By Company" },
    { id: "contacts.primaryContact.firstName", label: "By Associate Name" },
    { id: "registeredAddress.country", label: "By Location" },
  ];

  const filterByFields = [
    { id: 1, label: "Active Client" },
    { id: 0, label: "Inactive Client" },
  ];

  const handleSortBy = (e) => {
    handelSortBy(e.target.value);
  };

  const handleFilterBy = (e) => {
    handelFilterBy(e.target.value);
  };

  const handleSortOrder = (e) => {
    handelSortingOrder(e.target.checked);
  };

  const handleCreate = () => {
    dispatch(cimsActions.resetForm());
  };

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

  const clients = clientsList.map((client, idx) => (
    <TableRow className="table-row" key={client._id}>
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
      {user.permissions.includes("update_on_CIMS_module") && (
        <StyledTableCell
          onClick={() =>
            handelMenu(client._id, client.status, client.brandName)
          }
          align="center"
        >
          {menuIcon()}
        </StyledTableCell>
      )}
    </TableRow>
  ));

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
    <div className="client-list-wrapper">
      <StyledTypography>CIMS</StyledTypography>
      <Card>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <TextField
                    fullWidth
                    id="search"
                    placeholder="Search Company Name / Associate Name / Location"
                    value={searchBy}
                    onChange={handelSearch}
                    onKeyPress={handelSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handelClearSearch}>
                            <ClearRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search customer"
                    variant="outlined"
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={8}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Box m={1}>
                  {user.permissions.includes("create_CIMS_module") && (
                    <Link to="/cims/create" style={{ textDecoration: "none" }}>
                      <Button
                        onClick={handleCreate}
                        variant="contained"
                        style={{ backgroundColor: "chocolate" }}
                      >
                        Create a customer
                      </Button>
                    </Link>
                  )}
                </Box>
                <Box m={1}>
                  <FormControl size="small">
                    <InputLabel id="filterBy">Filter By</InputLabel>
                    <Select
                      labelId="filterBy"
                      id="select"
                      value={filterBy}
                      label="filterBy"
                      onChange={handleFilterBy}
                    >
                      {filterByFields.map((field) => (
                        <MenuItem key={field.id} value={field.id}>
                          {field.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box m={1}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="sortBy">Sort By</InputLabel>
                    <Select
                      labelId="sortBy"
                      id="select"
                      value={sortBy}
                      label="sortBy"
                      onChange={handleSortBy}
                    >
                      {sortByFields.map((field) => (
                        <MenuItem key={field.id} value={field.id}>
                          {field.label}
                        </MenuItem>
                      ))}

                      <FormControlLabel
                        sx={{
                          marginLeft: ".5rem",
                        }}
                        control={
                          <Checkbox
                            onChange={(e) => handleSortOrder(e)}
                            size="small"
                            checked={sortingOrder === 1}
                          />
                        }
                        label={<SortByAlphaIcon />}
                      />
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <div className="ListContainer">
        <TableContainer>
          <Table sx={{ maxWidth: "100%" }}>
            <TableHead>
              <TableRow className="table-header">
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">Associate Name</StyledTableCell>
                <StyledTableCell align="center">Location</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Registered On</StyledTableCell>
                {user.permissions.includes("update_on_CIMS_module") && (
                  <StyledTableCell align="center">Actions</StyledTableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>{clientsList.length !== 0 && clients}</TableBody>
          </Table>
        </TableContainer>
        {clientsList.length === 0 && (
          <Typography
            mt={18}
            sx={{ textAlign: "center", color: "gray" }}
            variant="h4"
          >
            No Records Found!
          </Typography>
        )}
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
