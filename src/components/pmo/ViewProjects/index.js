import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import Tpagination from "../../UI/Pagination";
import NoDataFound from "../NoDataFound";
import {
  getAllProjects,
  getAllFilterProjects,
  getAllProjectsBySroting,
} from "../../../store/pmo-actions";
import {
  MainComponent,
  HeadingStyle,
  Heading,
  Container,
  SideButton,
  ProjectHead,
} from "./styles";

const ViewProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.pmo);
  const [pressed, setPressed] = useState(false);
  const [filterProjects, setFilterProjects] = useState("active");
  const [filters, setFilters] = useState({
    clientName: "",
    projectName: "",
    vbProjectId: "",
    vbProjectStatus: "",
  });

  useEffect(() => {
    dispatch(getAllProjects(filterProjects, 1));
    // eslint-disable-next-line
  }, [filterProjects]);

  const FilterProjects = (event) => {
    setFilterProjects(event.target.value);
  };

  const entryValue = (event) => {
    const SortingValue = event.target.value;
    dispatch(getAllProjectsBySroting(filterProjects, SortingValue));
  };

  const entryLink = (currElem) => {
    navigate(`/pmo/projects/${currElem.vbProjectId}`);
  };

  const stopClick = (e) => {
    e.stopPropagation();
  };

  const showfilter = () => {
    setPressed(!pressed);
  };

  const filterData = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    if (event.key === "Enter") {
      dispatch(getAllFilterProjects(filterProjects, filters));
    }
  };

  const changePage = (event) => {
    dispatch(getAllProjects(filterProjects, event.target.textContent));
  };
  return (
    <>
      <MainComponent>
        <HeadingStyle>
          <Heading>
            <ProjectHead data-test="main-heading">Projects</ProjectHead>
            <SideButton>
              {!pressed ? (
                <FilterListIcon
                  onClick={showfilter}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FilterListOffIcon
                  onClick={showfilter}
                  style={{ cursor: "pointer" }}
                />
              )}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e8833a",
                  textTransform: "none",
                  ":hover": {
                    bgcolor: "#ff862e",
                  },
                }}
                onClick={() => {
                  navigate("/pmo/projects/create");
                }}
              >
                Create a project
              </Button>
              <FormControl size="small">
                <InputLabel id="filterBy">Sort By</InputLabel>
                <Select
                  defaultValue="vbProjectId"
                  labelId="filterBy"
                  id="select"
                  label="filterBy"
                  onChange={entryValue}
                  sx={{ fontSize: "14px", width: "150px" }}
                >
                  <MenuItem value="vbProjectId" sx={{ fontSize: "14px" }}>
                    Project ID
                  </MenuItem>
                  <MenuItem value="clientName" sx={{ fontSize: "14px" }}>
                    Client Name
                  </MenuItem>
                  <MenuItem value="projectName" sx={{ fontSize: "14px" }}>
                    Project Name
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel id="filterBy">Status</InputLabel>
                <Select
                  defaultValue="active"
                  labelId="filterBy"
                  id="select"
                  data-test="sortby-dropdown"
                  label="filterBy"
                  // color="orange"
                  onChange={FilterProjects}
                  sx={{ fontSize: "14px", width: "150px" }}
                >
                  <MenuItem value="active" sx={{ fontSize: "14px" }}>
                    Active
                  </MenuItem>
                  <MenuItem value="done" sx={{ fontSize: "14px" }}>
                    Completed
                  </MenuItem>
                  <MenuItem value="others" sx={{ fontSize: "14px" }}>
                    Others
                  </MenuItem>
                </Select>
              </FormControl>
            </SideButton>
          </Heading>
        </HeadingStyle>
        <Container>
          <TableContainer
            sx={{
              border: "0.1em solid #afacacde",
              borderRadius: "5px",
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
                      width: "216px",
                      maxWidth: "216px",
                      minWidth: "216px",
                    }}
                  >
                    Client Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "210px",
                      maxWidth: "210px",
                      minWidth: "210px",
                    }}
                  >
                    Project Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "156px",
                      maxWidth: "156px",
                      minWidth: "156px",
                    }}
                  >
                    Project ID
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "146px",
                      maxWidth: "146px",
                      minWidth: "146px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "146px",
                      maxWidth: "146px",
                      minWidth: "146px",
                    }}
                  >
                    Actions
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
                        placeholder="Client Name"
                        name="clientName"
                        onChange={filterData}
                        onKeyPress={filterData}
                        value={filters.clientName}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        variant="standard"
                        type="text"
                        placeholder="Project Name"
                        name="projectName"
                        onChange={filterData}
                        onKeyPress={filterData}
                        value={filters.projectName}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        variant="standard"
                        type="text"
                        placeholder="Project Id"
                        name="vbProjectId"
                        onChange={filterData}
                        onKeyPress={filterData}
                        value={filters.vbProjectId}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      {filterProjects === "others" && (
                        <TextField
                          variant="standard"
                          type="text"
                          placeholder="Project Status"
                          name="vbProjectStatus"
                          onChange={filterData}
                          onKeyPress={filterData}
                          value={filters.vbProjectStatus}
                          inputProps={{ style: { fontSize: "small" } }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                )}
                {projects.results
                  ? projects.results.map((currElem, index) => (
                      <TableRow key={index} onClick={() => entryLink(currElem)}>
                        <TableCell align="left">
                          {index + parseInt(projects.currentPage) * 10 - 9}
                        </TableCell>
                        <TableCell align="left">
                          {currElem.clientName}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ textTransform: "capitalize" }}
                        >
                          {currElem.projectName}
                        </TableCell>
                        <TableCell align="left">
                          {currElem.vbProjectId}
                        </TableCell>
                        <TableCell align="left">
                          {currElem.vbProjectStatus || "----"}
                        </TableCell>
                        <TableCell align="left">
                          <Link
                            to={`/pmo/projects/${currElem.vbProjectId}/edit`}
                            onClick={stopClick}
                          >
                            <Button
                              variant="fab"
                              color="purple"
                              size="small"
                              endIcon={<EditIcon />}
                              sx={{ padding: "0" }}
                            >
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
            <NoDataFound
              name={
                projects.results
                  ? !projects.results.length
                    ? "No Project Found !!!"
                    : ""
                  : "No Project Yet !!!"
              }
              filter={pressed}
            />
          </TableContainer>
        </Container>
        <Tpagination
          count={projects.pageCount}
          changePage={changePage}
          visi={
            projects.results ? (!projects.results.length ? "hidden" : "") : ""
          }
        />
      </MainComponent>
    </>
  );
};
export default ViewProjects;
