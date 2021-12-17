import React, { useState } from "react";
import "./searchStyle.css";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { filterData, searchData } from "../../store/rewards-actions";

const Header = (props) => {
  const currencies = [
    {
      value: "Default",
      label: "Default",
    },
    {
      value: "Stopped",
      label: "Stopped",
    },
    {
      value: "In Progress",
      label: "In Progress",
    },

    {
      value: "Created",
      label: "Created",
    },
  ];

  const [currency, setCurrency] = useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
    const filterValue = event.target.value;
    dispatch(filterData(filterValue));
  };

  const dispatch = useDispatch();

  const getTextFieldData = (e) => {
    if (e.key === "Enter") {
      const data = e.target.value;
      dispatch(searchData(data));
    }
  };

  return (
    <div className="header">
      <div className="header-title">
        <TextField
          onKeyPress={getTextFieldData}
          id="searchbar"
          label="Search Rewards"
        />
      </div>

      <div className="header-sortby">
        <TextField
          id="outlined-select-currency"
          select
          label="Status"
          value={currency}
          onChange={handleChange}
          className="filter-dropdown"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default Header;
