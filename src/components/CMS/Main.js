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
import {
  Grid,
  Card,
  CardContent,
  Box,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import LongMenu from "./ClonePO";
import TextField from "@mui/material/TextField";

import "./Main.css";

import {
  fetchSpecificPO_SOW,
  sortProducts,
  paginationFetchPosow,
  searchPoSow,
} from "../../store/CMS/POSOW-actions";
import { fetchPO_SOW_data } from "../../store/CMS/POSOW-actions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import { StyledTypography } from "../../assets/GlobalStyle/style";

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
  const [postPerPage, setPostPerPage] = React.useState(10);
  const [filename, setFilename] = React.useState("Id");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    dispatch(
      paginationFetchPosow(filename, currentPage, postPerPage, searchKeyword)
    );
  }, []);
  const user = useSelector((state) => state.user.user);
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
    dispatch(
      paginationFetchPosow(filename, currentPage, postPerPage, searchKeyword)
    );
  }, [filename]);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    dispatch(paginationFetchPosow(filename, value, postPerPage, searchKeyword));
  };
  const handlerowsPerpage = (event) => {
    setPostPerPage(event.target.value);
    dispatch(
      paginationFetchPosow(
        filename,
        currentPage,
        event.target.value,
        searchKeyword
      )
    );
  };
  const SearchTextHandler = (event) => {
    setSearchKeyword(event.target.value);
  };
  const searchHandler = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      dispatch(paginationFetchPosow(filename, 1, 10, searchKeyword));
    }
  };
  return (
    <div className="list-wrapper">
      <StyledTypography>PO/SOW's Information</StyledTypography>
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
                  {user.permissions.includes("upload_PO/SOW/contract") && (
                    <div className="buttondiv">
                      <Link
                        to="/posow/create"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          className="posow-SaveButton"
                          data-test="Capture-po-sow"
                          variant="contained"
                          style={{
                            backgroundColor: "chocolate",
                            color: "#FFFFFF",
                          }}
                        >
                          Capture PO/SOW{" "}
                        </Button>
                      </Link>
                    </div>
                  )}
                </Box>
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
                    data-test="StyledMenu"
                  >
                    {/* <MenuItem
                      onClick={() => handleSort("_id")}
                      disableRipple
                      className="menu-by-id"
                    >
                      By ID
                    </MenuItem> */}

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
          <Table data-test="row-click-1">
            <TableHead data-test="row-click0">
              <TableRow className="table-header">
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Client Name</StyledTableCell>
                <StyledTableCell align="center">Project Name</StyledTableCell>
                <StyledTableCell align="center">PO/SOW Number</StyledTableCell>
                <StyledTableCell align="center">PO/SOW Amount</StyledTableCell>
                <StyledTableCell align="center">Client Sponsor</StyledTableCell>
                <StyledTableCell align="center">Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-row-posow" data-test="row-click1">
              {post.map((row, index) => (
                <TableRow
                  style={{ textDecoration: "none" }}
                  key={row.name}
                  className="table-row"
                  data-test="row-click2"
                >
                  <StyledTableCell align="center" data-test="row-click3">
                    {postPerPage * (currentPage - 1) + (index + 1)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Client_Name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Project_Name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.PO_Number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.PO_Amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Client_Sponser}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <LongMenu posowID={row._id} />
                  </StyledTableCell>

                  {/* might be required in future versions */}
                  {/* {user.permissions.includes("upload_PO/SOW/contract") && (
                    <>
                      {row.Status === "Drafted" ? (
                        <StyledTableCell align="center">
                          <EditIcon />
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="center">
                          <EditOffIcon />
                        </StyledTableCell>
                      )}
                    </>
                  )}

                  <StyledTableCell align="center">
                    <strong>{row.Status}</strong>
                  </StyledTableCell> */}
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
};
