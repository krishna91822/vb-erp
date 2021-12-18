import React, { useState } from "react";

import Allocated from "./allocated";
import Bench from "./bench";

import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
// import FilterListOffIcon from "@mui/icons-material/FilterList";

import {
  HeadingStyle,
  Heading,
  SideButton,
  ProjectHead,
  MainComponent,
} from "./style";

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
    <MainComponent>
      <HeadingStyle>
        <Heading>
          <ProjectHead data-test="main-heading">Allocations</ProjectHead>
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
            {!bench ? (
              <FormControl size="small">
                <InputLabel id="Sort by">Sort by</InputLabel>
                <Select
                  value={sortValue}
                  labelId="Sort by"
                  id="select"
                  data-test="sortby-dropdown"
                  label="Sort by"
                  // color="orange"
                  onChange={handleSortValue}
                  sx={{ fontSize: "14px", width: "150px" }}
                >
                  <MenuItem
                    value="allocationStartDate"
                    sx={{ fontSize: "14px" }}
                  >
                    Start-Date
                  </MenuItem>
                  <MenuItem value="allocationEndDate" sx={{ fontSize: "14px" }}>
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
                    value="remainingAllocation"
                    sx={{ fontSize: "14px" }}
                  >
                    Bandwidth
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            <FormControl size="small">
              <InputLabel id="Sort by">Status</InputLabel>
              <Select
                defaultValue="Sort by Allocated"
                labelId="Sort by"
                data-test="sortby-dropdown"
                label="Sort by"
                // color="orange"
                onChange={ChangeAllocation}
                sx={{ fontSize: "14px", width: "150px" }}
              >
                <MenuItem value="Sort by Allocated" sx={{ fontSize: "14px" }}>
                  Allocated
                </MenuItem>
                <MenuItem value="Sort by on Bench" sx={{ fontSize: "14px" }}>
                  On Bench
                </MenuItem>
              </Select>
            </FormControl>
          </SideButton>
        </Heading>
      </HeadingStyle>
      {bench ? (
        <Bench pressed={pressed} benchSortValue={sortValue} />
      ) : (
        <Allocated pressed={pressed} allocatedSortedValue={sortValue} />
      )}
    </MainComponent>
  );
};

export default Allocation;
