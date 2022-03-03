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
} from "@mui/material";
import {
  createUserAccount,
  SetRoles,
  checkEmployeeProfile,
} from "../../store/userAccount-action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [roles, setRoles] = useState([]);
  const location = useLocation();

  const initialState = {
    userDetails: {
      first_name: location.state ? location.state.name : "",
      email: location.state ? location.state.email : "",
      password: "defaultpassword@dontchange",
      role: [],
    },
  };

  // const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

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
          dispatch(checkEmployeeProfile(state.userDetails.email)).then(
            (res) => {
              if (res) {
                navigate("/my-profile");
                dispatch(
                  uiActions.showNotification({
                    status: "success",
                    message:
                      "User created successfull and email sent to user to reset password",
                  })
                );
              } else {
                navigate("/create-profile", {
                  state: {
                    first_name: state.userDetails.first_name,
                    email: state.userDetails.email,
                  },
                });
                dispatch(
                  uiActions.showNotification({
                    status: "success",
                    message: "User created successfull and create user profile",
                  })
                );
              }
            }
          );
        }
      });
    }
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
    setState({
      ...state,
      userDetails: {
        ...state.userDetails,
        first_name: event.target.value,
      },
    });
  };

  const handleUserEmail = (event) => {
    setUseremail(event.target.value);
    setState({
      ...state,
      userDetails: {
        ...state.userDetails,
        email: event.target.value,
      },
    });
  };

  const handleChange = (event) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userAccount.user.length) {
      setRoles(userAccount.user[0].role);
    }
  }, [userAccount.user]);

  const checkEmail = () => {
    const check =
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(valuebound)\.com$/.test(
        useremail
      );
    if (!check) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Only valuebound Domain allow",
        })
      );
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  return (
    <>
      <StyledTypography
        sx={{
          margin: "0 10%",
          padding: "5px 0px",
        }}
      >
        New User
      </StyledTypography>
      <Card sx={{ margin: "0 10%", px: 3 }}>
        <form onSubmit={handleSubmit}>
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
                <Button
                  disabled={disableButton}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
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
              margin: "0 10%",
            }}
          >
            <label style={{ padding: "10px" }}>Name</label>

            <TextField
              required
              id="username"
              name="username"
              value={location.state ? location.state.name : username}
              onChange={handleUsername}
              placeholder="Enter Name"
              size="small"
              style={{ width: "100%" }}
            />
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10%",
            }}
          >
            <label style={{ padding: "10px" }}>Email</label>
            <TextField
              name="useremail"
              type="email"
              id="useremail"
              size="small"
              variant="outlined"
              placeholder="Enter Email Id"
              onBlur={checkEmail}
              value={location.state ? location.state.email : useremail}
              style={{ width: "100%" }}
              onChange={handleUserEmail}
            />
          </CardContent>
          <MiniHeadingTypography sx={{ p: 2 }}>Roles</MiniHeadingTypography>
          <Divider />
          <CardHeader sx={{ padding: "10px" }} subheader="Select Roles" />
          <CardContent sx={{ margin: "0 20%", padding: "10px" }}>
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
