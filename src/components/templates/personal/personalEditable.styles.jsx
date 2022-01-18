import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  display: "flex",
  alignItems: "center",
}));

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: "35px",
  },
});

export const CustomTextFieldForChip = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "120px",
    height: "35px",
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
  color: theme.palette.textColor.main,
  fontSize: 16,
  fontWeight: 600,
}));
