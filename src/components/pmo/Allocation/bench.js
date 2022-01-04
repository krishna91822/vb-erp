import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
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
    <>
      <BenchModal
        modalDetails={modalDetails}
        setModalDetails={setModalDetails}
        entryData={entryData}
      />
      <Container>
        <MiniHead data-test="main-heading">
          Bench Capacity{" "}
          <span style={{ color: "grey", fontWeight: "500" }}>{`(${
            data.totalCount || "0"
          })`}</span>
        </MiniHead>
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
                    width: "150px",
                    maxWidth: "150px",
                    minWidth: "150px",
                  }}
                >
                  SNO
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
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
                  Primary Capabilities
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Remaining Bandwidth
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

                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="number"
                      placeholder="Bandwidth"
                      name="remainingAllocation"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.remainingAllocation}
                      inputProps={{ style: { fontSize: "small" }, min: 0 }}
                    />
                  </TableCell>
                </TableRow>
              )}

              {data.results
                ? data.results.map((currElem, index) => (
                    <TableRow
                      key={index}
                      onClick={() => entryLink(currElem)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell align="left">
                        {index + parseInt(data.currentPage) * 10 - 9}
                      </TableCell>
                      <TableCell align="left">{currElem.empId}</TableCell>
                      <TableCell
                        align="left"
                        style={{ textTransform: "capitalize" }}
                      >
                        {currElem.empName}
                      </TableCell>
                      <TableCell align="left">
                        {`${currElem.empPrimaryCapability}` || "-----"}
                      </TableCell>
                      <TableCell align="left">
                        {currElem.remainingAllocation}
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
                  ? "No Data Found !!!"
                  : ""
                : "No Data Yet !!!"
            }
            filter={pressed}
          />
        </TableContainer>
      </Container>
      <Tpagination
        count={data.pageCount}
        changePage={changePage}
        visi={data.results ? (!data.results.length ? "hidden" : "") : ""}
      />
    </>
  );
};

export default Bench;
