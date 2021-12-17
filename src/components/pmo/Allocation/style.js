import styled from "styled-components";

export const MiniHead = styled.h3`
  margin: 0.3rem 0rem;
  @media (max-width: 450px) {
    margin: 1rem;
  }
`;

export const MainComponent = styled.div`
  padding: 5px 15px;
  min-width: 345px; //we need to remove this line
  min-height: 90vh;
  & h2 {
    margin: 0;
  }
  & select {
    width: 40%;
  }
`;
export const HeadingStyle = styled.div`
  p {
    text-align: right;
  }
`;
export const Heading = styled.div`
  height: 46px;
  margin: 5px 0px;
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
  .MuiTableBody-root > .MuiTableRow-root:hover {
    background-color: #f8f8f8;
  }
  border-top: 0.1rem solid rgb(227, 231, 231);
  .MuiTableContainer-root {
    height: calc(100vh - 264px);
  }

  .MuiTableHead-root {
    background-color: #c6d4d4;
    font-weight: 900;
    position: sticky;
    top: 0%;
    z-index: 2;
  }
  th {
    font-weight: 600;
  }

  tbody {
    tr:nth-child(2n) {
      background: #f8f8f8;
    }
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
  border: 2px solid blue;
  outline: none;
  &:hover {
    border: 2px Solid orange;
  }
`;
export const Options = styled.option`
  color: black;
`;
export const PageNation = styled.div``;
