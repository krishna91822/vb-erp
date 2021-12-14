import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOnBench } from "../../../store/pmo-actions";
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
import Tpagination from "../../UI/Pagination";
import BenchModal from "./BenchModal";

const Bench = ({ pressed }) => {
  const { benchData } = useSelector((state) => state.pmo);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [modalDetails, setModalDetails] = useState(false);
  const [entryData, setEntryData] = useState({});
  const [filters, setFilters] = useState({
    empId: "",
    employeeName: "",
    remainingAllocation: "",
    vbProjectStatus: "",
  });

  useEffect(() => {
    dispatch(getOnBench(filters));
  }, []);

  let data = benchData;
  data = [...data].sort((a, b) =>
    a.empId > b.empId ? 1 : b.empId > a.empId ? -1 : 0
  );

  const filterData = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    if (event.key === "Enter") {
      dispatch(getOnBench(filters));
    }
  };

  const entryLink = (elem) => {
    setEntryData(elem);
    setModalDetails(true);
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
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  SNO
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  EmpID
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Associate Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Primary Capabilities
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
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

              {data.slice(page * 5, page * 5 + 5).map((currElem, index) => (
                <TableRow
                  key={index}
                  onClick={() => entryLink(currElem)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell align="left">{index + page * 5 + 1}</TableCell>
                  <TableCell align="left">{currElem.empId}</TableCell>
                  <TableCell align="left">{currElem.empName}</TableCell>
                  <TableCell align="left">
                    {`${currElem.empPrimaryCapability}`}
                  </TableCell>
                  <TableCell align="left">
                    {currElem.remainingAllocation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Tpagination page={page} setPage={setPage} rows={data} />
    </>
  );
};

export default Bench;
