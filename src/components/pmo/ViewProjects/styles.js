import styled from "styled-components";

const size = {
  mobileM: "375px",
  mobileL: "540px",
  tablet: "900px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const MainComponent = styled.div`
  min-width: 300px; //we need to remove this line
`;
export const HeadingStyle = styled.div``;
export const Heading = styled.div`
  height: 46px;
  margin: 5px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
  }
  @media ${device.tablet} {
    flex-direction: column;
    justify-content: space-around;
    height: 116px;
    h2 {
      padding: 0 30px;
      border-bottom: 1px solid green;
    }
  }
  @media (max-width: 800px) {
    flex-direction: row;
    height: 178px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    height: 230px;
  }
`;

export const AdminName = styled.p`
  text-align: right;
  /* @media (max-width: 450px) {
    margin-right: 1rem;
  } */
`;

export const ProjectHead = styled.h2`
  margin: 0px;
  /* @media (max-width: 450px) {
    margin: 1rem;
  } */
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

  /* @media (max-width: 450px) {
    margin: 1rem;
  } */
`;
export const SideButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  select {
    width: 28%;
  }

  & > * {
    margin: 0 6px;
  }

  @media (max-width: 800px) {
    height: 185px;
    flex-direction: column-reverse;
    justify-content: space-around;
    button {
      order: 4;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    & > button,
    div {
      width: 280px;
    }
  }
  /* @media (max-width: 450px) {
    margin-right: 1rem;
  } */
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
