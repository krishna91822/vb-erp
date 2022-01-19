import React from "react";
import { Link } from "react-router-dom";
import {
  Switch,
  Button,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import UseForm from "./UseForm";
import Form from "./Form";
import MidPopUp from "./MidPopUp";
import "./styles/ClientFormStyles.css";
import { cimsActions } from "../../store/cims-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";

function CreateClientForm() {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.cims.editMode);
  const { submitForm, validateOnSubmit } = UseForm();

  return (
    <>
      <MidPopUp />
      <Grid>
        <Grid item>
          <StyledTypography>CIMS</StyledTypography>
        </Grid>
      </Grid>
      <div className="CIMSFormContainer">
        <div className="cims-form-header">
          <Grid container m={1} pr={5} spacing={1}>
            <Grid item>
              <MiniHeadingTypography>Client Information</MiniHeadingTypography>
            </Grid>
            <Grid item sm></Grid>
            <Grid container pt={1} md={2} spacing={2}>
              <Grid item md={8}>
                <Link to="/cims" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="error" id="cancel-btn">
                    Cancel
                  </Button>
                </Link>
              </Grid>
              <Grid item md={4}>
                <Button
                  onClick={submitForm}
                  type="submit"
                  variant="contained"
                  color="success"
                  id="save-btn"
                  disabled={!validateOnSubmit()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Form />
      </div>
    </>
  );
}

export default CreateClientForm;
