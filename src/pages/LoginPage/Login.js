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
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";

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
  const responseGoogle = (response) => {
    dispatch(validateUser("", " ", response.tokenObj.id_token)).then((res) => {
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <h4 style={{ textAlign: "center", paddingBottom: "7px" }}>OR</h4>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID_WEBSITE}
              render={(renderProps) => (
                <GoogleButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    paddingRight: "24px",
                  }}
                  label="Log In With Google"
                />
              )}
              buttonText="Login WIth Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
