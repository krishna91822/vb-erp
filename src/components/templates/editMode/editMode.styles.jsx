import { Switch, Box } from "@mui/material";
import { teal } from "@mui/material/colors";
import { styled } from "@mui/system";

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  color: theme.palette.textColor.main,
  fontSize: 18,
}));

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

export const ModalBoxItem = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "200px",
  weight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#F7F9FA",
  outline: "2px solid #C3CFD9",
  borderRadius: "5px",
  padding: "32px",
});
