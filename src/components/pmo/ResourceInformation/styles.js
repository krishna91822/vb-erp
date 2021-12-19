import styled from "styled-components";

const size = {
  mobileL: "540px",
  tablet: "851px",
};

export const device = {
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
};

export const ResourceInformationHeading = styled.h3`
  padding: 0.8em 0;
  border-bottom: 0.1em solid #afacacde;
`;

export const Heading = styled.h1`
  font-size: 16px;
  font-weight: 400;
  display: block;
  margin: 10px 0 7px;
  & > span {
    color: red;
  }
`;

export const Container = styled.div`
  margin-top: 15px;
`;

export const AllElementsContainer = styled.div`
  padding: 0 0.5em 0.5em;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 0.1em solid #afacacde;
  border-radius: 5px;
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
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
  & input[name="allocationStartDate"] {
    color: ${(props) => props.sColor};
  }
  & input[name="allocationEndDate"] {
    color: ${(props) => props.eColor};
  }
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
  & input[name="allocationPercentagetxt"] {
    color: ${(props) => props.aColor};
  }
`;
