import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const CustomGridBox = styled("div")(({ theme }) => ({
  // width: "calc(100% - 8px)",
  padding: "0 5px",
  wordWrap: "break-word",
  wordBreak: "break-all",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "20% 10% 25% 15% 15% 15%",
  alignItems: "center",
  justifyItems: "start",
  borderRadius: "5px",
  border: "0.1em solid",
  borderColor: theme.palette.textColor.paletteGrey,
}));

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  color: theme.palette.textColor.main,
  fontSize: 16,
  padding: "0 10px",
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
  padding: "0 10px",
  textTransform: "capitalize",
}));

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: "40px",
  },
});

export const CustomContainer = styled("div")({
  // padding: "0.5em",
  height: "calc(100%-60px)",
});
