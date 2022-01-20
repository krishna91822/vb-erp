import React, { useState, useEffect } from "react";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import { TextField, Grid, Button } from "@mui/material";
import {
  searchEmployees,
  createUserAccount,
} from "../../store/userAccount-action";
import { useSelector, useDispatch } from "react-redux";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [check, setCheck] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userDetail = {};
    userDetail.first_name = data.get("username");
    userDetail.email = data.get("useremail");
    userDetail.role = [];
    data.get("user") && userDetail.role.push(data.get("user"));
    data.get("leader") && userDetail.role.push(data.get("leader"));
    data.get("approver") && userDetail.role.push(data.get("approver"));
    data.get("hr_admin") && userDetail.role.push(data.get("hr_admin"));
    data.get("finance_admin") &&
      userDetail.role.push(data.get("finance_admin"));
    data.get("pms_admin") && userDetail.role.push(data.get("pms_admin"));
    data.get("super_admin") && userDetail.role.push(data.get("super_admin"));
    userDetail.password = " ";
    console.log(userDetail);
    // console.log(event.target.value);

    // dispatch(createUserAccount(userDetail));
    setUsername("");
    setUseremail("");
    setCheck(false);
    // event.target;
  };
  const userAccount = useSelector((state) => state.createUser);
  useEffect(() => {
    dispatch(searchEmployees(username));
  }, [username]);
  // console.log(username, "createsuer============");
  console.log(userAccount, "createuser======");
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
      <form onSubmit={(e) => handleSubmit(e)}>
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
            id="username"
            size="small"
            variant="outlined"
            //   disabled={!edit}
            placeholder="Enter Name"
            value={username}
            style={{ width: "100%" }}
            onChange={(e) => setUsername(e.target.value)}
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
            id="useremail"
            size="small"
            variant="outlined"
            //   disabled={!edit}
            placeholder="Enter Email Id"
            value={useremail}
            style={{ width: "100%" }}
            onChange={(e) => setUseremail(e.target.value)}
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
            <input
              type="checkbox"
              value="user"
              id="user"
              name="user"
              checked={check}
              onChange={() => setCheck(!check)}
            />
            <label>User</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input type="checkbox" value="leader" id="leader" name="leader" />
            <label>Leader</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input
              type="checkbox"
              value="approver"
              id="approver"
              name="approver"
            />
            <label>Approver</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input
              type="checkbox"
              value="hr_admin"
              id="hr_admin"
              name="hr_admin"
            />
            <label>HR Admin</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input
              type="checkbox"
              value="finance_admin"
              id="finance_admin"
              name="finance_admin"
            />
            <label>Finance Admin</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input
              type="checkbox"
              value="pms_admin"
              id="pms_admin"
              name="pms_admin"
            />
            <label>PMS Admin</label>
          </div>
          <div style={{ padding: "10px " }}>
            <input
              type="checkbox"
              value="super_admin"
              id="super_admin"
              name="super_admin"
            />
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
