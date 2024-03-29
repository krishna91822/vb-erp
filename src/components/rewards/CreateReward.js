import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Card } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormLabel } from "@mui/material";
import { useState } from "react";
import "./rewardStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { addRewardData } from "../../store/rewards-actions";
import { rewardsActions } from "../../store/rewards-slice";
import { useNavigate, Link } from "react-router-dom";
import Popup from "./Popup";
import EmployeesList from "../employees/EmployeesList";
import { ToastContainer } from "react-toastify";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import validateForm from "./ValidateCreateReward";

const CreateReward = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [type, setType] = React.useState("");
  const [send, setSender] = React.useState("");
  const [announcement, setAnnouncement] = React.useState("");
  const [subtype, setSubType] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [formData, setFormData] = useState({});
  const updateRewardStatus = useSelector(
    (state) => state.reward.updateRewardData
  );
  useEffect(() => {
    if (updateRewardStatus) {
      navigate("/rewards");
      dispatch(rewardsActions.updateRewardStatus());
    }
  }, [dispatch, updateRewardStatus, navigate]);

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handledata = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const receiverChange = (event) => {
    setReceiver(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const typeChange = (event) => {
    setType(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const subtypeChange = (event) => {
    setSubType(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const senderChange = (event) => {
    setSender(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const announcementChange = (event) => {
    setAnnouncement(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const getFormData = (event) => {
    event.preventDefault();
    const validateError = validateForm(formData);
    const noErrors = Object.keys(validateError).length === 0;
    setErrors(validateError);
    if (noErrors) {
      dispatch(addRewardData(formData));
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
    // setMultipleEmployeeData(data);
    setFormData({
      ...formData,
      sender_id: data[0].employee_id,
    });
  };

  const updaterecipientsData = (data) => {
    //setMultipleEmployeeData(data);
    setFormData({
      ...formData,
      recipients_ids: data.map((emp) => emp.employee_id),
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <Grid container>
        <Grid item>
          <StyledTypography variant="h4">R&R</StyledTypography>
        </Grid>
      </Grid>
      <Card mt={4}>
        <Grid classes={{ root: { width: "100%" } }} sx={{ margin: "1rem" }}>
          <form>
            <div className="rewards-form-header">
              <div>
                <MiniHeadingTypography variant="h4">
                  Create Reward
                </MiniHeadingTypography>
              </div>
              <div className="btn-container">
                <Button
                  id="btn"
                  variant="contained"
                  color="primary"
                  onClick={getFormData}
                >
                  Save
                </Button>
                <Link to="/rewards" className="remove-underline">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "gray",
                      border: "1px solid gray",
                      ":hover": {
                        border: "1px solid gray",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
            <hr />
            <br />
            <Grid item>
              <FormLabel
                children="Reward Display Name"
                style={{ color: " black " }}
              />
              <span style={{ color: "red" }}>*</span>
              <br />
              <TextField
                id="outlined-name"
                name="reward_display_name"
                onChange={handleChangeForm}
                className="textfield1"
                size="small"
                error={errors.reward_display_name ? true : false}
              />
            </Grid>
            <br />
            <Grid item>
              <FormLabel children="Reward Type" style={{ color: " black " }} />
              <span style={{ color: "red" }}>*</span>
              <br />
              <FormControl id="RType">
                <Select
                  justify="justify"
                  className="textfield"
                  name="reward_type"
                  value={type}
                  onChange={typeChange}
                  error={errors.reward_type ? true : false}
                  size="small"
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                  <MenuItem value="On-Demand">OnDemand</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br />
            {type === "Daily" && (
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
                    value={subtype}
                    onChange={subtypeChange}
                    size="small"
                  >
                    <MenuItem value="work-anniversary">
                      Work Anniversary
                    </MenuItem>
                    <MenuItem value="birthday-celebration">
                      Birthday Celebration
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {type === "Monthly" && (
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
                    value={subtype}
                    onChange={subtypeChange}
                    size="small"
                  >
                    <MenuItem value="starOfTheMonth">
                      Star Of The Month
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <br />
            <Grid item>
              <FormLabel
                children="Reward Sender"
                style={{ color: " black " }}
              />
              <span style={{ color: "red" }}>*</span>
              <br />
              <FormControl id="RSender">
                <Select
                  justify="justify"
                  className="textfield"
                  name="reward_sender"
                  value={send}
                  onChange={senderChange}
                  error={errors.reward_sender ? true : false}
                  size="small"
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
              <span style={{ color: "red" }}>*</span>
              <br />
              <FormControl id="Rreceiver">
                <Select
                  justify="justify"
                  className="textfield"
                  value={receiver}
                  name="reward_receiver"
                  onChange={receiverChange}
                  error={errors.reward_receiver ? true : false}
                  size="small"
                >
                  {type === "On-Demand" && (
                    <MenuItem value="Manager">Manager</MenuItem>
                  )}

                  <MenuItem value="Employees">Employee</MenuItem>
                  <MenuItem
                    value="selected"
                    onChange={handledata}
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
              <span style={{ color: "red" }}>*</span>
              <br />
              <TextField
                placeholder="hii <@receiver> you have some msg from <@sender>"
                multiline
                className="textfield1"
                rows={3}
                name="receiver_message"
                onChange={handleChangeForm}
                error={errors.receiver_message ? true : false}
                size="small"
              />
            </Grid>
            <br />
            <Grid item>
              <FormLabel
                children="Announcement Type"
                style={{ color: " black " }}
              />
              <span style={{ color: "red" }}>*</span>
              <br />
              <FormControl id="Atype">
                <Select
                  className="textfield"
                  justify="justify"
                  value={announcement}
                  name="announcement_type"
                  onChange={announcementChange}
                  error={errors.announcement_type ? true : false}
                  size="small"
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br />
            {announcement === "public" && (
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
                  onChange={handleChangeForm}
                  size="small"
                />
              </Grid>
            )}
            <br />
            {announcement === "public" && (
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
                  onChange={handleChangeForm}
                  rows={2}
                  size="small"
                />
              </Grid>
            )}

            {
              <Popup
                title="Team Members"
                openPopup={openSenderPopup}
                setOpenPopup={setOpenSenderPopup}
              >
                <EmployeesList
                  sender={true}
                  rewardList={false}
                  rewardId={formData._id}
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
                  rewardList={false}
                  receiver={true}
                  rewardId={formData._id}
                  updaterecipientsData={updaterecipientsData}
                  openPopup={openReceiverPopup}
                  setOpenPopup={setOpenReceiverPopup}
                  stateOfSelection="multiple"
                />
              </Popup>
            }
          </form>
        </Grid>
      </Card>
    </>
  );
};

export default CreateReward;
