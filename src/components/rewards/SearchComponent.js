import React, { useState } from "react";
import "./searchStyle.css";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { searchData } from "../../store/rewards-actions";
import { Box, InputAdornment, SvgIcon, IconButton } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

import { ClearRounded as ClearRoundedIcon } from "@mui/icons-material";

const Header = (props) => {
  const dispatch = useDispatch();

  const getTextFieldData = (e) => {
    if (e.key === "Enter") {
      const data = e.target.value;
      dispatch(searchData(data));
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handelClearSearch = () => {
    setSearchTerm("");
    dispatch(searchData(""));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        onKeyPress={getTextFieldData}
        onChange={handleSearch}
        id="searchbar"
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handelClearSearch}>
                <ClearRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Search rewards"
        variant="outlined"
      />
    </Box>
  );
};

export default Header;
