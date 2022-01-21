import React, { useState, useEffect } from "react";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import { TextField, Grid, Button, Autocomplete } from "@mui/material";
import {
  searchEmployees,
  createUserAccount,
} from "../../store/userAccount-action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userDetail = {};
    userDetail.first_name = data.get("username").split(" (")[0];
    userDetail.email = useremail;
    userDetail.role = [];
    data.get("user") && userDetail.role.push(data.get("user"));
    data.get("leader") && userDetail.role.push(data.get("leader"));
    data.get("approver") && userDetail.role.push(data.get("approver"));
    data.get("hr_admin") && userDetail.role.push(data.get("hr_admin"));
    data.get("finance_admin") &&
      userDetail.role.push(data.get("finance_admin"));
    data.get("pms_admin") && userDetail.role.push(data.get("pms_admin"));
    data.get("super_admin") && userDetail.role.push(data.get("super_admin"));
    userDetail.password = "qwerty123";
    // console.log(userDetail);
    dispatch(createUserAccount(userDetail));
    navigate("/my-profile");
    setUsername("");
    setUseremail("");
    setCheck(false);
  };
  const userAccount = useSelector((state) => state.createUser);
  useEffect(() => {
    dispatch(searchEmployees(username));
  }, [username]);

  const handleUserName = (event, value) => {
    if (event) {
      setUsername(event.target.value);
      setOpen(false);
      if (event.target.value && event.target.value.length > 2) {
        setOpen(true);
      }
    }
  };
  const handleOnClick = (event, value) => {
    if (value) {
      setUsername(value.empName);
      setUseremail(value.empEmail);
      setOpen(false);
    }
    setUsername("");
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
          <Autocomplete
            size="small"
            onBlur={() => {
              setUsername("");
              setOpen(false);
            }}
            onInputChange={handleUserName}
            getOptionLabel={(option) => `${option.empName} (${option.empId})`}
            onChange={handleOnClick}
            options={userAccount.employees}
            open={open}
            style={{ width: "100%" }}
            inputValue={
              userAccount.employees ? userAccount.employees.empName : username
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                id="username"
                name="username"
                value={
                  userAccount.employees
                    ? userAccount.employees.empName
                    : username
                }
                placeholder="Enter Name"
              />
            )}
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
            disabled
            id="useremail"
            size="small"
            variant="outlined"
            placeholder="Enter Email Id"
            value={useremail}
            style={{ width: "100%" }}
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
            sx={{
              backgroundColor: "chocolate",
              ":hover": {
                background: "chocolate",
              },
            }}
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
