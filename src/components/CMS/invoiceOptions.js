import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormDialog from "./invoiceEditDialog";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  let navigate = useNavigate();
  //   const handleInvoiceView = () => {
  //     navigate("/invoice_details/${props.invoiceID}");
  //   };
  const [popup, setPopup] = React.useState(false);
  const handleEditClick = () => {
    setPopup(!popup);
  };
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
          //   key={option}
          //   selected={false}
          onClick={handleEditClick}
          disabled={props.invoice_received === "Yes"}
        >
          Edit
          {popup ? (
            <FormDialog
              invoice_received={props.invoice_received}
              popup={true}
            />
          ) : (
            <></>
          )}
          {/* <FormDialog
            invoice_received={props.invoice_received}
            popup={true}
          />{" "} */}
        </MenuItem>
        <MenuItem
          //   key={option}
          //   selected={false}
          //   onClick={handleInvoiceView}
          component={Link}
          to={`/invoice_details/${props.invoiceID}`}
        >
          View
        </MenuItem>
      </Menu>
    </div>
  );
}
