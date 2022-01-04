import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormDialog from "./invoiceEditDialog";
import { Link } from "react-router-dom";
import { invoiceActions } from "../../store/CMS/INVOICE-slice";
import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const handleEditClick = () => {
    dispatch(invoiceActions.setPopupOpen());
    dispatch(invoiceActions.setpopupVisibility());
  };
  const visibility = useSelector(
    (state) => state.INVOICE_state.popupVisibility
  );
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={handleEditClick}
          disabled={props.invoice_received === "Yes"}
        >
          Edit
        </MenuItem>
        {visibility ? (
          <FormDialog
            invoice_received={props.invoice_received}
            invoiceID={props.invoiceID}
          />
        ) : null}
        <MenuItem component={Link} to={`/invoice_details/${props.invoiceID}`}>
          View
        </MenuItem>
      </Menu>
    </div>
  );
}
