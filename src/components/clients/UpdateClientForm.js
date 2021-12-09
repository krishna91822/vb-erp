import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Switch, Button } from "@mui/material";
import UseForm from "./UseForm";
import PageHeader from "./PageHeader";
import Form from "./Form";
import "../../assets/styles/FormStyles.css";
import { cimsActions } from "../../store/cims-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UpdateClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editMode = useSelector((state) => state.cims.editMode);
  const navigateBack = useSelector((state) => state.cims.navigateBack);
  const { authStore, updateForm, validateOnSubmit } = UseForm();

  useEffect(() => {
    if (navigateBack) navigate("/cims");
    authStore();
  }, []);

  return (
    <>
      <PageHeader />
      <div className="FormContainer">
        <div className="form-header">
          <h2>Client Information</h2>
          <div className="header-end">
            <div>
              <p>Edit mode</p>
              <Switch
                checked={editMode}
                onChange={() => dispatch(cimsActions.toggleEditMode(!editMode))}
                color="success"
              />
              <Link to="/cims">
                <Button variant="contained" color="error" id="cancel-btn">
                  Cancel
                </Button>
              </Link>
              <Button
                ml={4}
                onClick={updateForm}
                type="submit"
                variant="contained"
                color="success"
                id="save-btn"
                disabled={!validateOnSubmit()}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
        <Form />
      </div>
    </>
  );
}

export default UpdateClientForm;
