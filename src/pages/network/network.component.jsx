import React, { useState, useEffect } from "react";
import { Container, Box, MenuItem, Pagination } from "@mui/material";
import {
  CustomGridBox,
  TitleTypo,
  CustomTextField,
  ContentTypo,
  CustomContainer,
} from "./network.styles";
import { networkText } from "./network.constant";
import { TextField } from "@mui/material";

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
        <TitleTypo
          sx={{
            fontSize: "1.5em",
            textTransform: "capitalize",
            mb: 1,
            mr: 2,
          }}
        >
          My Colleagues
        </TitleTypo>
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
      <CustomContainer
        sx={{
          // height: "80vh",
          // width: "100%",
          // minHeight: "calc(100vh - 50px)",
          // width: "calc(100% - 48px)",
          outline: "0.1em solid",
          outlineColor: grey[500],
          borderRadius: "5px",
          // pb: 3,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <CustomGridBox
            data-test="networkTableHead"
            sx={{
              height: 60,
              // mb: 1,
              backgroundColor: "textColor.light",
              border: "none",
              borderRadius: "5px 5px 0 0",
            }}
          >
            {
              //title of the network table
              title.map((item, i) => (
                <TitleTypo key={i}>{item}</TitleTypo>
              ))
            }
          </CustomGridBox>
          {employees.map((item) => (
            <CustomGridBox
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
              <ContentTypo>{item.empName}</ContentTypo>
              <ContentTypo>{item.empId}</ContentTypo>
              <ContentTypo>{item.empEmail}</ContentTypo>
              <ContentTypo>{item.empDesignation}</ContentTypo>
              <ContentTypo>
                {item.empCurrentAddress
                  ? item.empCurrentAddress.empAddressCity
                  : ""}
              </ContentTypo>
              <ContentTypo>{item.empDepartment}</ContentTypo>
            </CustomGridBox>
          ))}
        </Box>
      </CustomContainer>
      {/* pagination */}
      <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
        <Pagination
          data-test="pagination-test"
          count={paginationInfo.totalPage}
          page={paginationInfo.page}
          onChange={handlePagination}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Network;
