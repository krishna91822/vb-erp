import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, FormControlLabel, Grid } from "@mui/material";
import { CustomSwitch } from "../UI/commonStyles";
import UseForm from "./UseForm";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { TitleTypo } from "../templates/editMode/editMode.styles";
import "./styles/ClientFormStyles.css";
import { cimsActions } from "../../store/cims-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import { uiActions } from "../../store/ui-slice";
import MidPopUp from "./MidPopUp";
import { handelClientData } from "../../store/cims-actions";

function UpdateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editMode = useSelector((state) => state.cims.editMode);
  const navigateBack = useSelector((state) => state.cims.navigateBack);
  const { updateForm, validateOnSubmit, user } = UseForm();
  let { id } = useParams();
  const errors = useSelector((state) => state.cims.errors);

  const handleClientData = async (clientId, mode) => {
    dispatch(handelClientData(clientId, mode, errors));
    setTimeout(() => {
      navigate(`/cims/clientdetails/${clientId}`);
      dispatch(uiActions.toggleLoader());
    }, 1000);
  };

  useEffect(() => {
    if (navigateBack) handleClientData(id, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MidPopUp />
      <Grid container>
        <Grid item>
          <StyledTypography variant="h4">CIMS</StyledTypography>
        </Grid>
      </Grid>
      <div className="CIMSFormContainer">
        <div className="cims-form-header">
          <MiniHeadingTypography variant="h4">
            Client Information
          </MiniHeadingTypography>
          {user.permissions.includes("update_on_CIMS_module") ? (
            <div className="cims-header-end">
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

              {editMode ? (
                <Button
                  onClick={updateForm}
                  type="submit"
                  variant="contained"
                  id="save-btn"
                  disabled={!validateOnSubmit()}
                >
                  Update
                </Button>
              ) : (
                <></>
              )}

              <FormControlLabel
                control={
                  <CustomSwitch
                    checked={editMode}
                    onChange={() =>
                      dispatch(cimsActions.toggleEditMode(!editMode))
                    }
                    color="success"
                  />
                }
                label={<TitleTypo>Edit mode &nbsp;</TitleTypo>}
                labelPlacement="start"
                sx={{ paddingRight: "12px" }}
              />
            </div>
          ) : (
            <Link to="/cims" style={{ textDecoration: "none" }}>
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
          )}
        </div>
        <Form />
      </div>
    </>
  );
}

export default UpdateClientForm;
