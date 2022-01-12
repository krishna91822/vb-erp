import React, { useState, useEffect } from "react";
import {
  CustomGridBox,
  TitleTypo,
  CustomTextField,
  ContentTypo,
  CustomContainer,
} from "./network.styles";
import { networkText } from "./network.constant";
import {
  MenuItem,
  Box,
  Stack,
  Pagination,
  TextField,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Card,
  CardContent,
  SvgIcon,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import { StyledTypography } from "../../assets/GlobalStyle/style";
import { Search as SearchIcon } from "../../icons/search";
import { ClearRounded as ClearRoundedIcon } from "@mui/icons-material";

import axiosInstance from "./../../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { uiActions } from "./../../store/ui-slice";

import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Network = () => {
  const { toggleLoader } = uiActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paginationInfo, setPaginationInfo] = React.useState({
    page: 1,
    limit: 10,
    totalPage: 0,
  });
  const handlePagination = (event, value) => {
    setPaginationInfo({
      ...paginationInfo,
      page: value,
    });
  };

  const [searchEmp, setSearchEmp] = useState("");
  const [employees, setEmployees] = useState([]);
  const [sort, setSort] = React.useState("empId");

  useEffect(() => {
    dispatch(toggleLoader());
    axiosInstance
      .get(
        `/employees?search=${searchEmp}&sort=${sort}&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
      )
      .then((response) => {
        dispatch(toggleLoader());
        setEmployees(response.data.data);
        response.data.totalResult < paginationInfo.limit &&
        paginationInfo.page === 1
          ? setPaginationInfo({
              ...paginationInfo,
              totalPage: 1,
            })
          : setPaginationInfo({
              ...paginationInfo,
              totalPage: Math.ceil(
                response.data.totalDocuments / paginationInfo.limit
              ),
            });
      })
      .catch((err) => {
        dispatch(toggleLoader());
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchEmp, sort, paginationInfo.page]);
  const { title, sortOption } = networkText;

  const sortHandleChange = (event) => {
    setSort(event.target.value);
  };

  const handleEmployeeClick = (item) => {
    navigate(`../my-profile/${item.empId}`);
  };

  const sortOptions = [...sortOption];

  const searchHandleChange = (event) => {
    setSearchEmp(event.target.value);
  };

  return (
    <Box data-test="network-page-test" sx={{ pt: 1 }}>
      <Box
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <StyledTypography>{networkText.header}</StyledTypography>
        <Box sx={{}}>
          <TextField
            data-test="search-bar-test"
            onChange={searchHandleChange}
            placeholder="Search employee"
            id="outlined-search"
            size="small"
            variant="outlined"
            sx={{ width: "15vw", height: "40px", mr: 1 }}
          />
          <CustomTextField
            data-test="sort-test"
            label="Sort"
            id="outlined-select-currency"
            select
            value={sort}
            onChange={sortHandleChange}
            sx={{ width: "15vw" }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>
      </Box>

      <Divider sx={{ borderBottomWidth: 2 }} />

      <div className="client-list-wrapper">
        <Box m={2} mb={1}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  data-test="Search By Req Name-test"
                  onChange={searchHandleChange}
                  placeholder="Search By Req Name"
                  id="outlined-search"
                  size="small"
                  variant="outlined"
                  sx={{ width: "15vw", height: "40px", mr: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                    //onClick={handelClearSearch}
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <ClearRoundedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <div className="ListContainer">
          <TableContainer>
            <Table sx={{ maxWidth: "100%" }}>
              <TableHead>
                <TableRow className="table-header">
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Emp Id</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Position</StyledTableCell>
                  <StyledTableCell align="center">Location</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.map((item) => (
                  <TableRow
                    key={item.empId}
                    sx={{
                      // mt: 0.5,
                      // mb: 0.5,
                      height: 43,
                      borderBottom: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderRadius: "0",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    <StyledTableCell align="center">
                      {item.empName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.empId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.empEmail}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.empDesignation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.empCurrentAddress
                        ? item.empCurrentAddress.empAddressCity
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.empDepartment}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* pagination */}
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={paginationInfo.totalPage}
              page={paginationInfo.page}
              onChange={handlePagination}
            />
          </Stack>
        </div>
      </div>
    </Box>
  );
};

export default Network;
