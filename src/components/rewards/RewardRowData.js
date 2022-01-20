import React, { useState } from "react";
import "./rewardTableStyle.css";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  deleteRewardData,
  sendInstanteMessage,
  updateRewardStatus,
} from "../../store/rewards-actions";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import EmployeesList from "../employees/EmployeesList";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import { TableRow, Tab } from "@mui/material";
import "../../assets/GlobalStyle/TableStyles.css";

const RewardRowData = ({ data, StyledMenu, open }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const defaultPage = useSelector((state) => state.reward.defaultPage);
  const sorting = useSelector((state) => state.reward.sorting);
  const searchValue = useSelector((state) => state.reward.searchValue);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const deleteReward = (id) => {
    dispatch(deleteRewardData(id, defaultPage, sorting, searchValue));
    setAnchorEl(null);
  };

  const relaunchReward = (rewardReceiver) => {
    if (rewardReceiver === "selected") {
      setOpenPopup(true);
    } else {
      setOpenPopup(false);
    }
    setAnchorEl(null);
  };

  const stopReward = (id) => {
    dispatch(updateRewardStatus(id, 1, defaultPage, sorting, searchValue)); //1 is for updating reward status to STOPPED
    setAnchorEl(null);
  };

  const launchReward = (id) => {
    dispatch(updateRewardStatus(id, 2, defaultPage, sorting, searchValue)); //2 is for updating reward status to LAUNCH
    setAnchorEl(null);
  };

  const sendMessage = (id) => {
    dispatch(sendInstanteMessage(id));
    setAnchorEl(null);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <TableRow key={data["_id"]} className="table-row">
        <StyledTableCell align="center">
          {data.reward_name ? data.reward_name : data.reward_display_name}
        </StyledTableCell>
        <StyledTableCell align="center">{data.reward_type}</StyledTableCell>
        <StyledTableCell align="center">
          {data.reward_sender === "selected" ? (
            // <p>{data.sender_id[0].empName}</p>
            <>
              {data.sender_id[0] !== undefined
                ? data.sender_id[0].empName
                : data.sender_id.empName}
            </>
          ) : (
            data.reward_sender
          )}
        </StyledTableCell>
        <StyledTableCell align="center">{data.status}</StyledTableCell>
        <StyledTableCell>
          <div className="actions">
            <StyledMenu
              id={`demo-customized-menu-${data._id}`}
              keepMounted
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {data.status === "In Progress" ? (
                <MenuItem onClick={() => sendMessage(data._id)} disableRipple>
                  Send Message
                </MenuItem>
              ) : (
                ""
              )}

              {data.status !== "In Progress" ? (
                <MenuItem onClick={() => launchReward(data._id)} disableRipple>
                  Launch
                </MenuItem>
              ) : (
                ""
              )}

              {data.reward_receiver === "selected" ? (
                <MenuItem
                  onClick={() => relaunchReward(data.reward_receiver)}
                  disableRipple
                >
                  Re-Launch
                </MenuItem>
              ) : (
                ""
              )}
              {data.status !== "Stopped" && data.status === "In Progress" ? (
                <MenuItem onClick={() => stopReward(data._id)} disableRipple>
                  Stop
                </MenuItem>
              ) : (
                ""
              )}

              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/rewards/edit/${data._id}`}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  Edit
                </MenuItem>
              </Link>
              <MenuItem onClick={() => deleteReward(data._id)} disableRipple>
                Delete
              </MenuItem>
            </StyledMenu>
            <p
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: "30px",
              }}
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </p>
          </div>
          <Popup
            title="Team Members"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <EmployeesList
              rewardId={data._id}
              rewardList={true}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              stateOfSelection="multiple"
            />
          </Popup>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

export default RewardRowData;
