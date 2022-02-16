import { styled } from "@mui/system";
import { Tabs, Tab, Switch } from "@mui/material";

import {
  deepPurple,
  pink,
  purple,
  blue,
  teal,
  amber,
  deepOrange,
} from "@mui/material/colors";

//custom components for typograpphy
export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  fontWeight: "600",
  lineHeight: "1",
  letterSpacing: "0.3px",
  textTransform: "uppercase",
  color: "rgb(55, 65, 81)",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));

export const SubTitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 13,
}));

export const ContentTypo = styled("div")(({ theme, isEmail }) => ({
  ...theme.typography.h5,
  fontSize: 13,
  fontWeight: "400",
  lineHeight: "1",
  letterSpacing: "0.5px",
  color: "rgb(55, 65, 81)",
  textTransform: isEmail ? "none" : "inherit",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));

export const ContentBoldTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 13,
  fontWeight: 600,
}));

export const ProfileNameTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  fontSize: "1.5rem",
  lineHeight: 1.375,
  textTransform: "capitalize",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  color: "rgb(18, 24, 40)",
}));

export const ProfileFirstLetter = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 400,
  fontSize: "1.5rem",
  color: "white",
  textTransform: "capitalize",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
}));

//custom components for tabs
export const StyledTabs = styled(Tabs)(({ theme }) => ({
  ".MuiTabs-flexContainer": {
    justifyContent: "center",
  },
  ".MuiTabs-indicator": {
    backgroundColor: "chocolate",
    height: 3,
    width: "80%",
  },
}));

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "capitalize",
    color: theme.palette.textColor.main,
    fontSize: 14,
    fontWeight: "600",
    "&.Mui-selected": {
      color: "chocolate",
    },
    "&.MuiTab-root": {
      minWidth: "200px",
    },
  })
);

export const StyledGrid = styled("div")(({ theme }) => ({
  ...theme.grid,
  gridtemplateColumns: "1fr",
  gridTemplateRows: "100vh",
  alignItems: "center",
  justifyItems: "center",
}));

//get random color
const colours = [
  deepPurple[500],
  purple[500],
  pink[500],
  amber[500],
  deepOrange[500],
  teal[500],
  blue[500],
];
export const getColour = () =>
  colours[Math.floor(Math.random() * colours.length)];

//custom switch
export const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 1,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(23px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: teal[500],
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "teal[500]",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
