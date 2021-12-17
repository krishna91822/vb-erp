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

export const PmoContainer = styled.div`
  // padding: 5px 15px;
  min-width: 300px; //we need to remove this line
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

  & > h2 {
    margin: 0;
  }
`;

export const StyledHeader = styled.form`
  padding: 0.5em;
  border: 0.1em solid #afacacde;
  border-radius: 5px;
  /* box-shadow: 0px 0px 15px black; */
`;

export const FormHeadingStyled = styled.div`
  padding: 0.4em 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1em solid #afacacde;

  & > h3 {
    margin: 0;
  }
`;

export const FormContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: column;
  }

  @media ${device.mobileL} {
  }
`;

export const FormElementsStyled = styled.div`
  width: 48%;
  & > label {
    display: block;
    margin: 10px 0 7px;
    // padding: 0.5em 1em;
  }
  & > label > span {
    color: red;
  }

  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.mobileL} {
    width: 90%;
  }
`;

export const NumberStyle = styled.div``;

export const DateContainerStyled = styled.div`
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media ${device.tablet} {
    flex-direction: column;
    width: 80%;
  }
  @media ${device.mobileL} {
    width: 90%;
  }
  & input[name="startDate"] {
    color: ${(props) => props.sColor};
  }
  & input[name="endDate"] {
    color: ${(props) => props.eColor};
  }
`;

export const DateElementStyled = styled.div`
  width: 48%;
  & > label {
    display: block;
    margin: 10px 0 7px;
    // padding: 0.5em 1em;
  }
  & > label > span {
    color: red;
  }

  @media ${device.tablet} {
    width: 100%;
    & > * {
      width: 100%;
    }
  }
`;
