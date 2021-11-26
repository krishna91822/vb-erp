import React from "react";
import "./searchStyle.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { getSearchData } from "../../store/rewards-slice";

const Header = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <div className="header-title">
        <TextField
          onChange={(e) => dispatch(getSearchData(e.target.value))}
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
