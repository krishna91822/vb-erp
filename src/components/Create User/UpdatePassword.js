import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { setUserPassword } from "./../../store/userAccount-action";
import { useNavigate } from "react-router-dom";

const UpdateUserPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.user.user);
  const handleSubmit = (pass) => {
    const password = { password: pass };
    dispatch(setUserPassword(user.id, password));
    navigate("/my-profile");
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
    <form onSubmit={validatePassword}>
      <Card sx={{ mx: 10, mt: 5, p: 3 }}>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            required
            label="Password"
            margin="normal"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Confirm password"
            margin="normal"
            id="confirm_password"
            name="confirm_password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
            variant="outlined"
            autoComplete="none"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button type="submit" color="primary" variant="contained">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default UpdateUserPassword;
