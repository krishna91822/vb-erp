import React, { useState, useEffect } from "react";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../../assets/GlobalStyle/style";
import {
  TextField,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";
import {
  searchEmployees,
  createUserAccount,
  SetRoles,
} from "../../store/userAccount-action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [open, setOpen] = useState(false);
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
    if (userDetail.role.length === 0) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Please select atleast 1 role",
        })
      );
    } else {
      dispatch(createUserAccount(userDetail));
      navigate("/my-profile");
      setUsername("");
      setUseremail("");
    }
  };
  const userAccount = useSelector((state) => state.createUser);

  useEffect(() => {
    dispatch(SetRoles());
  }, []);

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
      <StyledTypography
        sx={{
          mx: 15,
          px: 3,
        }}
      >
        New User
      </StyledTypography>
      <Card sx={{ mx: 15, px: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MiniHeadingTypography sx={{ p: 2 }}>Account</MiniHeadingTypography>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 100px",
            }}
          >
            <label style={{ padding: "10px " }}>Name:</label>
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
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 100px",
            }}
          >
            <label style={{ padding: "10px " }}>Email:</label>
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
          </CardContent>
          <MiniHeadingTypography sx={{ p: 2 }}>Roles</MiniHeadingTypography>
          <Divider />
          <CardHeader sx={{ padding: "10px" }} subheader="Select Roles:" />

          <CardContent sx={{ mx: 20, padding: "10px" }}>
            <Grid container spacing={1} wrap="wrap">
              {userAccount.roles &&
                userAccount.roles.map((currElem) => {
                  return (
                    <Grid
                      item
                      sm={6}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      xs={12}
                    >
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label={currElem.replace(/_/g, " ")}
                        value={currElem}
                        id={currElem}
                        name={currElem}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </CardContent>
          <Divider />
        </form>
      </Card>
    </>
  );
};

export default CreateUser;
