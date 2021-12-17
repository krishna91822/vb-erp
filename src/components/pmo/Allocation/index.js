import React, { useState } from "react";

import Allocated from "./allocated";
import Bench from "./bench";

import FilterListIcon from "@mui/icons-material/FilterList";
// import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterListOffIcon from "@mui/icons-material/FilterList";

import {
  HeadingStyle,
  Heading,
  SideButton,
  Dropdown,
  Options,
  ProjectHead,
  MainComponent,
} from "./style";

const Allocation = () => {
  const [pressed, setPressed] = useState(false);
  const [bench, setBench] = useState(false);
  const [sortValue, setSortValue] = useState("");

  const ChangeAllocation = (event) => {
    setSortValue("");
    const AllocatedValue = event.target.value;
    setPressed(false);
    if (AllocatedValue === "Sort by on Bench") {
      setBench(true);
    } else {
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
              <Dropdown
                data-test="sortby-dropdown"
                value={sortValue}
                onChange={handleSortValue}
              >
                <Options value="Sort by" hidden>
                  Sort by
                </Options>
                <Options value="allocationPercentage">
                  Sort by Percentage
                </Options>
                <Options value="allocationStartDate">
                  Sort by Start-Date
                </Options>
                <Options value="allocationEndDate">Sort by End-Date</Options>
              </Dropdown>
            ) : (
              <Dropdown onChange={handleSortValue} value={sortValue}>
                <Options value="Sort by" hidden>
                  Sort by
                </Options>
                <Options value="empId">Sort by EmpId</Options>
                <Options value="empName">Sort by Emp-Name</Options>
                <Options value="remainingAllocation">
                  Sort by Allocations
                </Options>
              </Dropdown>
            )}
            <Dropdown data-test="sortby-dropdown" onChange={ChangeAllocation}>
              <Options value="Sort by Allocated">Allocated</Options>
              <Options value="Sort by on Bench">On Bench</Options>
            </Dropdown>
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
