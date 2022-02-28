import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { getAllocatedData } from "../../../store/pmo-actions";
import Tpagination from "../../UI/Pagination";
import NoDataFound from "../NoDataFound";
import { DateContainerStyled } from "./style";
import {
  StyledTableCell,
  StyledTableCell2,
  MiniHeadingTypography,
} from "../../../assets/GlobalStyle/style";

export let filterData;

const Allocated = ({ pressed, allocatedSortedValue }) => {
  const { allocatedData } = useSelector((state) => state.pmo);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    empId: "",
    projectAllocated: "",
    allocationPercentage: "",
    employeeName: "",
    allocationStartDate: "",
    allocationEndDate: "",
  });
  useEffect(() => {
    dispatch(getAllocatedData(filters, 1, allocatedSortedValue)); // eslint-disable-next-line
  }, [allocatedSortedValue]);

  let data = allocatedData;
  filterData = (event) => {
    if (event === "check") {
      setFilters({
        ...filters,
        employeeName: "",
      });
      dispatch(
        getAllocatedData(
          {
            ...filters,
            employeeName: "",
          },
          1,
          allocatedSortedValue
        )
      );
    } else {
      if (event.target.name === "empId") {
        setFilters({
          ...filters,
          [event.target.name]: event.target.value.toUpperCase(),
        });
      } else {
        setFilters({ ...filters, [event.target.name]: event.target.value });
      }
    }

    if (event.key === "Enter") {
      dispatch(getAllocatedData(filters, 1, allocatedSortedValue));
    }
  };

  const changePage = (event, value) => {
    dispatch(getAllocatedData(filters, value, allocatedSortedValue));
  };
  return (
    <div className="ListContainer">
      <MiniHeadingTypography data-test="main-heading">
        Allocation Information
      </MiniHeadingTypography>
      <TableContainer>
        <Table data-test="list-table">
          <TableHead>
            <TableRow className="table-header">
              <StyledTableCell
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                SNO
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                EmpID
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Associate Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Allocated Project
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 120, maxWidth: 120 }}
                align="center"
              >
                Percentage Allocated
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Start Date
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                End Date
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pressed && (
              <TableRow>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                ></StyledTableCell2>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Emp Id"
                    name="empId"
                    onChange={filterData}
                    onKeyPress={filterData}
                    value={filters.empId}
                    inputProps={{ style: { fontSize: "small" } }}
                  />
                </StyledTableCell2>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Associate Name"
                    name="employeeName"
                    onChange={filterData}
                    onKeyPress={filterData}
                    value={filters.employeeName}
                    inputProps={{ style: { fontSize: "small" } }}
                  />
                </StyledTableCell2>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Project Allocated"
                    name="projectAllocated"
                    onChange={filterData}
                    onKeyPress={filterData}
                    value={filters.projectAllocated}
                    inputProps={{ style: { fontSize: "small" } }}
                  />
                </StyledTableCell2>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  <TextField
                    variant="standard"
                    type="Number"
                    placeholder="Percentage Allocated"
                    name="allocationPercentage"
                    onChange={filterData}
                    onKeyPress={filterData}
                    value={filters.allocationPercentage}
                    inputProps={{
                      style: { fontSize: "small" },
                      min: 0,
                    }}
                  />
                </StyledTableCell2>

                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  <DateContainerStyled
                    sColor={!filters.allocationStartDate ? "#a2a2a2" : "black"}
                  >
                    <TextField
                      variant="standard"
                      type="date"
                      name="allocationStartDate"
                      onChange={filterData}
                      onKeyPress={filterData}
                      format="yyyy-mm-dd"
                      value={filters.allocationStartDate}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </DateContainerStyled>
                </StyledTableCell2>

                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  <DateContainerStyled
                    eColor={!filters.allocationEndDate ? "#a2a2a2" : "black"}
                  >
                    <TextField
                      variant="standard"
                      type="date"
                      data-date-format="YYYY MM DD"
                      inputProps={{ style: { fontSize: "small" } }}
                      name="allocationEndDate"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.allocationEndDate}
                    />
                  </DateContainerStyled>
                </StyledTableCell2>
              </TableRow>
            )}

            {data.results
              ? data.results.map((currElem, index) => (
                  <TableRow key={index}>
                    <StyledTableCell2 align="center">
                      {index + parseInt(data.currentPage) * 10 - 9}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {currElem.empId ? currElem.empId.empId : "----"}
                    </StyledTableCell2>
                    <StyledTableCell2
                      align="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {currElem.empId ? currElem.empId.empName : "----"}
                    </StyledTableCell2>
                    <StyledTableCell2
                      align="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {currElem.projectId
                        ? currElem.projectId.projectName
                        : "----"}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {currElem.allocationPercentage}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {currElem.allocationStartDate}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {currElem.allocationEndDate}
                    </StyledTableCell2>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        <NoDataFound
          name={
            data.results
              ? !data.results.length
                ? "No Allocation Found !!!"
                : ""
              : "No Allocation Yet !!!"
          }
          filter={pressed}
        />
      </TableContainer>
      <div className="pagination">
        <Stack spacing={2}>
          <Tpagination
            count={data.pageCount || 1}
            changePage={changePage}
            visi={data.results ? (!data.results.length ? "hidden" : "") : ""}
          />
        </Stack>
      </div>
    </div>
  );
};
export default Allocated;
