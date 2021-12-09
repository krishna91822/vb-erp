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
// import api from '../api/posts'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import setPosts from './Main/actions'
// import { sortProducts } from "../../store/CMS/POSOW-actions";
import { fetch_INVOICE_data } from "../../store/CMS/INVOICE-actions";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import {
  fetchSpecificINVOICE,
  sortProducts,
} from "../../store/CMS/INVOICE-actions";

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
    dispatch(fetch_INVOICE_data("Id"));
  }, []);
  const post = useSelector((state) => state.INVOICE_state.invoiceData);
  console.log(post);
  const [currentpage, currentsetPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(5);
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
    currentsetPage(value);
  };
  const handleRowOnClick = (row_id) => {
    dispatch(fetchSpecificINVOICE(row_id));
  };
  const indexOfLastPost = currentpage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
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

          <MenuItem onClick={() => handleSort("invoice_raised")} disableRipple>
            By invoice raised
          </MenuItem>
          <MenuItem onClick={() => handleSort("Client_Name")} disableRipple>
            By Client Name
          </MenuItem>
        </StyledMenu>
      </div>
      <div className="container">
        <div className="innerheader">
          <div>
            <h3>Invoice Information</h3>
          </div>
          <div className="buttondiv">
            <Link to="/capture_invoice">
              <button className="button1">Capture Invoice </button>
            </Link>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableBody>
              {currentPosts.map((row) => (
                <TableRow
                  component={Link}
                  to={`/invoice_details/${row._id}`}
                  onClick={() => handleRowOnClick(row._id)}
                  key={row.name}
                  style={{ textDecoration: "none" }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id}
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
            <Typography>Page: {currentpage}</Typography>
            <div className="numbering">
              <Pagination
                count={Math.ceil(post.length / postPerPage)}
                page={currentpage}
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
