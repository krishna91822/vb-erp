import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const CustomGridBox = styled("div")(({ theme }) => ({
  width: "calc(100% - 8px)",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(6,1fr)",
  alignItems: "center",
  justifyItems: "center",

  border: "2px solid",
  borderColor: theme.palette.textColor.paletteGrey,
}));

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  color: theme.palette.textColor.main,
  fontSize: 16,
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "capitalize",
}));

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: "40px",
  },
});
