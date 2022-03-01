import { Button, TextField } from "@mui/material";
import { blue, teal } from "@mui/material/colors";
import { styled } from "@mui/system";

export const BlueButton = styled(Button)({
  color: "#fff",
  backgroundColor: blue[600],
  fontWeight: 600,
  fontSize: 16,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: blue[800],
  },
});

export const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  minHeight: 40,
  p: 4,
};

export const CustomTextField = styled(TextField)({
  padding: "10px",
  width: "100%",
  "& .MuiOutlinedInput-input": {
    fontSize: "16px",
  },
  "& .MuiOutlinedInput-root": {
    height: "40px",
  },
});

export const GreenButton = styled(Button)({
  color: "#fff",
  backgroundColor: teal[400],
  fontWeight: 600,
  fontSize: 16,
  textTransform: "capitalize",
  margin: "0 8px",
  "&:hover": {
    backgroundColor: teal[600],
  },
});
