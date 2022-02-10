import {
  Settings,
  Logout,
  LoginRounded as LoginRoundedIcon,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";

import {
  createTheme,
  ThemeProvider,
  Typography,
  IconButton,
  useMediaQuery,
  Divider,
  ListItemIcon,
  Avatar,
  MenuItem,
  Menu,
  AppBar,
  Toolbar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/user-actions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.user);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

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
    toolbar: {
      display: "flex",
      height: "70px",
      justifyContent: "flex-end",
      padding: "0 40px",
    },
    appbar: {
      backgroundColor: "white",
      position: "fixed",
      width: lgUp ? "calc(100% - 250px)" : "calc(100% - 50px)",
      left: lgUp ? "250px" : "50px",
      zIndex: 1000,
    },
  };

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
    dispatch(logoutUser()).then((res) => {
      res && navigate("/");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={customStyles.appbar} position="static">
        <Toolbar sx={customStyles.toolbar}>
          {user.name ? (
            <>
              <IconButton
                size="large"
                edge="end"
                onClick={handleClick}
                disableRipple
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <PersonIcon
                  sx={{
                    fontSize: "2rem",
                    paddingRight: "5px",
                    color: "rgb(17,24,39)",
                  }}
                />
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {user.name}
                </Typography>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.05))",
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
                {users.permissions.includes("view_admin_panel") && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/createuserprofile"
                  >
                    <ListItemIcon>
                      <AdminPanelSettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={"/settings"}
                >
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
