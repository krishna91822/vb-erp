import styled from "styled-components";

export const MiniHead = styled.h3`
  margin: 0.3rem 0rem;
`;

export const MainComponent = styled.div`
  min-width: 300px; //we need to remove this line
`;

export const Heading = styled.div`
  height: 46px;
  margin: 5px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 851px) {
    flex-direction: column;
    justify-content: space-around;
    height: 116px;
    h2 {
      padding: 0 30px;
      border-bottom: 1px solid green;
    }
  }
  @media (max-width: 640px) {
    height: 205px;
  }
`;

export const ProjectHead = styled.h2`
  margin: 0;
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
`;

export const SideButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  & > * {
    margin: 0.5em 0 0.5em 0.5em;
  }
  @media (max-width: 640px) {
    height: 160px;
    flex-direction: column-reverse;
    justify-content: space-around;
    width: 100%;
    & > button,
    div {
      width: 230px;
    }
  }
`;

export const DateContainerStyled = styled.div`
  & input[name="allocationStartDate"] {
    color: ${(props) => props.sColor};
  }
  & input[name="allocationEndDate"] {
    color: ${(props) => props.eColor};
  }
`;
