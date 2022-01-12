import {
  AccountCircle,
  Settings,
  Logout,
  LoginRounded as LoginRoundedIcon,
} from "@mui/icons-material";
import vbLogo from "../../assets/images/vb_logo.svg";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "inset  0 -10px 3px -10px grey",
        },
      },
    },
  },
});

const customStyles = {
  image: {
    width: "180px",
    visibility: "hidden",
  },
  toolbar: {
    display: "flex",
    height: "70px",
    justifyContent: "space-between",
    padding: "0 40px",
  },
  appbar: {
    backgroundColor: "white",
    position: "fixed",
    width: "calc(100% - 232px)",
    left: "232px",
    // zIndex: 1000,
  },
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(userActions.resetForm());
    handleClose();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={customStyles.appbar} position="static">
        <Toolbar sx={customStyles.toolbar}>
          <img style={customStyles.image} src={vbLogo} alt="vb-logo" />
          {user.name ? (
            <>
              <IconButton size="large" edge="end" onClick={handleClick}>
                <AccountCircle fontSize="large" />
                <Typography variant="h6">{user.name}</Typography>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 0,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/my-profile"
                >
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton size="medium" edge="end" component={Link} to="/">
              <LoginRoundedIcon fontSize="large" />
              Log In
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
