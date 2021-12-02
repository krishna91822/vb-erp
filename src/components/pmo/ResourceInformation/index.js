import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ResourceInformationTable from "../ResourceInformationTable";
import Autocomplete from "@mui/material/Autocomplete";
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
}) => {
  const { associateName, startDate, endDate, allocation, rackRate } = resource;
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    const inputvalue = event.target.value;
    if (inputvalue) {
      if (inputvalue.length > 2) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
  ];

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
              id="free-solo-demo"
              freeSolo
              onInputChange={handleOpen}
              onChange={(event, value) => {
                value ? handelAssociate(value.label) : setOpen(false);
              }}
              options={top100Films}
              open={open}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="associate name"
                  // onChange={handleResourceChange}
                  value={associateName}
                />
              )}
            />
          </ResourceForm>
          <MultiElemContainer>
            <ResourceForm>
              <Heading data-test="start-date">
                Start Date <span>*</span>
              </Heading>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                name="startDate"
                error={resourceErrors.startDate ? true : false}
                helperText={resourceErrors.startDate}
                style={{}}
                onChange={handleResourceChange}
                value={startDate}
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
                name="endDate"
                error={resourceErrors.endDate ? true : false}
                helperText={resourceErrors.endDate}
                style={{ color: "blue" }}
                onChange={handleResourceChange}
                value={endDate}
                data-test="end-date-input"
              />
            </ResourceForm>
          </MultiElemContainer>
          <MultiElemContainer>
            <ResourceForm style={{ justifyContent: "space-between" }}>
              <Heading data-test="allocation">
                Allocation <span>*</span>
              </Heading>
              <AllocElemContainer>
                <input
                  type="range"
                  min="1"
                  max="100"
                  name="allocation"
                  value={allocation}
                  onChange={handleResourceChange}
                  style={{ width: "60%" }}
                />
                <TextField
                  disabled
                  placeholder="50%"
                  variant="outlined"
                  size="small"
                  error={resourceErrors.allocation ? true : false}
                  helperText={resourceErrors.allocation}
                  style={{ width: "30%" }}
                  onChange={handleResourceChange}
                  value={`${allocation}%`}
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
                helperText={resourceErrors.rackRate}
                onChange={handleResourceChange}
                value={rackRate}
                style={{ marginTop: 3 }}
                data-test="rack-rate-input"
              />
            </ResourceForm>
          </MultiElemContainer>
          <ResourceForm style={{ justifyContent: "start" }}>
            <Button
              onClick={addResource}
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
