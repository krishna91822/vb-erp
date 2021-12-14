import React, { useState } from "react";
import "./rewardTableStyle.css";
// import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import {
  deleteRewardData,
  updateRewardStatus,
} from "../../store/rewards-actions";
import { useDispatch } from "react-redux";
import Popup from "./Popup";
import EmployeesList from "../employees/EmployeesList";
// import { Launch } from "@mui/icons-material";

const RewardRowData = ({ data, StyledMenu, open }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const deleteReward = (id) => {
    dispatch(deleteRewardData(id));
    setAnchorEl(null);
  };

  const relaunchReward = (rewardSender, rewardReceiver) => {
    // console.log(rewardSender, rewardReceiver);
    if (rewardReceiver === "selected" || rewardSender === "selected") {
      setOpenPopup(true);
    } else {
      setOpenPopup(false);
    }
    setAnchorEl(null);
  };

  const stopReward = (id) => {
    dispatch(updateRewardStatus(id, 1)); //1 is for updating reward status to STOPPED
    setAnchorEl(null);
  };

  const launchReward = (id) => {
    dispatch(updateRewardStatus(id, 2)); //2 is for updating reward status to LAUNCH
    setAnchorEl(null);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div key={data["_id"]} className="multiple-rows-container">
        <div className="rewardname">
          <p>
            {data.reward_name ? data.reward_name : data.reward_display_name}
          </p>
        </div>
        <div className="reward">
          <p>{data.reward_type}</p>
        </div>
        <div className="assignee">
          <p>{data.reward_sender}</p>
        </div>
        <div className="reward-state">
          <p>{data.status}</p>
        </div>
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
            {data.status !== "Launch" ? (
              <MenuItem onClick={() => launchReward(data._id)} disableRipple>
                Launch
              </MenuItem>
            ) : (
              ""
            )}
            {data.reward_sender === "selected" ||
            data.reward_receiver === "selected" ? (
              <MenuItem
                onClick={() =>
                  relaunchReward(data.reward_sender, data.reward_receiver)
                }
                disableRipple
              >
                Re-Launch
              </MenuItem>
            ) : (
              ""
            )}
            {data.status !== "Stopped" ? (
              <MenuItem onClick={() => stopReward(data._id)} disableRipple>
                Stop
              </MenuItem>
            ) : (
              ""
            )}

            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/reward/edit/${data._id}`}
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
            {/* <b>...</b> */}
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
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      </div>
    </>
  );
};

export default RewardRowData;
