/* eslint-disable prettier/prettier */
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
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

import "./Main.css";

import {
  fetchSpecificPO_SOW,
  sortProducts,
  paginationFetchPosow,
  searchPoSow,
} from "../../store/CMS/POSOW-actions";
import { fetchPO_SOW_data } from "../../store/CMS/POSOW-actions";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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

export const Main = () => {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.CMS_state.poSowData);
  const totalCount = useSelector((state) => state.CMS_state.totalCount);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(5);
  const [filename, setFilename] = React.useState("Id");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    // dispatch(fetchPO_SOW_data("Id"));
    // dispatch(fetchPO_SOW_data);
    dispatch(paginationFetchPosow(filename, currentPage, postPerPage));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRowOnClick = (row_id) => {
    dispatch(fetchSpecificPO_SOW(row_id));
  };
  const handleSort = (sortBy) => {
    setFilename(sortBy);
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(paginationFetchPosow(filename, currentPage, postPerPage));
  }, [filename]);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    dispatch(paginationFetchPosow(filename, value, postPerPage));
  };
  const handlerowsPerpage = (event) => {
    setPostPerPage(event.target.value);
    dispatch(paginationFetchPosow(filename, currentPage, event.target.value));
  };
  const searchHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(searchPoSow(event.target.value));
    }
  };
  return (
    <>
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            id="outlined-basic"
            onKeyPress={searchHandler}
            label="search"
            variant="outlined"
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
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
              data-test="StyledMenu"
            >
              <MenuItem
                onClick={() => handleSort("_id")}
                disableRipple
                className="menu-by-id"
              >
                By ID
              </MenuItem>

              <MenuItem
                onClick={() => handleSort("Project_Name")}
                disableRipple
              >
                By Project Name
              </MenuItem>

              <MenuItem
                onClick={() => handleSort("Client_Sponser")}
                disableRipple
              >
                By Client Sponsor
              </MenuItem>
              <MenuItem onClick={() => handleSort("Client_Name")} disableRipple>
                By Client Name
              </MenuItem>
            </StyledMenu>
          </div>
        </Grid>
      </Grid>
      <div className="container">
        <div className="innerheader">
          <div>
            <h3 data-test="MainHeading">PO/SOW's Information</h3>
          </div>
          <div className="buttondiv">
            <Link to="/posow/create" style={{ textDecoration: "none" }}>
              <Button
                className="button1"
                data-test="Capture-po-sow"
                variant="contained"
                color="success"
              >
                Capture PO/SOW{" "}
              </Button>
            </Link>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="Table-row-po-sow"
            data-test="row-click-1"
          >
            <TableHead className="tablehead" data-test="row-click0">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>PO/SOW Number</TableCell>
                <TableCell>PO/SOW Amount</TableCell>
                <TableCell>Client Sponsor</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-row-posow" data-test="row-click1">
              {post.map((row, index) => (
                <TableRow
                  component={Link}
                  to={`/posow/detail/${row._id}`}
                  onClick={() => handleRowOnClick(row._id)}
                  key={row.name}
                  style={{ textDecoration: "none" }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  data-test="row-click2"
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="table-cell"
                    data-test="row-click3"
                  >
                    {postPerPage * (currentPage - 1) + (index + 1)}
                  </TableCell>
                  <TableCell>{row.Client_Name}</TableCell>
                  <TableCell>{row.Project_Name}</TableCell>
                  <TableCell>{row.PO_Number}</TableCell>
                  <TableCell>{row.PO_Amount}</TableCell>
                  <TableCell>{row.Client_Sponser}</TableCell>
                  {/* {row.Status === "Rejected" || row.Status === "Drafted" ? (
                    <TableCell
                      component={Link}
                      to={`/posow/edit/${row._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button className="editbtn">EDIT</Button>
                    </TableCell>
                  ) : (
                    <TableCell aria-disabled>
                      <Button className="editbtn" disabled>
                        EDIT
                      </Button>
                    </TableCell>
                  )} */}
                  {row.Status === "Rejected" || row.Status === "Drafted" ? (
                    <TableCell>
                      <EditIcon />
                    </TableCell>
                  ) : (
                    <TableCell>
                      <EditOffIcon />
                    </TableCell>
                  )}

                  <TableCell>
                    <strong>{row.Status}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={10}>
          <div className="Pagination">
            <Typography>Page: {currentPage}</Typography>
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
};
