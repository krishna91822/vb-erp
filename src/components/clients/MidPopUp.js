import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { cimsActions } from "../../store/cims-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6E6A6A",
  boxShadow: 24,
  p: 4,
};

function MidPopUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = useSelector((state) => state.cims.popUpOpen);
  const message = useSelector((state) => state.cims.popUpMessage);
  const popUpOk = useSelector((state) => state.cims.popUpOk);

  const handleClose = () => {
    dispatch(cimsActions.setPopUp({ popUpOpen: false, message: "" }));
    if (popUpOk !== "") navigate(popUpOk);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ m: 5 }}
          >
            {message}
          </Typography>
          <Button onClick={handleClose} variant="contained" color="primary">
            Ok
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MidPopUp;
