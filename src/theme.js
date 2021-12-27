import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    textColor: {
      main: "#293845",
      lightDark: "#788896",
      light: "#DFE6ED",
      paletteGrey: grey[500],
    },
  },
});
