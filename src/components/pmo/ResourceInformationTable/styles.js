import styled from "styled-components";

export const Container = styled.div`
  .MuiTableHead-root {
    background-color: #c6d4d4;
    font-weight: 900;
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

  //   @media (max-width: 450px) {
  //     margin: 1rem;
  //   }
  //
`;
