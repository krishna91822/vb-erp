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
import { useDispatch } from "react-redux";

const UpdateUserPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (pass) => {
    const password = { password: pass };
    // dispatch(setUserPassword(id, password));
    // navigate("/");
    alert(pass);
  };

  const validatePassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirm_password");
    password === confirmPassword
      ? handleSubmit(password)
      : dispatch(
          uiActions.showNotification({
            status: "error",
            message: "password not match with confirm password",
          })
        );
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
