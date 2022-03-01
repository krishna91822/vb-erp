import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import { TitleTypo, CustomSwitch, ModalBoxItem } from "./editMode.styles";
import { editModeConstant } from "./editMode.constant";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./../../../store/ui-slice";

import axiosInstance from "./../../../helpers/axiosInstance";

const EditMode = ({
  value,
  setInEditMode,
  inEditMode,
  updateRequest,
  handleOpen,
  // handleSubmit,
  setEmployeeUpdateCount,
  switchOnly,
  btnsOnly,
}) => {
  const { user } = useSelector((state) => state.user);
  const { toggleLoader, showNotification } = uiActions;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleToggleClose = () => {
    // dispatch(toggleEditMode());
    setInEditMode((prev) => !prev);
    setOpen(false);
  };
  // eslint-disable-next-line no-unused-vars
  const handleToggleOpen = () => setOpen(true);
  const handleSubmitBtn = () => {
    if (user.permissions.includes("approve_employee_edit_request")) {
      dispatch(toggleLoader());

      let employeeObject = { ...updateRequest };

      ["_id", "empId", "createdAt", "updatedAt", "count"].map(
        (el) => delete employeeObject[el]
      );

      axiosInstance
        .patch(`/employees/${updateRequest._id}`, employeeObject)
        .then(function (response) {
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "success",
              title: "Employee has been updated.",
              message: "Employee has been updated.",
            })
          );
          // dispatch(toggleEditMode());
          setInEditMode((prev) => !prev);
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "error",
              title: "Something went wrong.",
              message: "Something went wrong",
            })
          );
          console.log(error);
        });
    } else {
      dispatch(toggleLoader());
      axiosInstance
        .post("/reviews", {
          reqName: updateRequest.empName,
          reqType: "profile-update",
          employeeDetails: { ...updateRequest },
          reqEmail: user.email,
        })
        .then(function (response) {
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "success",
              title: "request has been sent for review.",
              message: "request has been sent for review.",
            })
          );
          // dispatch(toggleEditMode());
          setInEditMode((prev) => !prev);
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "error",
              title: "Something went wrong.",
              message: "Something went wrong",
            })
          );
          console.log(error);
        });
    }
    setEmployeeUpdateCount((prev) => prev + 1);
  };

  const handleChange = (event) => {
    // dispatch(toggleEditMode());
    setInEditMode((prev) => !prev);
  };
  return (
    <Box
      data-test="edit-mode-test"
      sx={{
        minHeight: 40,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 0,
      }}
    >
      {inEditMode && !switchOnly && btnsOnly ? (
        <div>
          {value !== 3 && (
            <Button
              sx={{ margin: "0 1rem 1rem 0" }}
              variant="contained"
              onClick={handleOpen}
            >
              add Custom Field
            </Button>
          )}
          <Button
            sx={{ margin: "0 1.5rem 1rem 0" }}
            variant="contained"
            onClick={handleSubmitBtn}
          >
            {user.permissions.includes("approve_employee_edit_request")
              ? editModeConstant.update
              : editModeConstant.SubmitRequest}
          </Button>
          <Modal open={open} onClose={handleToggleClose}>
            <ModalBoxItem>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {editModeConstant.modalMessage}
              </Typography>
              <Button variant="contained" onClick={handleToggleClose}>
                {editModeConstant.modalBtn}
              </Button>
            </ModalBoxItem>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {!btnsOnly && (
        <>
          <TitleTypo data-test="edit-text-test" sx={{ pr: 1 }}>
            {editModeConstant.editModeBtn}
          </TitleTypo>
          <CustomSwitch
            data-test="edit-switch-test"
            checked={inEditMode}
            onChange={handleChange}
            inputProps={{ "aria-label": "switch" }}
          />
        </>
      )}
    </Box>
  );
};

export default EditMode;
