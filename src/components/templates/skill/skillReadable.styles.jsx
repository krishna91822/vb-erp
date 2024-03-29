import { styled } from "@mui/system";

export const ContentBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridColumnGap: 20,
  textTransform: "capitalize",
  color: "textColor.main",
}));

export const ContentTypo = styled("p")(({ theme }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  marginTop: "1rem",
  marginLeft: "1rem",
  fontWeight: "600",
  lineHeight: "1.5",
  textTransform: "uppercase",
  letterSpacing: "0.3px",
  color: "rgb(55, 65, 81)",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));
export const ContentTypoList = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  fontWeight: "400",
  lineHeight: "1",

  letterSpacing: "0.5px",
  color: "rgb(55, 65, 81)",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));

export const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(1),
}));
