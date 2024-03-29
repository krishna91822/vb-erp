import { TextField, Box } from "@mui/material";
import { styled } from "@mui/system";

export const CustomTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-input": {
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: "35px",
  },
});

export const ContentBoldTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.paletteGrey,
  fontSize: 16,
  fontWeight: 600,
}));

export const FieldBox = styled(Box)({
  width: "100%",
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "30% 70%",
  gridTemplateRows: "50px",
});

export const CustomGridBox = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "80px",
  display: "grid",
  gridTemplateRows: "repeat(3,50px)",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
}));
