import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { getAllocatedData } from "../../../store/pmo-actions";
import Tpagination from "../../UI/Pagination";
import NoDataFound from "../NoDataFound";
import { Container, MiniHead, DateContainerStyled } from "./style";

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
  const filterData = (event) => {
    if (event.target.name === "empId") {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value.toUpperCase(),
      });
    } else {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }
    if (event.key === "Enter") {
      dispatch(getAllocatedData(filters, 1, allocatedSortedValue));
    }
  };

  const changePage = (event, value) => {
    dispatch(getAllocatedData(filters, value, allocatedSortedValue));
  };
  return (
    <>
      <Container>
        <MiniHead data-test="main-heading">Allocation Information</MiniHead>
        <TableContainer
          sx={{
            border: "0.1em solid #afacacde",
            borderRadius: "6px",
          }}
        >
          <Table data-test="list-table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "100px",
                    minWidth: "100px",
                  }}
                >
                  SNO
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "140px",
                    maxWidth: "140px",
                    minWidth: "140px",
                  }}
                >
                  EmpID
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Associate Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Allocated Project
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Percentage Allocated
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  End Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pressed && (
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
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
                  </TableCell>
                  <TableCell align="left">
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
                  </TableCell>
                  <TableCell align="left">
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
                  </TableCell>
                  <TableCell align="left">
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
                  </TableCell>

                  <TableCell align="left">
                    <DateContainerStyled
                      sColor={
                        !filters.allocationStartDate ? "#a2a2a2" : "black"
                      }
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
                  </TableCell>

                  <TableCell align="left">
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
                  </TableCell>
                </TableRow>
              )}

              {data.results
                ? data.results.map((currElem, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        {index + parseInt(data.currentPage) * 10 - 9}
                      </TableCell>
                      <TableCell align="left">{currElem.empId.empId}</TableCell>
                      <TableCell
                        align="left"
                        style={{ textTransform: "capitalize" }}
                      >
                        {currElem.empId.empName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ textTransform: "capitalize" }}
                      >
                        {currElem.projectId.projectName}
                      </TableCell>
                      <TableCell align="left">
                        {currElem.allocationPercentage}
                      </TableCell>
                      <TableCell align="left">
                        {currElem.allocationStartDate}
                      </TableCell>
                      <TableCell align="left">
                        {currElem.allocationEndDate}
                      </TableCell>
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
      </Container>
      <Tpagination
        count={data.pageCount || 1}
        changePage={changePage}
        visi={data.results ? (!data.results.length ? "hidden" : "") : ""}
      />
    </>
  );
};
export default Allocated;
