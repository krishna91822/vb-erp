import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { Container, MiniHead } from "./style";
import BenchModal from "./BenchModal";
import { getOnBench } from "../../../store/pmo-actions";
import Tpagination from "../../UI/Pagination";
import NoDataFound from "../NoDataFound";
import {
  StyledTableCell,
  MiniHeadingTypography,
} from "../../../assets/GlobalStyle/style";

export let filterBenchData;

const Bench = ({ pressed, benchSortValue }) => {
  const { benchData } = useSelector((state) => state.pmo);
  const dispatch = useDispatch();
  const [modalDetails, setModalDetails] = useState(false);
  const [entryData, setEntryData] = useState({});
  const [filters, setFilters] = useState({
    empId: "",
    employeeName: "",
    remainingAllocation: "",
    vbProjectStatus: "",
  });

  useEffect(() => {
    dispatch(getOnBench(filters, 1, benchSortValue)); // eslint-disable-next-line
  }, [benchSortValue]);

  let data = benchData;

  filterBenchData = (event) => {
    if (event.target.name === "empId") {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value.toUpperCase(),
      });
    } else {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }
    if (event.key === "Enter") {
      dispatch(getOnBench(filters, 1, benchSortValue));
    }
  };

  const entryLink = (elem) => {
    setEntryData(elem);
    setModalDetails(true);
  };

  const changePage = (event, value) => {
    dispatch(getOnBench(filters, value, benchSortValue));
  };

  return (
    <div className="ListContainer">
      <BenchModal
        modalDetails={modalDetails}
        setModalDetails={setModalDetails}
        entryData={entryData}
      />
      <MiniHeadingTypography data-test="main-heading">
        Bench Capacity{" "}
        <span style={{ color: "grey", fontWeight: "500" }}>{`(${
          data.totalCount || "0"
        })`}</span>
      </MiniHeadingTypography>
      <TableContainer>
        <Table data-test="list-table">
          <TableHead>
            <TableRow className="table-header">
              <StyledTableCell align="center">SNO</StyledTableCell>
              <StyledTableCell align="center">EmpID</StyledTableCell>
              <StyledTableCell align="center">Associate Name</StyledTableCell>
              <StyledTableCell align="center">
                Primary Capabilities
              </StyledTableCell>
              <StyledTableCell align="center">Skill Set</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">YOE</StyledTableCell>
              <StyledTableCell align="center">
                Remaining Bandwidth
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pressed && (
              <TableRow className="table-row">
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Emp Id"
                    name="empId"
                    onChange={filterBenchData}
                    onKeyPress={filterBenchData}
                    value={filters.empId}
                    inputProps={{ style: { fontSize: "small" } }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Associate Name"
                    name="employeeName"
                    onChange={filterBenchData}
                    onKeyPress={filterBenchData}
                    value={filters.employeeName}
                    inputProps={{ style: { fontSize: "small" } }}
                  />
                </StyledTableCell>

                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    variant="standard"
                    type="number"
                    placeholder="Bandwidth"
                    name="remainingAllocation"
                    onChange={filterBenchData}
                    onKeyPress={filterBenchData}
                    value={filters.remainingAllocation}
                    inputProps={{ style: { fontSize: "small" }, min: 0 }}
                  />
                </StyledTableCell>
              </TableRow>
            )}

            {data.results
              ? data.results.map((currElem, index) => (
                  <TableRow
                    key={index}
                    onClick={() => entryLink(currElem)}
                    className="table-row"
                  >
                    <StyledTableCell align="center">
                      {index + parseInt(data.currentPage) * 10 - 9}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {currElem.empId}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {currElem.empName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${currElem.empPrimaryCapability}` || "-----"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${currElem.empSkillSet}` || "-----"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${currElem.empDesignation}` || "-----"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${currElem.yearsOfExperience}` || "-----"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {currElem.remainingAllocation}
                    </StyledTableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        <NoDataFound
          name={
            data.results
              ? !data.results.length
                ? "No Data Found !!!"
                : ""
              : "No Data Yet !!!"
          }
          filter={pressed}
        />
      </TableContainer>
      <div className="pagination">
        <Stack spacing={2}>
          <Tpagination
            count={data.pageCount}
            changePage={changePage}
            visi={data.results ? (!data.results.length ? "hidden" : "") : ""}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Bench;
