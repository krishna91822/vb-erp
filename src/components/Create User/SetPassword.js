import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import {
  setUserPassword,
  getUserDetails,
} from "../../store/userAccount-action";
import vbLogo from "../../assets/images/vb_logo.svg";
import { MiniHeadingTypography } from "../../assets/GlobalStyle/style";

export default function SetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  let { id } = useParams();

  const userDetails = useSelector((state) => state.createUser);

  useEffect(() => {
    dispatch(getUserDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (pass) => {
    const password = { password: pass };
    dispatch(setUserPassword(id, password));
    navigate("/");
  };

  const validatePassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirm_password");
    if (password === confirmPassword) {
      handleSubmit(password);
    } else {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Password and confirm password does not match",
        })
      );
    }
  };

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "130px",
              marginRight: "80px",
              borderRadius: "10px",
              filter: "grayscale(30%)",
            }}
            src={vbLogo}
            alt="vb-logo"
          />

          {userDetails.userDetails ? (
            <MiniHeadingTypography sx={{ textTransform: "capitalize" }}>
              {`Hi ${userDetails.userDetails.first_name}`}
            </MiniHeadingTypography>
          ) : (
            <MiniHeadingTypography sx={{ textTransform: "capitalize" }}>
              {`Hi ----------`}
            </MiniHeadingTypography>
          )}

          <Box component="form" onSubmit={validatePassword} noValidate>
            <TextField
              margin="normal"
              required
              type="password"
              fullWidth
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              id="confirm_password"
              value={confirmPassword}
              autoComplete="none"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                textTransform: "capitalize",
                mt: 3,
                mb: 2,
              }}
            >
              Set Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
