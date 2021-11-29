import { Container, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { blue, teal } from "@mui/material/colors";

export const BoxStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const ContainerStyleTop = styled(Container)(({ theme }) => ({
  minHeight: "40px",
  width: "100%",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
}));

export const ContainerStyle = styled(Container)(({ theme }) => ({
  minHeight: "calc(100vh - 50px)",
  width: "calc(100% - 48px)",
  border: "2px solid",
  borderColor: theme.palette.textColor.paletteGrey,
}));

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

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  color: theme.palette.textColor.main,
  fontSize: 18,
}));

export const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
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
