import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export default function DescriptionAlerts() {
  const user = useSelector((state) => state.user.user);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <strong>
          {user.name
            ? "Unauthorized Entry!"
            : "Please Log In to access this page!"}
        </strong>
      </Alert>
    </Stack>
  );
}
