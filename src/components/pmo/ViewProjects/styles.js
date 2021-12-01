import styled from "styled-components";

export const MainComponent = styled.div`
  padding: 5px 15px;
`;
export const HeadingStyle = styled.div`
  p {
    text-align: right;
  }
`;
export const Heading = styled.div`
  height: 46px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const AdminName = styled.p`
  text-align: right;
  @media (max-width: 450px) {
    margin-right: 1rem;
  }
`;

export const ProjectHead = styled.h2`
  @media (max-width: 450px) {
    margin: 1rem;
  }
`;
export const Container = styled.div`
  border: 0.1rem solid #afacacde;
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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  & > * {
    margin: 0.5em 0 0.5em 0.5em;
  }
  @media (max-width: 450px) {
    margin-right: 1rem;
  }
`;

export const Dropdown = styled.select`
  padding: 0.3rem;
  border-radius: 0.2rem;
  border: 2px solid blue;
  outline: none;
  &:hover {
    border: 2px Solid #e8833a;
  }
`;
export const Options = styled.option`
  color: black;
`;

export const EditAction = styled.div``;

export const EditButton = styled.button`
  text-decoration: none;
  padding: 0;
  color: #e8833a;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: #db6a19;
    text-decoration: underline;
  }
`;
