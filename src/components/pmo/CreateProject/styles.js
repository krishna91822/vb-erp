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
  align-items: flex-end;
`;

export const StyledHeader = styled.form`
  padding: 0.5em;
  border: 0.1em solid #afacacde;
`;

export const FormHeadingStyled = styled.div`
  padding: 0.4em 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1em solid #afacacde;
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
    margin-top: 0.5em;
    padding: 0.5em 1em;
  }
  & > label > span {
    color: red;
  }
  .MuiOutlinedInput-input {
    padding: 0.7em 14px;
  }
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.mobileL} {
    width: 90%;
  }
`;

export const NumberStyle = styled.div`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

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
`;

export const DateElementStyled = styled.div`
  width: 48%;
  & > label {
    display: block;
    margin-top: 0.5em;
    padding: 0.5em 1em;
  }
  & > label > span {
    color: red;
  }
  @media ${device.tablet} {
    width: 100%;
    & > * {
      display: block;
      width: 100%;
    }
  }
`;
