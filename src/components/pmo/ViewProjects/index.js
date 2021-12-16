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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import Tpagination from "../../UI/Pagination";
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
  Dropdown,
  Options,
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

    if (SortingValue === "Sort by Project ID") {
      dispatch(getAllProjectsBySroting(filterProjects, "vbProjectId"));
    }
    if (SortingValue === "Sort by Status") {
      dispatch(getAllProjectsBySroting(filterProjects, "vbProjectStatus"));
    }
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
                // size="small"
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
              <Dropdown onChange={entryValue} data-test="sortby-dropdown">
                <Options Value="Sort by" hidden>
                  Sort by
                </Options>
                <Options value="Sort by Project ID">Sort by Project ID</Options>
                <Options value="Sort by Status">Sort by Status</Options>
              </Dropdown>

              <Dropdown
                onChange={FilterProjects}
                style={{ width: "120px" }}
                data-test="sortby-dropdown"
              >
                <Options Value="Filter Projects" hidden>
                  {filterProjects}
                </Options>
                <Options value="active" selected>
                  Active
                </Options>
                <Options value="done">Past</Options>
              </Dropdown>
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
            {projects.results
              ? !projects.results.length && (
                  <p
                    style={{
                      textAlign: "center",
                      color: "grey",
                      margin: "15px",
                    }}
                  >
                    No Project Found!!!
                  </p>
                )
              : ""}
          </TableContainer>
        </Container>
        <Tpagination count={projects.pageCount} changePage={changePage} />
      </MainComponent>
    </>
  );
};
export default ViewProjects;
