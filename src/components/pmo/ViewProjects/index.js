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
import FilterListIcon from "@mui/icons-material/FilterList";

import { pmoActions } from "../../../store/pmo-slice";
import { getAllProjects } from "../../../store/pmo-actions";
import {
  MainComponent,
  HeadingStyle,
  Heading,
  Container,
  SideButton,
  EditAction,
  Dropdown,
  Options,
  AdminName,
  ProjectHead,
  EditButton,
} from "./styles";
import Tpagination from "../../UI/Pagination";

const ViewProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.pmo);
  const [page, setPage] = useState(0);
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [vbProjectId, setVbProjectId] = useState("");
  const [vbProjectStatus, setVbProjectStatus] = useState("");
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

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

  const filterClientName = (event) => {
    const cName = event.target.value.toLowerCase();
    setClientName(cName);
  };

  const filterProjectId = (event) => {
    const pId = event.target.value.toLowerCase();
    setVbProjectId(pId);
  };

  const filterProjectName = (event) => {
    const pName = event.target.value.toLowerCase();
    setProjectName(pName);
  };

  const filterStatus = (event) => {
    const pStatus = event.target.value.toLowerCase();
    setVbProjectStatus(pStatus);
  };

  const filteredData = projects.filter((eachData) => {
    return (
      eachData.clientName.toLowerCase().includes(clientName) &&
      eachData.projectName.toLowerCase().includes(projectName) &&
      eachData.vbProjectId.toLowerCase().includes(vbProjectId) &&
      eachData.vbProjectStatus.toLowerCase().includes(vbProjectStatus)
    );
  });
  const showfilter = () => {
    setPressed(!pressed);
  };
  return (
    <>
      <MainComponent>
        <HeadingStyle>
          <AdminName data-test="admin-name">User - Admin/Approver</AdminName>
          <Heading>
            <ProjectHead data-test="main-heading">Projects</ProjectHead>
            <SideButton>
              <FilterListIcon
                onClick={showfilter}
                style={{ cursor: "pointer" }}
              />
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "#e8833a",
                  textTransform: "none",
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
            </SideButton>
          </Heading>
        </HeadingStyle>
        <Container>
          <TableContainer>
            <Table data-test="list-table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">SNO</TableCell>
                  <TableCell align="left">Client Name</TableCell>
                  <TableCell align="left">Project Name</TableCell>
                  <TableCell align="left">Project ID</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
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
                        onChange={filterClientName}
                        value={clientName}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        variant="standard"
                        type="text"
                        placeholder="Associate Name"
                        onChange={filterProjectName}
                        value={projectName}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        variant="standard"
                        type="text"
                        placeholder="Project Allocated"
                        onChange={filterProjectId}
                        value={vbProjectId}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        variant="standard"
                        type="text"
                        placeholder="Project Allocated"
                        onChange={filterStatus}
                        value={vbProjectStatus}
                        inputProps={{ style: { fontSize: "small" } }}
                      />
                    </TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                )}
                {filteredData
                  .slice(page * 5, page * 5 + 5)
                  .map((currElem, index) => (
                    <TableRow
                      key={currElem.vbProjectId}
                      onClick={() => entryLink(currElem)}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{currElem.clientName}</TableCell>
                      <TableCell align="left">{currElem.projectName}</TableCell>
                      <TableCell align="left">{currElem.vbProjectId}</TableCell>
                      <TableCell align="left">
                        {currElem.vbProjectStatus || "----"}
                      </TableCell>
                      <TableCell align="left">
                        <EditAction data-test="edit-profile-button">
                          <Link
                            to={`/pmo/projects//${currElem.vbProjectId}/edit`}
                            onClick={stopClick}
                          >
                            <EditButton data-test="edit-profile-button">
                              edit <i className="fas fa-edit"></i>
                            </EditButton>
                          </Link>
                        </EditAction>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Tpagination page={page} setPage={setPage} rows={projects} />
        </Container>
      </MainComponent>
    </>
  );
};

export default ViewProjects;
