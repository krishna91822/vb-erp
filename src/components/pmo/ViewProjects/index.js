import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, withRouter, useRouteMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { pmoActions } from "../../../store/pmo-slice";
import { getAllProjects } from "../../../store/pmo-actions";
import {
  MainComponent,
  Container,
  SideButton,
  CreateprojectLink,
  EditAction,
  Dropdown,
  Options,
  CreateProjectButton,
  AdminName,
  ProjectHead,
  EditButton,
} from "./styles";
import Tpagination from "../../UI/Pagination";

const ViewProjects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { projects } = useSelector((state) => state.pmo);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const entryValue = (event) => {
    const SortingValue = event.target.value;
    if (SortingValue === "Sort by ID") {
      const sorteddata = [...projects].sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );

      dispatch(pmoActions.SortById(sorteddata));
    }

    if (SortingValue === "Sort by Project ID") {
      const sorteddata = [...projects]
        .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
        .sort((a, b) =>
          a.vbProjectId.toLowerCase() > b.vbProjectId.toLowerCase()
            ? 1
            : b.vbProjectId.toLowerCase() > a.vbProjectId.toLowerCase()
            ? -1
            : 0
        );

      dispatch(pmoActions.SortByProductID(sorteddata));
    }

    if (SortingValue === "Sort by Status") {
      const sorteddata = [...projects]
        .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
        .sort((a, b) =>
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
    history.push(`${path}/${currElem.vbProjectId}`);
  };

  const stopClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <MainComponent>
        <AdminName data-test="admin-name">User:- Admin/Approver</AdminName>
        <br />
        <SideButton>
          <CreateprojectLink>
            <Link to="/pmo/createproject">
              <CreateProjectButton data-test="create-project-button">
                Create a project
              </CreateProjectButton>
            </Link>
          </CreateprojectLink>
          <Dropdown onChange={entryValue} data-test="sortby-dropdown">
            <Options Value="Sort by" hidden>
              Sort by
            </Options>
            <Options value="Sort by ID">Sort by ID</Options>
            <Options value="Sort by Project ID">Sort by Project ID</Options>
            <Options value="Sort by Status">Sort by Status</Options>
          </Dropdown>
        </SideButton>
        <ProjectHead data-test="main-heading">Projects</ProjectHead>
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
                {projects.slice(page * 5, page * 5 + 5).map((currElem) => (
                  <TableRow
                    key={currElem.id}
                    onClick={() => entryLink(currElem)}
                  >
                    <TableCell align="left">{currElem.id}</TableCell>
                    <TableCell align="left">{currElem.clientName}</TableCell>
                    <TableCell align="left">{currElem.projectName}</TableCell>
                    <TableCell align="left">{currElem.vbProjectId}</TableCell>
                    <TableCell align="left">
                      {currElem.vbProjectStatus || "----"}
                    </TableCell>
                    <TableCell align="left">
                      <EditAction data-test="edit-profile-button">
                        <Link
                          to={`${path}/${currElem.vbProjectId}/edit`}
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

export default withRouter(ViewProjects);
