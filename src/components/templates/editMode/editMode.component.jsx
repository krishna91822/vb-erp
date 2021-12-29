import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import { TitleTypo, CustomSwitch, ModalBoxItem } from "./editMode.styles";
import { editModeConstant } from "./editMode.constant";

import { useSelector, useDispatch } from "react-redux";
import { toggleEditMode } from "../../../store/employeeSlice";
import { uiActions } from "./../../../store/ui-slice";

import axiosInstance from "./../../../helpers/axiosInstance";

const EditMode = ({ updateRequest, handleOpen, handleSubmit }) => {
  const { inEditMode } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.user);
  const { toggleLoader, showNotification } = uiActions;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleToggleClose = () => {
    dispatch(toggleEditMode());
    setOpen(false);
  };
  const handleToggleOpen = () => setOpen(true);

  const handleSubmitBtn = () => {
    if (["hr_admin", "super_admin"].some((el) => user.roles.includes(el))) {
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
          dispatch(toggleEditMode());
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
        })
        .then(function (response) {
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "success",
              title: "Employee has been sent for review.",
              message: "Employee has been sent for review.",
            })
          );
          dispatch(toggleEditMode());
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
  };

  const handleChange = (event) => {
    dispatch(toggleEditMode());
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
        pb: 1,
      }}
    >
      {inEditMode ? (
        <div>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="contained"
            onClick={handleOpen}
          >
            add Custom Field
          </Button>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="contained"
            onClick={handleSubmit(handleSubmitBtn)}
          >
            {["hr_admin", "super_admin"].some((el) => user.roles.includes(el))
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
      <TitleTypo
        data-test="edit-text-test"
        sx={{ textTransform: "capitalize", pr: 1 }}
      >
        {editModeConstant.editModeBtn}
      </TitleTypo>
      <CustomSwitch
        data-test="edit-switch-test"
        checked={inEditMode}
        onChange={handleChange}
        inputProps={{ "aria-label": "switch" }}
      />
    </Box>
  );
};

export default EditMode;
