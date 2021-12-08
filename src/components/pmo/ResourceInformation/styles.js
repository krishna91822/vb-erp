import styled from "styled-components";

const size = {
  mobileM: "375px",
  mobileL: "540px",
  tablet: "851px",
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

export const ResourceInformationHeading = styled.h3`
  padding: 0.8em 0;
  border-bottom: 0.1em solid #afacacde;
`;

export const Heading = styled.h1`
  font-size: ${(props) => (props.mainHead ? 20 : 15)}px;
  font-weight: 400;
  display: block;
  margin-top: 0.5em;
  padding: 0.5em 1em;
  & > span {
    color: red;
  }
`;

export const Container = styled.div``;

export const AllElementsContainer = styled.div`
  padding: 0.5em;
  margin-top: 1.7em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 0.1em solid #afacacde;
  @media ${device.tablet} {
    flex-direction: column;
  }
  @media ${device.mobileL} {
  }
`;

export const ResourceForm = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .css-16awh2u-MuiAutocomplete-root .MuiOutlinedInput-root {
    padding: 0px;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.mobileL} {
    width: 90%;
  }
`;

export const MultiElemContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: colmun;
  flex-wrap: wrap;
  justify-content: space-between;
  @media ${device.tablet} {
    flex-direction: column;
    width: 80%;
    & > * {
      width: 100%;
    }
  }
  @media ${device.mobileL} {
    width: 90%;
  }
`;

export const AllocElemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
