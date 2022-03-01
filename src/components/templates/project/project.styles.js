import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  marginLeft: "1rem",
  marginTop: "1rem",
  fontWeight: "600",
  lineHeight: "1",
  letterSpacing: "0.3px",
  textTransform: "uppercase",
  color: "rgb(55, 65, 81)",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  marginTop: "1rem",
  fontWeight: "400",
  lineHeight: "1.5",
  letterSpacing: "0.5px",
  color: "rgb(55, 65, 81)",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));

export const ContentBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gridColumnGap: 20,
  textTransform: "capitalize",
  color: "textColor.main",
}));

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    minHeight: "40px",
  },
});
