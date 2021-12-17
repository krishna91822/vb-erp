import styled from "styled-components";

export const MainComponent = styled.div`
  /* padding: 5px 15px; */
  /* min-width: 477px; //we need to remove this line */
  /* min-height: 85vh; */
`;
export const HeadingStyle = styled.div``;
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
  margin: 0px;
  @media (max-width: 450px) {
    margin: 1rem;
  }
`;
export const Container = styled.div`
  .MuiTableContainer-root {
    height: calc(100vh - 218px);
  }
  .MuiTableHead-root {
    background-color: #c6d4d4;
    font-weight: 900;
    position: sticky;
    top: 0%;
    z-index: 2;
  }

  .MuiTableBody-root > .MuiTableRow-root:hover {
    background-color: #f8f8f8;
    cursor: pointer;
  }

  th {
    font-weight: 600;
  }

  tbody {
    tr:nth-child(2n) {
      background: #f8f8f8;
    }
  }

  a {
    text-decoration: none;
    color: #e8833a;
    border: none;
    cursor: pointer;

    &:hover {
      color: #ff862e;
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
    margin: 0 6px;
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
  transition: 0.2s ease-in;
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
    color: #ff862e;
    background-color: #ececec;
  }
`;

export const PageNation = styled.div``;
