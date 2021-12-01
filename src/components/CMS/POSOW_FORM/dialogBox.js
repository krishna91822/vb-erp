import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Navigate, Redirect } from "react-router";
import { useNavigate } from "react-router-dom";

import { PoSowActions } from "../../../store/CMS/POSOW-slice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 1, p: 2, width: 400 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ msg, sendForApproval }) {
  const popupController = useSelector((state) => state.CMS_state.popup);
  const [open, setOpen] = React.useState(popupController);
  const dispatch = useDispatch();
  const params = useParams();
  let navigate = useNavigate();
  const handleClose = () => {
    dispatch(PoSowActions.PopUpOF());
    if (params.id === undefined) {
      navigate("/POSOW");
    } else {
      navigate(`/POSOW_detail/${params.id}`);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Message
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{msg}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            <h3>OK</h3>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
