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

import BenchModal from "./BenchModal";
import { getOnBench } from "../../../store/pmo-actions";
import Tpagination from "../../UI/Pagination";
import NoDataFound from "../NoDataFound";
import {
  StyledTableCell2,
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
    if (event === "check") {
      setFilters({
        ...filters,
        employeeName: "",
      });
      dispatch(
        getOnBench(
          {
            ...filters,
            employeeName: "",
          },
          1,
          benchSortValue
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
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                SNO
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                EmpID
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Associate Name
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Primary Capabilities
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Skill Set
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Designation
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                YOE
              </StyledTableCell2>
              <StyledTableCell2
                sx={{ minWidth: 100, maxWidth: 100 }}
                align="center"
              >
                Remaining Bandwidth
              </StyledTableCell2>
            </TableRow>
          </TableHead>
          <TableBody>
            {pressed && (
              <TableRow className="table-row">
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
                    onChange={filterBenchData}
                    onKeyPress={filterBenchData}
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
                    onChange={filterBenchData}
                    onKeyPress={filterBenchData}
                    value={filters.employeeName}
                    inputProps={{ style: { fontSize: "small" } }}
                  />
                </StyledTableCell2>

                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                ></StyledTableCell2>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                ></StyledTableCell2>
                <StyledTableCell2
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                ></StyledTableCell2>
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
                    type="number"
                    placeholder="Bandwidth"
                    name="remainingAllocation"
                    onChange={filterBenchData}
                    onKeyPress={filterBenchData}
                    value={filters.remainingAllocation}
                    inputProps={{ style: { fontSize: "small" }, min: 0 }}
                  />
                </StyledTableCell2>
              </TableRow>
            )}

            {data.results
              ? data.results.map((currElem, index) => (
                  <TableRow
                    key={index}
                    onClick={() => entryLink(currElem)}
                    className="table-row"
                  >
                    <StyledTableCell2 align="center">
                      {index + parseInt(data.currentPage) * 10 - 9}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {currElem.empId}
                    </StyledTableCell2>
                    <StyledTableCell2
                      align="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {currElem.empName}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {`${currElem.empPrimaryCapability}` || "-----"}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {`${currElem.empSkillSet}` || "-----"}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {`${currElem.empDesignation}` || "-----"}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {`${currElem.yearsOfExperience}` || "-----"}
                    </StyledTableCell2>
                    <StyledTableCell2 align="center">
                      {currElem.remainingAllocation}
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
