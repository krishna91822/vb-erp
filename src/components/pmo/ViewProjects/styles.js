import styled from "styled-components";

export const MainComponent = styled.div``;

export const AdminName = styled.p`
  margin: 0.2rem 3rem;
  /* float: right; */
  text-align: right;
  @media (max-width: 450px) {
    margin-right: 1rem;
  }
`;

export const ProjectHead = styled.h2`
  margin: 0.3rem 3rem;
  @media (max-width: 450px) {
    margin: 1rem;
  }
`;
export const Container = styled.div`
  margin: 0 3rem;
  border: 0.1rem solid rgb(227, 231, 231);
  padding: 0.3rem;
  height: auto;
  width: auto;

  .MuiTableHead-root {
    background-color: rgb(227, 231, 231);
    font-weight: 900;
  }

  .MuiTableBody-root {
    background-color: rgb(252, 250, 250);
  }

  .MuiTableBody-root > .MuiTableRow-root:hover {
    background-color: rgb(227, 231, 231);
    cursor: pointer;
  }

  @media (max-width: 450px) {
    margin: 1rem;
  }
`;
export const SideButton = styled.div`
  display: flex;
  float: right;
  margin-right: 3rem;
  @media (max-width: 450px) {
    margin-right: 1rem;
  }
`;
export const CreateprojectLink = styled.div``;
export const CreateProjectButton = styled.button`
  text-decoration: none;
  color: white;
  margin-top: 0.3rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: orange;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: red;
  }
`;
export const Dropdown = styled.select`
  padding: 0.3rem;
  border-radius: 0.2rem;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
  border: 2px solid blue;
  outline: none;
  &:hover {
    border: 2px Solid orange;
  }
`;
export const Options = styled.option`
  color: black;
`;

export const EditAction = styled.div``;

export const EditButton = styled.button`
  text-decoration: none;
  padding: 0;
  color: orange;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: red;
    text-decoration: underline;
  }
`;
