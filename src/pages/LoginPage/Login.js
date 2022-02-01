import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { validateUser } from "../../store/user-actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import vbLogo from "../../assets/images/vb_logo.svg";
import { MiniHeadingTypography } from "../../assets/GlobalStyle/style";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.user.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("username");
    const password = data.get("password");
    dispatch(validateUser(email, password)).then((res) => {
      res && navigate("/my-profile");
    });
  };

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "130px",
              marginRight: "80px",
              borderRadius: "10px",
              filter: "grayscale(30%)",
            }}
            src={vbLogo}
            alt="vb-logo"
          />
          <MiniHeadingTypography>Log In</MiniHeadingTypography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              //   autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              //   autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
