import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormLabel } from "@mui/material";
import { useRef } from "react";
import "./rewardStyle.css";

const CreateReward = () => {
  const formData = useRef(null);
  const [rtype, settype] = React.useState("");
  const [rsend, setsender] = React.useState("");
  const [rannouncement, setannouncement] = React.useState("");
  const [ruser, setuser] = React.useState("");

  const typeChange = (event) => {
    settype(event.target.value);
  };
  const senderChange = (event) => {
    setsender(event.target.value);
  };
  const announcementChange = (event) => {
    setannouncement(event.target.value);
  };
  const userChange = (event) => {
    setuser(event.target.value);
  };
  const getFormData = (event) => {
    event.preventDefault();
    console.log(event.target);
  };
  const submitForm = (event) => {
    event.preventDefault();
    console.log(formData.current);
  };
  return (
    <Grid>
      <form ref={formData}>
        <FormLabel
          className="title"
          style={{ fontSize: " 2rem ", fontWeight: " 650 ", color: " black " }}
          children="New Reward"
        />
        <br />
        <hr />
        <br />
        <FormLabel children="Reward Name" style={{ color: " black " }} />
        <br />
        <TextField
          className="textfield1"
          id="outlined-name"
          label="Monthly Star at Valuebound"
        />
        <br />
        <FormLabel
          children="Reward Display Name"
          style={{ color: " black " }}
        />
        <br />
        <TextField
          id="outlined-name"
          label="Monthly Star at Valuebound"
          className="textfield1"
        />
        <br />
        <FormLabel children="Reward Type" style={{ color: " black " }} />
        <br />
        <FormControl id="RType">
          <InputLabel id="Demo">General</InputLabel>
          <Select
            justify="justify"
            className="textfield"
            value={rtype}
            label="General"
            onChange={typeChange}
          >
            <MenuItem value="sotm">Star Of the Month</MenuItem>
            <MenuItem value="fv">Food Voucher</MenuItem>
            <MenuItem value="mr">Membership Reward</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormLabel children="Reward Sender" style={{ color: " black " }} />
        <br />
        <FormControl id="RSender">
          <InputLabel id="Message Type">Message</InputLabel>
          <Select
            justify="justify"
            className="textfield"
            value={rsend}
            label="Message"
            onChange={senderChange}
          >
            <MenuItem value="per">Personal</MenuItem>
            <MenuItem value="pri">Private</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormLabel children="Recipients" style={{ color: " black " }} />
        <br />
        <TextField
          id="outlined-name"
          label="-Selected"
          className="textfield1"
        />
        &nbsp;
        <Button id="editbutton" variant="contained">
          Edit
        </Button>
        <br />
        <FormLabel children="Receiver Message" style={{ color: " black " }} />
        <FormControl id="RType">
          <InputLabel id="Demo">Display</InputLabel>
          <Select
            justify="justify"
            className="check"
            value={ruser}
            label="Display"
            onChange={userChange}
          >
            <MenuItem value="sotm">
              <Checkbox defaultChecked />
              Yash
            </MenuItem>
            <MenuItem value="fv">
              <Checkbox />
              Vimal
            </MenuItem>
            <MenuItem value="mr">
              <Checkbox />
              Nikhil
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          placeholder="Congratulations Receiver for a great sales cycle"
          multiline
          className="textfield1"
          rows={3}
          rowsMax={4}
        />
        <br />
        <FormLabel children="Announcement Type" style={{ color: " black " }} />
        <br />
        <FormControl id="Atype">
          <InputLabel id="Pdemo">Public</InputLabel>
          <Select
            className="textfield"
            justify="justify"
            className="textfield"
            value={rannouncement}
            label="Public"
            onChange={announcementChange}
          >
            <MenuItem value="pub">Public</MenuItem>
            <MenuItem value="pri">Private</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormLabel children="Slack Channel" style={{ color: " black " }} />
        <br />
        <TextField
          id="outlined-name"
          label="#demospolight"
          className="textfield1"
        />
        <br />
        <FormLabel children="Channel Message" style={{ color: " black " }} />
        <br />
        <TextField
          placeholder="Please Join Us"
          multiline
          className="textfield1"
          rows={2}
          rowsMax={3}
        />
        <div className="btn-container">
          <Button
            id="btn"
            variant="contained"
            color="primary"
            onClick={submitForm}
          >
            Save
          </Button>
          <Button variant="contained" color="error">
            Cancel
          </Button>
        </div>
      </form>
    </Grid>
  );
};

export default CreateReward;
