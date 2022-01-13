import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "12px",
    fontWeight: "600",
    lineHeight: "1",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: "rgb(55, 65, 81)",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: "400",
    color: "rgb(18 24 40)",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  paddingLeft: "15px",
  fontSize: "2rem",
  lineHeight: "1.375",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,Segoe UI Emoji",
}));

export const MiniHeadingTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  fontSize: "1.5rem",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,Segoe UI Emoji",
}));
