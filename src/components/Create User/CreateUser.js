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
  Autocomplete,
} from "@mui/material";
import {
  searchEmployees,
  createUserAccount,
  SetRoles,
  getUser,
} from "../../store/userAccount-action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const initialState = {
  userDetails: {
    first_name: "",
    email: "",
    password: "defaultpassword@dontchange",
    role: [],
  },
};

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ userDetails: { ...state.userDetails } });
    if (state.userDetails.role.length === 0) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Please select atleast 1 role",
        })
      );
    } else {
      dispatch(createUserAccount(state.userDetails)).then((res) => {
        if (res) {
          navigate("/my-profile");
          dispatch(
            uiActions.showNotification({
              status: "success",
              message:
                "User created successfull and email sent to user to reset password",
            })
          );
        }
      });
    }
  };
  const handleChange = (event) => {
    if (event.empName) {
      setState({
        ...state,
        userDetails: {
          ...state.userDetails,
          first_name: event.empName,
          email: event.empEmail,
        },
      });
    }

    if (event.target && event.target.name === "roles") {
      let values = [...roles];
      if (roles.includes(event.target.value)) {
        values = values.filter((elem) => elem !== event.target.value);
      } else {
        values.push(event.target.value);
      }
      setRoles(values);
      setState({
        ...state,
        userDetails: {
          ...state.userDetails,
          role: values,
        },
      });
    }
  };

  const userAccount = useSelector((state) => state.createUser);

  useEffect(() => {
    dispatch(SetRoles());
  }, []);

  useEffect(() => {
    if (useremail != "") {
      dispatch(getUser(useremail));
    }
  }, [useremail]);
  useEffect(() => {
    if (userAccount.user.length) {
      setRoles(userAccount.user[0].role);
    }
  }, [userAccount.user]);

  // useEffect(() => {
  //   dispatch(searchEmployees(username));
  // }, [username]);

  const handleUserName = (event, value) => {
    if (event) {
      setUsername(event.target.value);

      setOpen(false);
      if (event.target.value && event.target.value.length > 2) {
        dispatch(searchEmployees(event.target.value));
        setOpen(true);
      }
    }
  };
  const handleOnClick = (event, value) => {
    if (value) {
      handleChange(value);
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
          padding: "5px 0px",
        }}
      >
        New User
      </StyledTypography>
      <Card sx={{ mx: 15, px: 3 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MiniHeadingTypography sx={{ p: 2 }}>
                Account
              </MiniHeadingTypography>
            </Grid>
            <Grid item xs={8}>
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
              // onChange={testing()}
            />
          </CardContent>
          <MiniHeadingTypography sx={{ p: 2 }}>Roles</MiniHeadingTypography>
          <Divider />
          <CardHeader sx={{ padding: "10px" }} subheader="Select Roles:" />

          <CardContent sx={{ mx: 20, padding: "10px" }}>
            <Grid container spacing={1} wrap="wrap">
              {userAccount.roles &&
                userAccount.roles.map((currElem, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      sm={6}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      xs={12}
                    >
                      <FormControlLabel
                        sx={{ textTransform: "capitalize" }}
                        control={<Checkbox color="primary" />}
                        className="hello"
                        label={currElem.replace(/_/g, " ")}
                        value={currElem}
                        checked={roles.includes(currElem)}
                        id={currElem}
                        name="roles"
                        onChange={(event) => {
                          handleChange(event);
                        }}
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
