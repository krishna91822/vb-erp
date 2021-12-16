import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import "./rewardStyle.css";
import Popup from "./Popup";
import EmployeesList from "../employees/EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { EditRewardData } from "../../store/rewards-actions";
import { rewardsActions } from "../../store/rewards-slice";
import { UpdateRewardData } from "../../store/rewards-actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditReward = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const updateRewardStatus = useSelector(
    (state) => state.reward.updateRewardData
  );
  const rewardData = useSelector((state) => state.reward.editRewardData);

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled && !updateRewardStatus) {
      dispatch(EditRewardData(id));
      dispatch(rewardsActions.updateRewardStatus());
    }
    return () => {
      isCancelled = true;
    };
  }, [dispatch, id]);

  const handleChangeName = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          reward_display_name: e.target.value,
        },
      })
    );
  };
  console.log(rewardData);
  const handleChangeReceiverMessage = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          receiver_message: e.target.value,
        },
      })
    );
  };

  const handleChangeSlack = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          slack_channel: e.target.value,
        },
      })
    );
  };

  const handleChangeChannel = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          channel_message: e.target.value,
        },
      })
    );
  };

  const receiverChange = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          reward_receiver: e.target.value,
        },
      })
    );
  };
  const typeChange = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          reward_type: e.target.value,
        },
      })
    );
  };
  const subtypeChange = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          reward_subType: e.target.value,
        },
      })
    );
  };
  const senderChange = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          reward_sender: e.target.value,
        },
      })
    );
  };

  // const selectsenderChange = (e) => {
  //   dispatch(
  //     rewardsActions.addEditRewardData({
  //       rewardData: {
  //         ...rewardData,
  //         sender_id: e.target.value,
  //       },
  //     })
  //   );
  // };

  // const selectreceiverChange = (e) => {
  //   dispatch(
  //     rewardsActions.addEditRewardData({
  //       rewardData: {
  //         ...rewardData,
  //         recipients_ids: e.target.value,
  //       },
  //     })
  //   );
  // };

  const announcementChange = (e) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          announcement_type: e.target.value,
        },
      })
    );
  };

  let navigate = useNavigate();
  const saveFormData = () => {
    if (
      rewardData.reward_display_name !== "" ||
      rewardData.receiver_message !== ""
    ) {
      console.log(rewardData);
      dispatch(UpdateRewardData(rewardData, id));
      navigate("/rewards");
    } else {
      alert("Cannot Leave name OR message field blank");
    }
  };

  const [openSenderPopup, setOpenSenderPopup] = useState(false);

  const senderPopup = () => {
    setOpenSenderPopup(true);
  };

  const [openReceiverPopup, setOpenReceiverPopup] = useState(false);

  const receiverPopup = () => {
    setOpenReceiverPopup(true);
  };

  const updateSenderData = (data) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          sender_id: data[0].employee_id,
        },
      })
    );
  };

  const updaterecipientsData = (data) => {
    dispatch(
      rewardsActions.addEditRewardData({
        rewardData: {
          ...rewardData,
          recipients_ids: data.map((emp) => emp.employee_id),
        },
      })
    );
  };

  return (
    <Grid classes={{ root: { width: "100%" } }}>
      {rewardData && rewardData.reward_type && (
        <form>
          <Grid item>
            <FormLabel
              className="title"
              style={{
                fontSize: " 2rem ",
                fontWeight: " 650 ",
                color: " Black ",
              }}
              children="Edit Reward"
            />
            <br />
          </Grid>
          <hr />
          <br />
          <Grid item>
            <FormLabel
              children="Reward Display Name"
              style={{ color: " black " }}
            />
            <br />
            <TextField
              id="outlined-name"
              className="textfield1"
              name="reward_display_name"
              value={rewardData.reward_display_name}
              onChange={handleChangeName}
            />
          </Grid>
          <br />
          <Grid item>
            <FormLabel children="Reward Type" style={{ color: " black " }} />
            <br />
            <FormControl id="RType">
              <Select
                justify="justify"
                className="textfield"
                name="reward_type"
                value={rewardData.reward_type}
                onChange={typeChange}
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="On-Demand">OnDemand</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          {rewardData.reward_type === "Daily" && (
            <Grid item>
              <FormLabel
                children="Reward Sub Type"
                style={{ color: " black " }}
              />
              <br />
              <FormControl id="RType">
                <Select
                  justify="justify"
                  className="textfield"
                  name="reward_subType"
                  value={rewardData.reward_subType}
                  onChange={subtypeChange}
                >
                  <MenuItem value="work-anniversary">Work Anniversary</MenuItem>
                  <MenuItem value="birthday-celebration">
                    Birthday Celebration
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <br />
          <Grid item>
            <FormLabel children="Reward Sender" style={{ color: " black " }} />
            <br />
            <FormControl id="RSender">
              <Select
                justify="justify"
                className="textfield"
                name="reward_sender"
                value={rewardData.reward_sender}
                onChange={senderChange}
              >
                <MenuItem value="CEO">CEO</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem
                  value="selected"
                  onClick={() => senderPopup()}
                  disableRipple
                >
                  :Selected
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          <Grid item>
            <FormLabel
              children="Reward Receiver"
              style={{ color: " black " }}
            />
            <br />
            <FormControl id="Rreceiver">
              <Select
                justify="justify"
                className="textfield"
                value={rewardData.reward_receiver}
                name="reward_receiver"
                onChange={receiverChange}
              >
                {rewardData.reward_type === "On-Demand" && (
                  <MenuItem value="Manager">Manager</MenuItem>
                )}

                <MenuItem value="Employees">Employee</MenuItem>
                <MenuItem
                  value="selected"
                  onClick={() => receiverPopup()}
                  disableRipple
                >
                  :Selected
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          <Grid item>
            <FormLabel
              children="Receiver Message"
              style={{ color: " black " }}
            />
            <br />
            <TextField
              placeholder="Congratulations Receiver for a great sales cycle"
              multiline
              className="textfield1"
              value={rewardData.receiver_message}
              rows={3}
              name="receiver_message"
              onChange={handleChangeReceiverMessage}
            />
          </Grid>
          <br />
          <Grid item>
            <FormLabel
              children="Announcement Type"
              style={{ color: " black " }}
            />
            <br />
            <FormControl id="Atype">
              <Select
                className="textfield"
                justify="justify"
                value={rewardData.announcement_type}
                name="announcement_type"
                onChange={announcementChange}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          {rewardData.announcement_type === "public" && (
            <Grid item>
              <FormLabel
                children="Slack Channel"
                style={{ color: " black " }}
              />
              <br />
              <TextField
                id="outlined-name"
                className="textfield1"
                name="slack_channel"
                value={rewardData.slack_channel}
                onChange={handleChangeSlack}
              />
            </Grid>
          )}
          <br />
          {rewardData.announcement_type === "public" && (
            <Grid item>
              <FormLabel
                children="Channel Message"
                style={{ color: " black " }}
              />
              <br />
              <TextField
                placeholder="Please Join Us"
                multiline
                className="textfield1"
                name="channel_message"
                value={rewardData.channel_message}
                onChange={handleChangeChannel}
                rows={2}
              />
            </Grid>
          )}
          <div className="btn-container">
            <Button
              id="btn"
              variant="contained"
              color="primary"
              onClick={saveFormData}
            >
              Save
            </Button>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </div>
          {
            <Popup
              title="Team Members"
              openPopup={openSenderPopup}
              setOpenPopup={setOpenSenderPopup}
            >
              <EmployeesList
                sender={true}
                rewardId={rewardData._id}
                updateSenderData={updateSenderData}
                openPopup={openSenderPopup}
                setOpenPopup={setOpenSenderPopup}
              />
            </Popup>
          }
          {
            <Popup
              title="Team Members"
              openPopup={openReceiverPopup}
              setOpenPopup={setOpenReceiverPopup}
            >
              <EmployeesList
                receiver={true}
                rewardId={rewardData._id}
                updaterecipientsData={updaterecipientsData}
                openPopup={openReceiverPopup}
                setOpenPopup={setOpenReceiverPopup}
              />
            </Popup>
          }
        </form>
      )}
    </Grid>
  );
};

export default EditReward;
