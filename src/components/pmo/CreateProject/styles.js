import styled from "styled-components";

const size = {
  mobileL: "540px",
  tablet: "851px",
};

const device = {
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
};

export const PmoContainer = styled.div`
  min-width: 300px; //we need to remove this line
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
`;

export const FormElementsStyled = styled.div`
  width: 48%;
  & > label {
    display: block;
    margin: 10px 0 7px;
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
