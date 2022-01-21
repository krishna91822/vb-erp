import styled from "styled-components";

export const Container = styled.div`
  .MuiTableHead-root {
    background-color: #c6d4d4;
    font-weight: 900;
  }

  .MuiTableBody-root > .MuiTableRow-root:hover {
    background-color: #f8f8f8;
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
