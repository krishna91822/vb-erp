import React, { useState } from "react";
import "./searchStyle.css";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { filterData, searchData } from "../../store/rewards-actions";
import { Box, InputAdornment, SvgIcon } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

const Header = (props) => {
  const dispatch = useDispatch();

  const getTextFieldData = (e) => {
    if (e.key === "Enter") {
      const data = e.target.value;
      dispatch(searchData(data));
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        onKeyPress={getTextFieldData}
        id="searchbar"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <SearchIcon />
              </SvgIcon>
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
