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
  const [associateName, setAssociateName] = useState("");
  // const [primaryCapabilities, setPrimaryCapabilities] = useState("");
  const [remainingBandwidth, setRemainingBandwidth] = useState("");
  const [page, setPage] = useState(0);
  const [empId, setEmpId] = useState("");
  const [modalDetails, setModalDetails] = useState(false);
  const [entryData, setEntryData] = useState({});

  useEffect(() => {
    dispatch(getOnBench());
  }, []);

  let data = benchData;
  data = [...data].sort((a, b) =>
    a.empId > b.empId ? 1 : b.empId > a.empId ? -1 : 0
  );
  console.log(benchData, "bench");

  const filterAssociateName = (event) => {
    const assName = event.target.value.toLowerCase();
    setAssociateName(assName);
  };

  // const filterPrimaryCapabilities = (event) => {
  //   const primcapabilty = event.target.value.toLowerCase();
  //   setPrimaryCapabilities(primcapabilty);
  // };

  const filterRemainingBandwidth = (event) => {
    setRemainingBandwidth(event.target.value);
  };

  const filterEmpId = (event) => {
    const empAll = event.target.value.toUpperCase();
    setEmpId(empAll);
  };

  const filteredData = data.filter((eachData) => {
    return (
      eachData.employeeName.toLowerCase().includes(associateName) &&
      // eachData.primaryCapabilities
      //   .toLowerCase()
      //   .includes(primaryCapabilities) &&
      eachData.remainingAllocation.toString().includes(remainingBandwidth) &&
      eachData.empId.toUpperCase().includes(empId)
    );
  });

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
                {/* <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    maxWidth: "180px",
                    minWidth: "180px",
                  }}
                >
                  Primary Capabilities
                </TableCell> */}
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
                      onChange={filterEmpId}
                      value={empId}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Associate Name"
                      onChange={filterAssociateName}
                      value={associateName}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>

                  {/* <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Primary Capabilities"
                      onChange={filterPrimaryCapabilities}
                      value={primaryCapabilities}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell> */}
                  <TableCell align="left">
                    <TextField
                      variant="standard"
                      type="number"
                      placeholder="Bandwidth"
                      onChange={filterRemainingBandwidth}
                      value={remainingBandwidth}
                      inputProps={{ style: { fontSize: "small" } }}
                    />
                  </TableCell>
                </TableRow>
              )}

              {filteredData
                .slice(page * 5, page * 5 + 5)
                .map((currElem, index) => (
                  <TableRow
                    key={currElem.id}
                    onClick={() => entryLink(currElem)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell align="left">{index + page * 5 + 1}</TableCell>
                    <TableCell align="left">{currElem.empId}</TableCell>
                    <TableCell align="left">{currElem.employeeName}</TableCell>
                    {/* <TableCell align="left">
                      {currElem.primaryCapabilities}
                    </TableCell> */}
                    <TableCell align="left">
                      {currElem.remainingAllocation}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Tpagination page={page} setPage={setPage} rows={filteredData} />
    </>
  );
};

export default Bench;
