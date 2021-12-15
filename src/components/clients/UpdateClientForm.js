import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Switch,
  Button,
  Typography,
  FormControlLabel,
  Grid,
} from "@mui/material";
import UseForm from "./UseForm";
import Form from "./Form";
import "../../assets/styles/FormStyles.css";
import { cimsActions } from "../../store/cims-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MidPopUp from "./MidPopUp";

function UpdateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editMode = useSelector((state) => state.cims.editMode);
  const navigateBack = useSelector((state) => state.cims.navigateBack);
  const { updateForm, validateOnSubmit } = UseForm();

  useEffect(() => {
    if (navigateBack) navigate("/cims");
  }, []);

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
            <Grid container pt={1} md={5} spacing={4}>
              <Grid item md={3}>
                <Link to="/cims" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="error" id="cancel-btn">
                    Cancel
                  </Button>
                </Link>
              </Grid>
              <Grid item md={4}>
                <Button
                  onClick={updateForm}
                  type="submit"
                  variant="contained"
                  color="success"
                  id="save-btn"
                  disabled={!validateOnSubmit()}
                >
                  Update
                </Button>
              </Grid>
              <Grid item md={5}>
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

export default UpdateClientForm;
