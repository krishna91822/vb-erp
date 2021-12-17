import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOnBench } from "../../../store/pmo-actions";
import Tpagination from "../../UI/Pagination";

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
    setFilters({ ...filters, [event.target.name]: event.target.value });
    if (event.key === "Enter") {
      dispatch(getOnBench(filters, 1, benchSortValue));
    }
  };

  const entryLink = (elem) => {
    setEntryData(elem);
    setModalDetails(true);
  };

  const changePage = (event) => {
    dispatch(getOnBench(filters, event.target.textContent, benchSortValue));
  };

  return (
    <>
      <BenchModal
        modalDetails={modalDetails}
        setModalDetails={setModalDetails}
        entryData={entryData}
      />
      <Container>
        <MiniHead data-test="main-heading">Bench Capacity</MiniHead>
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
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
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

                  <TableCell align="left">
                    {/* <TextField
                      variant="standard"
                      type="text"
                      placeholder="Primary Capabilities"
                      onChange={filterPrimaryCapabilities}
                      value={primaryCapabilities}
                      inputProps={{ style: { fontSize: "small" } }}
                    /> */}
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="number"
                      placeholder="Bandwidth"
                      name="remainingAllocation"
                      onChange={filterData}
                      onKeyPress={filterData}
                      value={filters.remainingAllocation}
                      inputProps={{ style: { fontSize: "small" } }}
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
                      <TableCell align="left">{index + 1}</TableCell>
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
          {data.results
            ? !data.results.length && (
                <p
                  style={{ textAlign: "center", color: "grey", margin: "15px" }}
                >
                  No Data Found!!!
                </p>
              )
            : ""}
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
