import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetch_INVOICE_data } from "../../store/CMS/INVOICE-actions";
// import setPosts from './Main/actions'
// import { sortProducts } from "../../store/CMS/POSOW-actions";
import {
  fetch_INVOICE_data,
  paginationFetchInvoice,
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

  useEffect(() => {
    dispatch(fetch_INVOICE_data);
    dispatch(paginationFetchInvoice(filename, currentPage, postPerPage));
  }, []);
  const post = useSelector((state) => state.INVOICE_state.invoiceData);
  const totalCount = useSelector((state) => state.INVOICE_state.totalCount);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(5);
  const [filename, setFilename] = React.useState("Id");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSort = (product) => {
    // dispatch(sortProducts(product));
    dispatch(fetch_INVOICE_data(product));
    setAnchorEl(null);
  };
  const handleChange = (event, value) => {
    setCurrentPage(value);
    dispatch(paginationFetchInvoice(filename, value, postPerPage));
  };
  const handlerowsPerpage = (event) => {
    setPostPerPage(event.target.value);
    dispatch(paginationFetchInvoice(filename, currentPage, event.target.value));
  };
  const handleRowOnClick = (row_id) => {
    dispatch(fetchSpecificINVOICE(row_id));
  };
  return (
    <>
      <div className="sortbtn">
        <Button
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          data-test="SortByButton"
          className="sort-by-button"
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
          <MenuItem onClick={() => handleSort("Project_Name")} disableRipple>
            By Project Name
          </MenuItem>

          <MenuItem
            onClick={() => handleSort("invoice_amount_received")}
            disableRipple
          >
            By invoice amount recieved
          </MenuItem>
          <MenuItem onClick={() => handleSort("Client_Name")} disableRipple>
            By Client Name
          </MenuItem>
        </StyledMenu>
      </div>
      <div className="container">
        <div className="innerheader">
          <div>
            <h3 data-test="MainHeading">Invoice Information</h3>
          </div>
          <div className="buttondiv">
            <Link to="/invoice/create-invoice">
              <button className="button1" data-test="Capture-po-sow">
                Capture Invoice{" "}
              </button>
            </Link>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="Table-row-po-sow"
          >
            <TableHead className="tablehead">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>PO/SOW Order</TableCell>
                <TableCell>PO/SOW Amount</TableCell>
                <TableCell>Invoice raised</TableCell>
                <TableCell>Invoice Amount received</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-row-posow">
              {post.map((row, index) => (
                <TableRow
                  component={Link}
                  to={`/invoice/detail/${row._id}`}
                  onClick={() => handleRowOnClick(row._id)}
                  key={row.name}
                  style={{ textDecoration: "none" }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="table-cell"
                    data-test="clickable-row"
                  >
                    {postPerPage * (currentPage - 1) + (index + 1)}
                  </TableCell>
                  <TableCell>{row.purchase_orders.Client_Name}</TableCell>
                  <TableCell>{row.purchase_orders.Project_Name}</TableCell>
                  <TableCell>{row.purchase_orders.PO_Number}</TableCell>
                  <TableCell>{row.purchase_orders.PO_Amount}</TableCell>
                  <TableCell>{row.invoice_raised}</TableCell>
                  <TableCell>{row.invoice_amount_received}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={10}>
          <div className="Pagination">
            <Typography className="pagenumber">Page: {currentPage}</Typography>
            <div className="numbering">
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Rows per page:
              </InputLabel>
              <NativeSelect
                value={postPerPage}
                onChange={handlerowsPerpage}
                defaultValue={30}
              >
                {/* <Select value={postPerPage} onChange={handlerowsPerpage}>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select> */}
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </NativeSelect>
              <Pagination
                count={Math.ceil(totalCount / postPerPage)}
                page={currentPage}
                onChange={handleChange}
              />
            </div>
          </div>
        </Stack>
      </div>
    </>
  );
}

export default InvoiceInfo;
