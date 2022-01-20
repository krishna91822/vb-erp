import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
  fontWeight: 600,
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
}));

export const ContentBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  alignItems: "center",
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
