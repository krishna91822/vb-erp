import { styled } from "@mui/system";

export const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const ContentBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gridColumnGap: 20,
  textTransform: "capitalize",
  color: "textColor.main",
}));

export const ContentTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
}));

export const TitleTypo = styled("div")(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 16,
  fontWeight: 600,
}));
