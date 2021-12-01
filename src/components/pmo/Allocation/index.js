import React, { useState } from "react";
import Allocated from "./allocated";
import Bench from "./bench";
import {
  HeadingStyle,
  Heading,
  SideButton,
  Dropdown,
  Options,
  AdminName,
  ProjectHead,
  MainComponent,
} from "./style";

const Allocation = () => {
  const [bench, setBench] = useState(false);
  const ChangeAllocation = (event) => {
    const AllocatedValue = event.target.value;
    if (AllocatedValue === "Sort by on Bench") {
      setBench(true);
    } else {
      setBench(false);
    }
  };

  return (
    <MainComponent>
      <HeadingStyle>
        <AdminName data-test="admin-name">User:- Admin/Approver</AdminName>
        <Heading>
          <ProjectHead data-test="main-heading">Allocations</ProjectHead>
          <SideButton>
            <Dropdown data-test="sortby-dropdown" onChange={ChangeAllocation}>
              <Options Value="Sort by" hidden>
                filter by
              </Options>
              <Options value="Sort by Allocated">Allocated</Options>
              <Options value="Sort by on Bench">On Bench</Options>
            </Dropdown>
          </SideButton>
        </Heading>

        {bench === false ? <Allocated /> : <Bench />}
      </HeadingStyle>
    </MainComponent>
  );
};

export default Allocation;
