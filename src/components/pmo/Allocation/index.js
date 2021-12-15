import React, { useState } from "react";
import Allocated from "./allocated";
import Bench from "./bench";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

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

  const ChangeAllocation = (event) => {
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

  const sortValue = (event) => {
    alert(event.target.value);
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
            <Dropdown data-test="sortby-dropdown" onChange={sortValue}>
              <Options Value="Sort by" hidden>
                Sort by
              </Options>
              <Options value="Sort by ID">Sort by ID</Options>
              <Options value="Sort by name">Sort by name</Options>
            </Dropdown>
            <Dropdown data-test="sortby-dropdown" onChange={ChangeAllocation}>
              <Options value="Sort by Allocated">Allocated</Options>
              <Options value="Sort by on Bench">On Bench</Options>
            </Dropdown>
          </SideButton>
        </Heading>
      </HeadingStyle>
      {bench ? <Bench pressed={pressed} /> : <Allocated pressed={pressed} />}
    </MainComponent>
  );
};

export default Allocation;
