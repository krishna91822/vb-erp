import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Card } from "@mui/material";
import UseForm from "./UseForm";
import Form from "./Form";
import MidPopUp from "./MidPopUp";
import "./styles/ClientFormStyles.css";
import { useSelector } from "react-redux";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";

function CreateClientForm() {
  // eslint-disable-next-line no-unused-vars
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
                <Button
                  variant="outlined"
                  id="cancel-btn"
                  sx={{
                    color: "gray",
                    border: "1px solid gray",
                    ":hover": {
                      border: "1px solid gray",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Link>

              <Button
                onClick={submitForm}
                type="submit"
                variant="contained"
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
