import React, { useState } from "react";

import Allocated from "./allocated";
import Bench from "./bench";
import { filterData } from "./allocated";
import { filterBenchData } from "./bench";

import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Box,
  Grid,
  SvgIcon,
  TextField,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { Search as SearchIcon } from "../../../icons/search";

import { SideButton } from "./style";
import { StyledTypography } from "../../../assets/GlobalStyle/style";

const Allocation = () => {
  const [pressed, setPressed] = useState(false);
  const [bench, setBench] = useState(false);
  const [sortValue, setSortValue] = useState("allocationStartDate");

  const ChangeAllocation = (event) => {
    const AllocatedValue = event.target.value;
    setPressed(false);
    if (AllocatedValue === "Sort by on Bench") {
      setSortValue("empId");
      setBench(true);
    } else {
      setSortValue("allocationStartDate");
      setBench(false);
    }
  };

  const showfilter = () => {
    setPressed(!pressed);
  };

  const handleSortValue = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <div className="list-wrapper">
      <StyledTypography data-test="main-heading">Allocations</StyledTypography>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {!bench ? (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    placeholder="Search by Associate name"
                    name="employeeName"
                    onChange={filterData}
                    onKeyPress={(event) => filterData(event)}
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
                ) : (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    placeholder="Search by Associate name"
                    name="employeeName"
                    onChange={filterBenchData}
                    onKeyPress={(event) => filterBenchData(event)}
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
                )}
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
                    {!bench ? (
                      <FormControl size="small">
                        <InputLabel id="Sort by">Sort by</InputLabel>
                        <Select
                          value={sortValue}
                          labelId="Sort by"
                          id="select"
                          data-test="sortby-dropdown"
                          label="Sort by"
                          onChange={handleSortValue}
                          sx={{ fontSize: "14px", width: "150px" }}
                        >
                          <MenuItem
                            value="allocationStartDate"
                            sx={{ fontSize: "14px" }}
                          >
                            Start-Date
                          </MenuItem>
                          <MenuItem
                            value="allocationEndDate"
                            sx={{ fontSize: "14px" }}
                          >
                            End-Date
                          </MenuItem>
                          <MenuItem
                            value="allocationPercentage"
                            sx={{ fontSize: "14px" }}
                          >
                            Percentage
                          </MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <FormControl size="small">
                        <InputLabel id="Sort">Sort by</InputLabel>
                        <Select
                          value={sortValue}
                          data-test="sortby-dropdown"
                          label="Sort by"
                          id="select"
                          onChange={handleSortValue}
                          sx={{ fontSize: "14px", width: "150px" }}
                        >
                          <MenuItem value="empId" sx={{ fontSize: "14px" }}>
                            EmpId
                          </MenuItem>
                          <MenuItem value="empName" sx={{ fontSize: "14px" }}>
                            EmpName
                          </MenuItem>
                          <MenuItem
                            value="yearsOfExperience"
                            sx={{ fontSize: "14px" }}
                          >
                            Years Of Experience
                          </MenuItem>
                          <MenuItem
                            value="remainingAllocation"
                            sx={{ fontSize: "14px" }}
                          >
                            Bandwidth
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                  <Box m={1}>
                    <FormControl size="small">
                      <InputLabel id="Sort by">Status</InputLabel>
                      <Select
                        defaultValue="Sort by Allocated"
                        labelId="Sort by"
                        data-test="sortby-dropdown"
                        label="Sort by"
                        onChange={ChangeAllocation}
                        sx={{ fontSize: "14px", width: "150px" }}
                      >
                        <MenuItem
                          value="Sort by Allocated"
                          sx={{ fontSize: "14px" }}
                        >
                          Allocated
                        </MenuItem>
                        <MenuItem
                          value="Sort by on Bench"
                          sx={{ fontSize: "14px" }}
                        >
                          On Bench
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
      {bench ? (
        <Bench pressed={pressed} benchSortValue={sortValue} />
      ) : (
        <Allocated pressed={pressed} allocatedSortedValue={sortValue} />
      )}
    </div>
  );
};

export default Allocation;
