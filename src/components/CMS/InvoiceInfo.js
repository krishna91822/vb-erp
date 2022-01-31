/* eslint-disable prettier/prettier */
import * as React from "react";
import Table from "@mui/material/Table";
import { Grid } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent, Box, InputAdornment, SvgIcon } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import TextField from "@mui/material/TextField";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormDialog from "./invoiceEditDialog";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LongMenu from "./invoiceOptions";
import { ContentTypo } from "../../pages/review/review.styles";

import {
  fetch_INVOICE_data,
  paginationFetchInvoice,
  searchINVOICE,
} from "../../store/CMS/INVOICE-actions";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import {
  fetchSpecificINVOICE,
  sortProducts,
} from "../../store/CMS/INVOICE-actions";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { StyledTypography } from "../../assets/GlobalStyle/style";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import { invoiceActions } from "../../store/CMS/INVOICE-slice";

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 15,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function InvoiceInfo() {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.INVOICE_state.invoiceData);
  const totalCount = useSelector((state) => state.INVOICE_state.totalCount);
  const user = useSelector((state) => state.user.user);
  const isReload = useSelector((state) => state.INVOICE_state.reload);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(5);
  const [filename, setFilename] = React.useState("Id");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(
      paginationFetchInvoice(filename, currentPage, postPerPage, searchKeyword)
    );
    if (isReload) {
      dispatch(invoiceActions.setReload());
    }
  }, [isReload]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (sortBy) => {
    setFilename(sortBy);

    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(
      paginationFetchInvoice(filename, currentPage, postPerPage, searchKeyword)
    );
  }, [filename]);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    dispatch(
      paginationFetchInvoice(filename, value, postPerPage, searchKeyword)
    );
  };
  const handlerowsPerpage = (event) => {
    setPostPerPage(event.target.value);
    dispatch(
      paginationFetchInvoice(
        filename,
        currentPage,
        event.target.value,
        searchKeyword
      )
    );
  };

  const renderChildStatus = (status) => {
    if (status === "Complete") {
      return <ContentTypo sx={{ color: "#2AB3A6" }}>{status}</ContentTypo>;
    } else if (status === "Invoice raised") {
      return <ContentTypo sx={{ color: "#F7C839" }}>{status}</ContentTypo>;
    } else if (status === "Overdue") {
      return <ContentTypo sx={{ color: "#b2102f" }}>{status}</ContentTypo>;
    } else {
      return <ContentTypo sx={{ color: "#212121" }}>{status}</ContentTypo>;
    }
  };
  const handleRowOnClick = (row_id) => {
    dispatch(fetchSpecificINVOICE(row_id));
  };

  const SearchTextHandler = (event) => {
    setSearchKeyword(event.target.value);
  };
  const searchHandler = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      dispatch(paginationFetchInvoice(filename, 1, 5, searchKeyword));
    }
  };
  return (
    <div className="list-wrapper">
      <StyledTypography>Invoice Information</StyledTypography>
      <Card>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    onChange={SearchTextHandler}
                    placeholder="Search by client/project name"
                    onKeyPress={searchHandler}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
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
                  <Button
                    id="demo-customized-button"
                    aria-controls="demo-customized-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    data-test="SortByButton"
                    style={{ borderColor: "black", color: "black" }}
                  >
                    Sort by
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => handleSort("Project_Name")}
                      disableRipple
                    >
                      By Project Name
                    </MenuItem>

                    <MenuItem
                      onClick={() => handleSort("invoice_amount_received")}
                      disableRipple
                    >
                      By invoice amount recieved
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleSort("Client_Name")}
                      disableRipple
                    >
                      By Client Name
                    </MenuItem>
                  </StyledMenu>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <div className="ListContainer">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Client Name</StyledTableCell>
                <StyledTableCell align="center">Project Name</StyledTableCell>
                <StyledTableCell align="center">PO/SOW Order</StyledTableCell>
                <StyledTableCell align="center">PO/SOW Amount</StyledTableCell>
                <StyledTableCell align="center">Invoice raised</StyledTableCell>
                <StyledTableCell align="center">
                  Amount Received
                </StyledTableCell>
                <StyledTableCell align="center">
                  Invoice Amount received
                </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {post.map((row, index) => (
                <TableRow
                  style={{ textDecoration: "none" }}
                  key={row.name}
                  className="table-row"
                >
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    className="table-cell"
                    data-test="clickable-row"
                  >
                    {postPerPage * (currentPage - 1) + (index + 1)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.purchase_orders.Client_Name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.purchase_orders.Project_Name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.purchase_orders.PO_Number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.purchase_orders.PO_Amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.invoice_raised}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.invoice_received}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.invoice_amount_received}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {renderChildStatus(row.Status)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <LongMenu
                      invoice_received={row.invoice_received}
                      invoiceID={row._id}
                      invoice_raised={row.invoice_raised}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          <Stack spacing={2}>
            {Math.ceil(totalCount / postPerPage) > 1 && (
              <Pagination
                count={Math.ceil(totalCount / postPerPage)}
                page={currentPage}
                onChange={handleChange}
              />
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default InvoiceInfo;
