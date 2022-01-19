import React from "react";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import { TextField, Grid, Button } from "@mui/material";

const CreateUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <>
      <Grid>
        <Grid item>
          <StyledTypography
            style={{ borderBottom: "1px solid gray", padding: "5px 15px" }}
          >
            New User
          </StyledTypography>
        </Grid>

        <Grid item>
          <MiniHeadingTypography
            style={{ borderBottom: "1px solid gray", padding: "5px 15px" }}
          >
            Account
          </MiniHeadingTypography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 100px",
          }}
        >
          <label style={{ padding: "10px ", fontWeight: "600" }}>Name:</label>
          <TextField
            name="username"
            //   data-test="project-name-input"
            size="small"
            variant="outlined"
            //   disabled={!edit}
            placeholder="Enter Name"
            //   value={projectName}
            style={{ width: "100%" }}
            //   onChange={handleProjectChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 100px",
          }}
        >
          <label style={{ padding: "10px ", fontWeight: "600" }}>Email:</label>
          <TextField
            name="useremail"
            //   data-test="project-name-input"
            size="small"
            variant="outlined"
            //   disabled={!edit}
            placeholder="Enter Email Id"
            //   value={projectName}
            style={{ width: "100%" }}
            //   onChange={handleProjectChange}
          />
        </div>
        <Grid item>
          <MiniHeadingTypography
            style={{ borderBottom: "1px solid gray", padding: "5px 15px" }}
          >
            Roles
          </MiniHeadingTypography>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "50px",
          }}
        >
          <label style={{ padding: "10px ", fontWeight: "600" }}>
            Select Roles:
          </label>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="user" />
            <label>User</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="leader" />
            <label>Leader</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="approver" />
            <label>Approver</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="hr_admin" />
            <label>HR Admin</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="finance_admin" />
            <label>Finance Admin</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="pms_admin" />
            <label>PMS Admin</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="super_admin" />
            <label>Super Admin</label>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
