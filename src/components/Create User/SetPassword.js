import React, { useState } from "react";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import { TextField, Grid, Button, Box } from "@mui/material";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (password) => {
    alert(password);
  };
  const validatePassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirm_password");
    password === confirmPassword
      ? handleSubmit(password)
      : alert("password and confirm password are not same");
  };
  return (
    <>
      <Grid>
        <Grid item>
          <StyledTypography
            style={{ borderBottom: "1px solid gray", padding: "5px 15px" }}
          >
            Set Password
          </StyledTypography>
        </Grid>
      </Grid>

      <form
        onSubmit={validatePassword}
        style={{
          border: "1px solid gray",
          margin: "100px",
          padding: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <label
            style={{ padding: "10px ", fontWeight: "600", width: "200px" }}
          >
            Password:
          </label>
          <TextField
            type="password"
            name="password"
            id="password"
            size="small"
            variant="outlined"
            placeholder="New Password "
            value={password}
            style={{ width: "80%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <label
            style={{ padding: "10px ", fontWeight: "600", width: "200px" }}
          >
            Confirm Password:
          </label>
          <TextField
            name="confirm_password"
            id="confirm_password"
            size="small"
            variant="outlined"
            placeholder="Confirm Password "
            value={confirmPassword}
            style={{ width: "80%" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default SetPassword;
