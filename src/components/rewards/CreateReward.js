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

const CreateReward = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [type, setType] = React.useState("");
  const [send, setSender] = React.useState("");
  const [announcement, setAnnouncement] = React.useState("");
  const [subtype, setSubType] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [multipleEmployeeData, setMultipleEmployeeData] = React.useState([]);

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
    dispatch(addRewardData(formData));
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
      <Grid classes={{ root: { width: "100%" } }}>
        <div className="rewards-form-header">
          <div>
            <FormLabel
              className="title"
              style={{
                fontSize: " 2rem ",
                fontWeight: " 650 ",
                color: " black ",
              }}
              children="New Reward"
            />
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
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <Card mt={4}>
          <form>
            <Grid margin={"1rem"}>
              <Grid item>
                <label>Reward Display Name</label>
                <br />
                <TextField
                  size="small"
                  id="outlined-name"
                  placeholder="Enter Reward Name"
                  name="reward_display_name"
                  onChange={handleChangeForm}
                  className="textfield1"
                />
              </Grid>
              <br />
              <Grid item>
                <label>Reward Type</label>
                <br />
                <FormControl id="RType">
                  <Select
                    justify="justify"
                    size="small"
                    className="textfield"
                    name="reward_type"
                    value={type}
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
              {type === "Daily" && (
                <Grid item>
                  <label>Reward Sub Type</label>
                  <br />
                  <FormControl id="RType">
                    <Select
                      size="small"
                      justify="justify"
                      className="textfield"
                      name="reward_subType"
                      value={subtype}
                      onChange={subtypeChange}
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
                  <label>Reward Sub Type</label>
                  <br />
                  <FormControl id="RType">
                    <Select
                      size="small"
                      justify="justify"
                      className="textfield"
                      name="reward_subType"
                      value={subtype}
                      onChange={subtypeChange}
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
                <label>Reward Sender</label>
                <br />
                <FormControl id="RSender">
                  <Select
                    size="small"
                    justify="justify"
                    className="textfield"
                    name="reward_sender"
                    value={send}
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
                <label>Reward Receiver</label>
                <br />
                <FormControl id="Rreceiver">
                  <Select
                    justify="justify"
                    size="small"
                    className="textfield"
                    value={receiver}
                    name="reward_receiver"
                    onChange={receiverChange}
                  >
                    {type === "On-Demand" && (
                      <MenuItem value="Manager">Manager</MenuItem>
                    )}

                    <MenuItem value="Employees">All Employees</MenuItem>
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
                <label>Reward Receiver</label>
                <br />
                <TextField
                  placeholder="hii <@receiver> you have some msg from <@sender>"
                  multiline
                  size="small"
                  className="textfield1"
                  rows={3}
                  name="receiver_message"
                  onChange={handleChangeForm}
                />
              </Grid>
              <br />
              <Grid item>
                <label>Announcement Type</label>
                <br />
                <FormControl id="Atype">
                  <Select
                    className="textfield"
                    justify="justify"
                    size="small"
                    value={announcement}
                    name="announcement_type"
                    onChange={announcementChange}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <br />
              {announcement === "public" && (
                <Grid item>
                  <label>Slack Channel</label>
                  <br />
                  <TextField
                    id="outlined-name"
                    size="small"
                    className="textfield1"
                    name="slack_channel"
                    onChange={handleChangeForm}
                  />
                </Grid>
              )}
              <br />
              {announcement === "public" && (
                <Grid item>
                  <label htmlFor="">Channel Message</label>
                  <br />
                  <TextField
                    placeholder="hii <@receiver> you have some msg from <@sender>"
                    multiline
                    size="small"
                    className="textfield1"
                    name="channel_message"
                    onChange={handleChangeForm}
                    rows={2}
                  />
                </Grid>
              )}
            </Grid>

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
                  stateOfSelection="single"
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
        </Card>
      </Grid>
    </>
  );
};

export default CreateReward;
