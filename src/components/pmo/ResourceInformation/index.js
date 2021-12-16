import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ResourceInformationTable from "../ResourceInformationTable";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";

import { getAllEmployees } from "../../../store/pmo-actions";
import {
  Heading,
  Container,
  ResourceInformationHeading,
  AllElementsContainer,
  ResourceForm,
  MultiElemContainer,
  AllocElemContainer,
} from "./styles";

const ResourceInformation = ({
  edit,
  resource,
  resources,
  handleResourceChange,
  addResource,
  removeResource,
  resourceErrors,
  handelAssociate,
  allEmployees,
  percentageAllocated,
}) => {
  const {
    empName,
    allocationStartDate,
    allocationEndDate,
    allocationPercentage,
    rackRate,
  } = resource;

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tempEmpName, setTempEmpName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event, value) => {
    setFocused(true);
    if (event) {
      setTempEmpName(event.target.value);
      setOpen(false);
      if (event.target.value && event.target.value.length > 2) {
        setOpen(true);
        dispatch(getAllEmployees(event.target.value));
      }
    }
  };

  const handleOnClick = (event, value) => {
    if (value) {
      handelAssociate(value);
      setOpen(false);
      setTempEmpName("");
      setFocused(false);
    }
    setTempEmpName("");
  };

  const resourcesIds = resources.map((eachRes) => eachRes.empId);
  const filteredEmployees = allEmployees
    ? allEmployees.filter((eachEmp) => !resourcesIds.includes(eachEmp._id))
    : [];

  return (
    <Container>
      <ResourceInformationHeading data-test="resource-head">
        Resource Information
      </ResourceInformationHeading>
      {edit && (
        <AllElementsContainer>
          <ResourceForm>
            <Heading>
              Associate Name <span>*</span>
            </Heading>
            <Autocomplete
              size="small"
              onBlur={() => {
                setTempEmpName("");
                setOpen(false);
                setFocused(false);
              }}
              onInputChange={handleInputChange}
              getOptionLabel={(option) => option.empName}
              onChange={handleOnClick}
              options={filteredEmployees}
              open={open}
              style={{ width: "100%" }}
              inputValue={focused ? tempEmpName : empName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="associate name"
                  error={resourceErrors.empName ? true : false}
                />
              )}
            />
          </ResourceForm>
          <MultiElemContainer
            sColor={!allocationStartDate ? "#a2a2a2" : "black"}
            eColor={!allocationEndDate ? "#a2a2a2" : "black"}
          >
            <ResourceForm>
              <Heading data-test="start-date">
                Start Date <span>*</span>
              </Heading>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                name="allocationStartDate"
                error={resourceErrors.allocationStartDate ? true : false}
                onChange={handleResourceChange}
                value={allocationStartDate}
                data-test="start-date-input"
              />
            </ResourceForm>
            <ResourceForm>
              <Heading data-test="end-date">
                End Date <span>*</span>
              </Heading>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                name="allocationEndDate"
                error={resourceErrors.allocationEndDate ? true : false}
                style={{ color: "blue" }}
                onChange={handleResourceChange}
                value={allocationEndDate}
                data-test="end-date-input"
              />
            </ResourceForm>
          </MultiElemContainer>
          <MultiElemContainer>
            <ResourceForm style={{ justifyContent: "space-between" }}>
              <Heading data-test="allocation">
                Allocation <span>*</span>
              </Heading>
              <AllocElemContainer
                aColor={allocationPercentage > 0 ? "black" : "#a2a2a2"}
              >
                <input
                  type="range"
                  min="0"
                  max={100 - percentageAllocated}
                  name="allocationPercentage"
                  value={allocationPercentage}
                  onChange={handleResourceChange}
                  style={{ width: "60%" }}
                />
                <TextField
                  name="allocationPercentagetxt"
                  readonly
                  placeholder="50%"
                  variant="outlined"
                  size="small"
                  error={resourceErrors.allocationPercentage ? true : false}
                  style={{ width: "30%" }}
                  onChange={handleResourceChange}
                  value={`${allocationPercentage}%`}
                  data-test="allocation-input"
                />
              </AllocElemContainer>
            </ResourceForm>
            <ResourceForm>
              <Heading data-test="rack-rate">
                Rack Rate <span>*</span>
              </Heading>
              <TextField
                size="small"
                type="number"
                name="rackRate"
                variant="outlined"
                placeholder="Enter Rack Rate"
                error={resourceErrors.rackRate ? true : false}
                onChange={handleResourceChange}
                value={rackRate}
                style={{ marginTop: 3 }}
                data-test="rack-rate-input"
              />
            </ResourceForm>
          </MultiElemContainer>
          <ResourceForm style={{ justifyContent: "start" }}>
            <Button
              onClick={() => {
                // setTempVal(tempVal + 1);
                addResource();
              }}
              variant="contained"
              color="primary"
              style={{
                margin: "3.5em 0em 0em",
                width: "30%",
                alignSelf: "flex-end",
              }}
            >
              Add
            </Button>
          </ResourceForm>
        </AllElementsContainer>
      )}
      <ResourceInformationTable
        edit={edit}
        resources={resources}
        removeResource={removeResource}
      />
    </Container>
  );
};

export default ResourceInformation;
