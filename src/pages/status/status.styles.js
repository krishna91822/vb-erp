import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: "40px",
  },
});

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  color: theme.palette.textColor.main,
  fontSize: 16,
}));

export const CustomGridBox = styled("div")(({ theme }) => ({
  width: "calc(100% - 8px)",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "70px repeat(5,calc((100% - 70px)/5))",
  alignItems: "center",
  justifyItems: "center",
  textTransform: "capitalize",
  borderColor: theme.palette.textColor.paletteGrey,
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
  textTransform: "capitalize",
}));
export const NoteTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
  fontWeight: 600,
  textTransform: "capitalize",
}));

export const ModalBoxItem = styled(Box)({
  width: "80vw",
  height: "80vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  outline: "2px solid #C3CFD9",
  borderRadius: "5px",
  padding: "20px",
  paddingTop: "10px",
});
