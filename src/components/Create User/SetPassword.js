import React from "react";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import { TextField, Grid, Button, Box } from "@mui/material";

const CreateUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("click");
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
        onSubmit={handleSubmit}
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
            name="password"
            size="small"
            variant="outlined"
            placeholder="New Password "
            //   value={projectName}
            style={{ width: "80%" }}
            //   onChange={handleProjectChange}
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
            size="small"
            variant="outlined"
            placeholder="Confirm Password "
            //   value={projectName}
            style={{ width: "80%" }}
            //   onChange={handleProjectChange}
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

export default CreateUser;
