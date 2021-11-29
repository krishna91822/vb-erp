import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import { TitleTypo, CustomSwitch, ModalBoxItem } from "./editMode.styles";
import { editModeConstant } from "./editMode.constant";

import { connect } from "react-redux";
import { toggleEditMode } from "../../../redux/employee/employee.actions";

const EditMode = ({ toggleEditMode, inEditMode, updateRequest }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    toggleEditMode();
  };
  return (
    <Box
      sx={{
        minHeight: 40,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 2,
      }}
    >
      {inEditMode ? (
        <div>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="contained"
            onClick={handleClick}
          >
            {editModeConstant.SubmitRequest}
          </Button>
          <Modal open={open} onClose={handleClose}>
            <ModalBoxItem>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {editModeConstant.modalMessage}
              </Typography>
              <Button variant="contained" onClick={handleClose}>
                {editModeConstant.modalBtn}
              </Button>
            </ModalBoxItem>
          </Modal>
        </div>
      ) : (
        ""
      )}
      <TitleTypo sx={{ textTransform: "capitalize", pr: 1 }}>
        {editModeConstant.editModeBtn}
      </TitleTypo>
      <CustomSwitch
        checked={inEditMode}
        onChange={handleChange}
        inputProps={{ "aria-label": "switch" }}
      />
    </Box>
  );
};

const mapStateToProps = ({ employee: { inEditMode } }) => ({
  inEditMode,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEditMode: () => dispatch(toggleEditMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMode);
