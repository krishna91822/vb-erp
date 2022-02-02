import React, { useState } from "react";
import "./rewardTableStyle.css";
import { Button, FormControl, InputLabel, Select } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import RewardRowData from "./RewardRowData";
import Header from "./SearchComponent";
import { filterData } from "../../store/rewards-actions";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import { useDispatch } from "react-redux";
import "../../assets/GlobalStyle/TableStyles.css";

import {
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  Card,
  CardContent,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";
export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Body = (props) => {
  const dispatch = useDispatch();

  const currencies = [
    {
      value: "Default",
      label: "Default",
    },
    {
      value: "Stopped",
      label: "Stopped",
    },
    {
      value: "In Progress",
      label: "In Progress",
    },

    {
      value: "Created",
      label: "Created",
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [currency, setCurrency] = useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
    const filterValue = event.target.value;
    dispatch(filterData(filterValue));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <Header />
                </Box>
              </Grid>
              <Grid
                item
                xs={8}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Box m={1}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="sortBy">Sort By</InputLabel>
                    <Select
                      label="Status"
                      onChange={handleChange}
                      defaultValue="Default"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box m={1}>
                  <Link className="remove-underline" to="/rewards/create">
                    <Button
                      style={{ backgroundColor: "chocolate" }}
                      variant="contained"
                    >
                      Create a Reward
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <div className="ListContainer">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <StyledTableCell align="center">Reward Name</StyledTableCell>
                <StyledTableCell align="center">Reward Type</StyledTableCell>
                <StyledTableCell align="center">Issuer</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rewardData.map((data) => {
                return <RewardRowData data={data} StyledMenu={StyledMenu} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Body;
