import React, { useState, useEffect } from "react";
import { CustomTextField } from "./network.styles";
import { networkText } from "./network.constant";
import {
  MenuItem,
  Box,
  Stack,
  Pagination,
  TextField,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Card,
  CardContent,
  SvgIcon,
  InputAdornment,
  Grid,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableCell2,
} from "../../assets/GlobalStyle/style";
import { StyledTypography } from "../../assets/GlobalStyle/style";
import { Search as SearchIcon } from "../../icons/search";
import {
  MoreVert as MoreVertIcon,
  ClearRounded as ClearRoundedIcon,
} from "@mui/icons-material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import BlockIcon from "@mui/icons-material/Block";

import axiosInstance from "./../../helpers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./../../store/ui-slice";

import { useNavigate } from "react-router-dom";

const Network = () => {
  const { user } = useSelector((state) => state.user);
  const { toggleLoader } = uiActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paginationInfo, setPaginationInfo] = React.useState({
    page: 1,
    limit: 10,
    totalPage: 0,
  });
  const handlePagination = (event, value) => {
    setPaginationInfo({
      ...paginationInfo,
      page: value,
    });
  };

  const [searchEmp, setSearchEmp] = useState("");
  const [employees, setEmployees] = useState([]);
  const [sort, setSort] = React.useState("active");
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    dispatch(toggleLoader());
    axiosInstance
      .get(
        `/employees?search=${searchEmp}&sort=empId&status=${sort}&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
      )
      .then((response) => {
        dispatch(toggleLoader());
        setEmployees(response.data.data);
        setPaginationInfo({
          ...paginationInfo,
          totalPage: Math.ceil(response.data.totalCount / paginationInfo.limit),
        });
      })
      .catch((err) => {
        dispatch(toggleLoader());
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchEmp, sort, paginationInfo.page, loader]);
  // eslint-disable-next-line no-unused-vars
  const { employeeStatus } = networkText;

  const sortHandleChange = (event) => {
    setSort(event.target.value);
  };

  const handleEmployeeClick = (item) => {
    navigate(`../my-profile/${item.empId}`);
  };

  const sortOptions = [...employeeStatus];

  const searchHandleChange = (event) => {
    const searchFields = event.target.value;
    setSearchTerm(searchFields);
    if (event.key === "Enter") {
      setSearchEmp(searchFields);
      setPaginationInfo({
        ...paginationInfo,
        page: 1,
      });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [empStatus, setEmpStatus] = useState({ status: "", id: "" });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelMenu = (status, id) => {
    setEmpStatus({ status: status, id: id });
  };

  //handle employee active and inactive status
  const handleEmpStatus = () => {
    dispatch(toggleLoader());
    axiosInstance
      .patch(
        `/employees/${empStatus.id}`,
        empStatus.status === "active"
          ? { status: "inactive" }
          : { status: "active" }
      )
      .then((response) => {
        console.log(response.data);
        setLoader((prev) => prev + 1);
        dispatch(toggleLoader());
      })
      .catch((err) => {
        console.log(err);
        dispatch(toggleLoader());
      });
  };

  const menuIcon = () => {
    return (
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
          <MenuItem
            onClick={() => {
              handleClose();
              handleEmpStatus();
            }}
            disableRipple
          >
            <ListItemIcon>
              {empStatus.status === "active" ? (
                <BlockIcon color="error" />
              ) : (
                <DoneOutlineIcon color="warning" />
              )}
            </ListItemIcon>
            <ListItemText>
              {empStatus.status === "active" ? "Deactivate" : "Activate"}
            </ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handelClearSearch = () => {
    setSearchEmp("");
    setSearchTerm("");
    setPaginationInfo({
      ...paginationInfo,
      page: 1,
    });
  };

  return (
    <div className="list-wrapper">
      <StyledTypography>{networkText.header}</StyledTypography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                value={searchTerm}
                data-test="search-bar-test"
                onChange={searchHandleChange}
                onKeyPress={searchHandleChange}
                placeholder="Search employee"
                id="outlined-search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={handelClearSearch}>
                        <ClearRoundedIcon />
                      </IconButton>
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
              {user.permissions.includes("create_employee_dashboard") && (
                <Box>
                  <CustomTextField
                    data-test="sort-test"
                    id="outlined-select-currency"
                    select
                    value={sort}
                    onChange={sortHandleChange}
                    sx={{ width: "15vw" }}
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="ListContainer">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <StyledTableCell align="center">SNo</StyledTableCell>
                <StyledTableCell align="center">Emp Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Position</StyledTableCell>
                <StyledTableCell align="center">Location</StyledTableCell>
                <StyledTableCell align="center">Department</StyledTableCell>
                {user.permissions.includes("create_employee_dashboard") && (
                  <StyledTableCell align="center">Actions</StyledTableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((item, index) => (
                <TableRow key={item.empId} className="table-row">
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {index + parseInt(paginationInfo.page) * 10 - 9}
                  </StyledTableCell2>
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {item.empId}
                  </StyledTableCell2>
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {item.empName}
                  </StyledTableCell2>
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {item.empEmail}
                  </StyledTableCell2>
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {item.empDesignation}
                  </StyledTableCell2>
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {item.empCurrentAddress
                      ? item.empCurrentAddress.empAddressCity
                      : ""}
                  </StyledTableCell2>
                  <StyledTableCell2
                    align="center"
                    onClick={(e) => handleEmployeeClick(item)}
                  >
                    {item.empDepartment}
                  </StyledTableCell2>
                  {user.permissions.includes("create_employee_dashboard") && (
                    <StyledTableCell2
                      onClick={() => handelMenu(item.status, item._id)}
                      align="center"
                    >
                      {menuIcon()}
                    </StyledTableCell2>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* pagination */}
      <div className="pagination">
        <Stack spacing={2}>
          {paginationInfo.totalPage > 1 && (
            <Pagination
              count={paginationInfo.totalPage}
              page={paginationInfo.page}
              onChange={handlePagination}
            />
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Network;
