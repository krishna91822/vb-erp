import * as React from "react";
import Box from "@mui/material/Box";
import { createSvgIcon } from "@mui/material/utils";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "./NavBar.css";

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `"calc(1em + ${theme.spacing(4)})"`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const goBack = () => {
  window.history.back();
};
const goforward = () => {
  window.history.forward();
};

export const NavBar = () => {
  return (
    <>
      <div className="NavBar">
        <div className="navigation">
          <div className="homeIcon">
            <Box
              sx={{
                "& > :not(style)": {
                  m: 2,
                },
              }}
            >
              <Link to="/">
                <HomeIcon
                  fontSize="large"
                  sx={{ fontSize: 40 }}
                  color="action"
                />
              </Link>
            </Box>
          </div>
          <div className="arrowIcon">
            <ArrowBackIcon
              sx={{ fontSize: 40 }}
              color="action"
              onClick={goBack}
              onMouseEnter={(e) => {
                e.target.style.background = "grey";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
              }}
            />
            <ArrowForwardIcon
              sx={{ fontSize: 40 }}
              color="action"
              onClick={goforward}
              onMouseEnter={(e) => {
                e.target.style.background = "grey";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
              }}
            />
          </div>
        </div>
        <div className="searchBox">
          <Search
            onChange={() => {
              alert("clicked on search");
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="username"
              inputProps={{ "aria-label": " search" }}
            />
          </Search>
        </div>
      </div>
      <hr className="NavBarSeperator" />
    </>
  );
};
