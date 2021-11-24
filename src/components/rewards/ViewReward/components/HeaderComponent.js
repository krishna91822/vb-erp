import React from "react";
import "../style/searchStyle.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-title">
        <TextField
          onChange={props.getSearchData}
          id="searchbar"
          label="Search Rewards"
        />
      </div>
      <div className="header-sortby">
        <FormControl id="sortby-form">
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select label="sortby">
            <MenuItem>Newest</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Header;
