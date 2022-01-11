import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const Popup = (props) => {
  const { title, openPopup, children } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent dividers>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
