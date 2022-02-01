import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  Stack,
  Card,
  CardContent,
  SvgIcon,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Search as SearchIcon } from "../../../icons/search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoDataFound from "../NoDataFound";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import Tpagination from "../../UI/Pagination";
import {
  StyledTableCell,
  StyledTableCell2,
} from "../../../assets/GlobalStyle/style";
import {
  getAllProjects,
  getAllFilterProjects,
  getAllProjectsBySroting,
} from "../../../store/pmo-actions";
import { SideButton } from "./styles";
import { StyledTypography } from "../../../assets/GlobalStyle/style";

const ViewProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.pmo);
  const user = useSelector((state) => state.user.user);
  const [pressed, setPressed] = useState(false);
  const [filterProjects, setFilterProjects] = useState("active");
  const [filters, setFilters] = useState({
    clientName: "",
    projectName: "",
    vbProjectId: "",
    vbProjectStatus: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getAllProjects(filterProjects, 1));
    // eslint-disable-next-line
  }, [filterProjects]);

  const FilterProjects = (event) => {
    setFilterProjects(event.target.value);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const changePage = (event, value) => {
    dispatch(getAllProjects(filterProjects, value));
  };
  return (
    <div className="list-wrapper">
      <StyledTypography data-test="main-heading">Projects</StyledTypography>
      <Card>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  placeholder="Search by Project Name"
                  name="projectName"
                  onChange={filterData}
                  onKeyPress={filterData}
                  value={filters.projectName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                xs={8}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <SideButton>
                  <Box m={1}>
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
                  </Box>
                  <Box m={1}>
                    {user.permissions.includes("create_project_in_PMO") && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "chocolate",
                          ":hover": {
                            background: "chocolate",
                          },
                        }}
                        onClick={() => {
                          navigate("/pmo/projects/create");
                        }}
                      >
                        Create a project
                      </Button>
                    )}
                  </Box>
                  <Box m={1}>
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
                  </Box>
                  <Box m={1}>
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
                  </Box>
                </SideButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <div className="ListContainer">
        <TableContainer>
          <Table data-test="list-table">
            <TableHead>
              <TableRow className="table-header">
                <StyledTableCell
                  sx={{ minWidth: 50, maxWidth: 50 }}
                  align="center"
                >
                  SNO
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  Client Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  Project Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  Project ID
                </StyledTableCell>
                <StyledTableCell
                  sx={{ minWidth: 100, maxWidth: 100 }}
                  align="center"
                >
                  Status
                </StyledTableCell>
                {user.permissions.includes("update_project_in_PMO") && (
                  <StyledTableCell
                    sx={{ minWidth: 100, maxWidth: 100 }}
                    align="center"
                  >
                    Actions
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {pressed && (
                <TableRow>
                  <StyledTableCell2
                    sx={{ minWidth: 50, maxWidth: 50 }}
                    align="center"
                  ></StyledTableCell2>
                  <StyledTableCell2
                    sx={{ minWidth: 100, maxWidth: 100 }}
                    align="center"
                  >
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
                  </StyledTableCell2>
                  <StyledTableCell2
                    sx={{ minWidth: 100, maxWidth: 100 }}
                    align="center"
                  >
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
                  </StyledTableCell2>
                  <StyledTableCell2
                    sx={{ minWidth: 100, maxWidth: 100 }}
                    align="center"
                  >
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
                  </StyledTableCell2>
                  <StyledTableCell2
                    sx={{ minWidth: 100, maxWidth: 100 }}
                    align="center"
                  >
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
                  </StyledTableCell2>
                  {user.permissions.includes("update_project_in_PMO") && (
                    <StyledTableCell2
                      sx={{ minWidth: 100, maxWidth: 100 }}
                      align="center"
                    ></StyledTableCell2>
                  )}
                </TableRow>
              )}
              {projects.results
                ? projects.results.map((currElem, index) => (
                    <TableRow key={index} className="table-row">
                      <StyledTableCell2
                        align="center"
                        onClick={() => entryLink(currElem)}
                      >
                        {index + parseInt(projects.currentPage) * 10 - 9}
                      </StyledTableCell2>
                      <StyledTableCell2
                        align="center"
                        onClick={() => entryLink(currElem)}
                      >
                        {currElem.clientName}
                      </StyledTableCell2>
                      <StyledTableCell2
                        align="center"
                        onClick={() => entryLink(currElem)}
                        style={{ textTransform: "capitalize" }}
                      >
                        {currElem.projectName}
                      </StyledTableCell2>
                      <StyledTableCell2
                        align="center"
                        onClick={() => entryLink(currElem)}
                      >
                        {currElem.vbProjectId}
                      </StyledTableCell2>
                      <StyledTableCell2
                        align="center"
                        onClick={() => entryLink(currElem)}
                      >
                        {currElem.vbProjectStatus || "----"}
                      </StyledTableCell2>
                      {user.permissions.includes("update_project_in_PMO") && (
                        <StyledTableCell2 align="center">
                          <>
                            <IconButton
                              aria-label="actions"
                              id="actions-button"
                              aria-controls="actions"
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}
                              sx={{ height: "22px" }}
                              disableRipple
                            >
                              <MoreVertIcon />
                            </IconButton>

                            <Menu
                              id="actions"
                              MenuListProps={{
                                "aria-labelledby": "actions-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  width: "16ch",
                                  boxShadow:
                                    "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 5px 5px -10px, rgba(0, 0, 0, 0.10) 0px 4px 6px -2px",
                                },
                              }}
                            >
                              <Link
                                to={`/pmo/projects/${currElem.vbProjectId}/edit`}
                                onClick={stopClick}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <MenuItem>
                                  <ListItemText>Edit</ListItemText>
                                </MenuItem>
                              </Link>
                            </Menu>
                          </>
                        </StyledTableCell2>
                      )}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>

          <NoDataFound
            name={
              projects.results
                ? !projects.results.length
                  ? "No Project Yet !!!"
                  : ""
                : "No Project Yet !!!"
            }
            filter={pressed}
          />
        </TableContainer>
        <div className="pagination">
          <Stack spacing={2}>
            <Tpagination
              count={projects.pageCount}
              changePage={changePage}
              visi={
                projects.results
                  ? !projects.results.length
                    ? "hidden"
                    : ""
                  : ""
              }
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};
export default ViewProjects;
