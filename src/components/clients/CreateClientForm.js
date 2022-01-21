import React from "react";
import { Link } from "react-router-dom";
import {
  Switch,
  Button,
  FormControlLabel,
  Grid,
  Typography,
  Card,
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
      <Card sx={{ margin: "1rem" }}>
        <div className="CIMSFormContainer">
          <div className="cims-form-header">
            <MiniHeadingTypography>Client Information</MiniHeadingTypography>

            <div>
              <Link
                to="/cims"
                style={{ textDecoration: "none", paddingRight: "10px" }}
              >
                <Button variant="contained" color="error" id="cancel-btn">
                  Cancel
                </Button>
              </Link>

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
            </div>
          </div>
          <Form />
        </div>
      </Card>
    </>
  );
}

export default CreateClientForm;
