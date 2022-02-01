import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "80%",
    height: "40px",
  },
});

export const ContentBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "1fr 2fr",
  gridColumnGap: 20,
  textTransform: "capitalize",
  color: "textColor.main",
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  marginTop: "1rem",
  marginLeft: "1rem",
  fontWeight: "600",
  lineHeight: "1",
  textTransform: "uppercase",
  letterSpacing: "0.3px",
  color: "rgb(55, 65, 81)",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));
