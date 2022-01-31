import { Box, Container, Typography } from "@mui/material";
import {
  StyledTypography,
  MiniHeadingTypography,
} from "../assets/GlobalStyle/style";
import notFound from "../assets/images/404_error.svg";
const NotFound = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StyledTypography align="center">
              404: The page you are looking for isn’t here
            </StyledTypography>
            <MiniHeadingTypography align="center" sx={{ color: "chocolate" }}>
              You either tried some wrong route or you came here by mistake.
            </MiniHeadingTypography>
            <Box sx={{ textAlign: "center" }}>
              <img
                alt="Under development"
                src={notFound}
                style={{
                  marginTop: 50,
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 560,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
