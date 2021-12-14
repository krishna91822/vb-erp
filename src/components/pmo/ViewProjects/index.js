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

import { pmoActions } from "../../../store/pmo-slice";
import {
  getAllProjects,
  getAllFilterProjects,
} from "../../../store/pmo-actions";
import {
  MainComponent,
  HeadingStyle,
  Heading,
  Container,
  SideButton,
  Dropdown,
  Options,
  AdminName,
  ProjectHead,
} from "./styles";
import Tpagination from "../../UI/Pagination";
const ViewProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.pmo);
  const [page, setPage] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [filterProjects, setFilterProjects] = useState("active");
  const [filters, setFilters] = useState({
    clientName: "",
    projectName: "",
    vbProjectId: "",
    vbProjectStatus: "",
  });
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(getAllProjects(filterProjects));
  }, [filterProjects]);

  const FilterProjects = (event) => {
    setFilterProjects(event.target.value);
  };

  const entryValue = (event) => {
    const SortingValue = event.target.value;

    if (SortingValue === "Sort by Project ID") {
      const sorteddata = [...projects].sort((a, b) =>
        a.vbProjectId.toLowerCase() > b.vbProjectId.toLowerCase()
          ? 1
          : b.vbProjectId.toLowerCase() > a.vbProjectId.toLowerCase()
          ? -1
          : 0
      );
      dispatch(pmoActions.SortByProductID(sorteddata));
    }

    if (SortingValue === "Sort by Status") {
      const sorteddata = [...projects].sort((a, b) =>
        a.vbProjectStatus === null || b.vbProjectStatus === null
          ? (a.vbProjectStatus === null) - (b.vbProjectStatus === null) ||
            +(a.vbProjectStatus > b.vbProjectStatus) ||
            -(a.vbProjectStatus < b.vbProjectStatus)
          : a.vbProjectStatus.toLowerCase() < b.vbProjectStatus.toLowerCase()
          ? -1
          : b.vbProjectStatus.toLowerCase() < a.vbProjectStatus.toLowerCase()
          ? 1
          : 0
      );
      dispatch(pmoActions.SortByStatus(sorteddata));
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

  return (
    <>
      <MainComponent>
        <HeadingStyle>
          <AdminName data-test="admin-name">User - Admin/Approver</AdminName>
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
                  navigate("/pmo/createproject");
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
                      width: "146px",
                      maxWidth: "146px",
                      minWidth: "146px",
                    }}
                  >
                    Project ID
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "156px",
                      maxWidth: "156px",
                      minWidth: "156px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      width: "136px",
                      maxWidth: "136px",
                      minWidth: "136px",
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
                {projects
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((currElem, index) => (
                    <TableRow key={index} onClick={() => entryLink(currElem)}>
                      <TableCell align="left">
                        {index + page * rowsPerPage + 1}
                      </TableCell>
                      <TableCell align="left">{currElem.clientName}</TableCell>
                      <TableCell align="left">{currElem.projectName}</TableCell>
                      <TableCell align="left">{currElem.vbProjectId}</TableCell>
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Tpagination page={page} setPage={setPage} rows={projects} />
      </MainComponent>
    </>
  );
};

export default ViewProjects;
