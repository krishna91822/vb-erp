import React from "react";
import { TextField, Button } from "@material-ui/core";
import ResourceInformationTable from "../ResourceInformationTable";
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
}) => {
  const { associateName, startDate, endDate, allocation, rackRate } = resource;
  return (
    <Container>
      <ResourceInformationHeading data-test="resource-head">
        Resource Information
      </ResourceInformationHeading>
      {edit && (
        <AllElementsContainer>
          <ResourceForm>
            <Heading>Associate Name</Heading>
            <TextField
              placeholder="Enter Associate Name"
              name="associateName"
              variant="outlined"
              size="small"
              width="100%"
              onChange={handleResourceChange}
              value={associateName}
              data-test="associate-input"
            />
          </ResourceForm>
          <MultiElemContainer>
            <ResourceForm>
              <Heading data-test="start-date">Start Date</Heading>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                name="startDate"
                style={{}}
                onChange={handleResourceChange}
                value={startDate}
                data-test="start-date-input"
              />
            </ResourceForm>
            <ResourceForm>
              <Heading data-test="end-date">End Date</Heading>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                name="endDate"
                style={{ color: "blue" }}
                onChange={handleResourceChange}
                value={endDate}
                data-test="end-date-input"
              />
            </ResourceForm>
          </MultiElemContainer>
          <MultiElemContainer>
            <ResourceForm style={{ justifyContent: "space-between" }}>
              <Heading data-test="allocation">Allocation</Heading>
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
                  style={{ width: "30%" }}
                  onChange={handleResourceChange}
                  value={`${allocation}%`}
                  data-test="allocation-input"
                />
              </AllocElemContainer>
            </ResourceForm>
            <ResourceForm>
              <Heading data-test="rack-rate">Rack Rate</Heading>
              <TextField
                size="small"
                type="number"
                name="rackRate"
                variant="outlined"
                placeholder="Enter Rack Rate"
                onChange={handleResourceChange}
                value={rackRate}
                style={{ marginTop: 3 }}
                data-test="rack-rate-input"
              />
            </ResourceForm>
          </MultiElemContainer>
          <ResourceForm style={{ justifyContent: "end" }}>
            <Button
              onClick={addResource}
              variant="contained"
              color="primary"
              style={{
                margin: "2em",
                width: "30%",
                alignSelf: "center",
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
