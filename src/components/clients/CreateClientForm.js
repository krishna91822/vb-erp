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
import "../../assets/styles/FormStyles.css";
import { cimsActions } from "../../store/cims-slice";
import { useDispatch, useSelector } from "react-redux";

function CreateClientForm() {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.cims.editMode);
  const { submitForm, validateOnSubmit } = UseForm();

  return (
    <>
      <MidPopUp />
      <Grid container m={1}>
        <Grid item>
          <Typography variant="h4">CIMS</Typography>
        </Grid>
      </Grid>
      <div className="FormContainer">
        <div className="form-header">
          <Grid container m={2} spacing={1}>
            <Grid item md={4}>
              <Typography variant="h4">Client Information</Typography>
            </Grid>
            <Grid item sm></Grid>
            <Grid container pt={1} md={5} spacing={5}>
              <Grid item md={3}>
                <Link to="/cims" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="error" id="cancel-btn">
                    Cancel
                  </Button>
                </Link>
              </Grid>
              <Grid item md={3}>
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
              <Grid item md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editMode}
                      onChange={() =>
                        dispatch(cimsActions.toggleEditMode(!editMode))
                      }
                      color="success"
                    />
                  }
                  label="Edit mode"
                />
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
