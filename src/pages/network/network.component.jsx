import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, MenuItem } from "@mui/material";
import { CustomGridBox, TitleTypo, CustomTextField } from "./network.styles";
import { networkText } from "./network.constant";
import { TextField, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Network = ({ history, match }) => {
  const [searchEmp, setSEmp] = useState("");
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/search?", {
        params: {
          name: `${searchEmp}`,
        },
      })
      .then((response) => setEmployees(response.data.data.results));
  }, [searchEmp]);
  const { title, sortOption } = networkText;

  const [sort, setSort] = React.useState("empId");

  const sortHandleChange = (event) => {
    setSort(event.target.value);
  };

  const handleClick = (item) => {
    history.push(`my-profile/${item.empId}`);
  };

  const sortOptions = [...sortOption];

  const searchHandleChange = (event) => {
    setSEmp(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", pt: 3, pb: 3 }}>
      <Container
        sx={{
          minHeight: "calc(100vh - 50px)",
          width: "calc(100% - 48px)",
          border: "2px solid",
          borderColor: "textColor.paletteGrey",
          pb: 3,
        }}
      >
        <Box
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Typography sx={{ mr: 1 }}>Username</Typography>
            <TextField
              onChange={searchHandleChange}
              id="outlined-search"
              label="enter username"
              size="small"
              variant="outlined"
              sx={{ width: "10vw", height: "40px" }}
            />
            <Button>{<SearchIcon fontSize="large" />}</Button>
          </Box>
          <CustomTextField
            label="Sort"
            id="outlined-select-currency"
            select
            value={sort}
            onChange={sortHandleChange}
            sx={{ width: "25%" }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>
        <Box sx={{ width: "100%" }}>
          <CustomGridBox
            sx={{
              height: 60,
              mt: 3,
              mb: 3,
              backgroundColor: "textColor.light",
            }}
          >
            {
              //title of the network table
              title.map((item, i) => (
                <TitleTypo key={i}>{item}</TitleTypo>
              ))
            }
          </CustomGridBox>
          {employees.map((item) => (
            <CustomGridBox
              key={item.empId}
              sx={{
                mt: 1,
                mb: 1,
                height: 40,
              }}
              onClick={(e) => handleClick(item)}
            >
              <TitleTypo>{item.empName}</TitleTypo>
              <TitleTypo>{item.empId}</TitleTypo>
              <TitleTypo>{item.empEmail}</TitleTypo>
              <TitleTypo>{item.empDesignation}</TitleTypo>
              <TitleTypo>{item.empCurrentAddress}</TitleTypo>
              <TitleTypo>{item.empDepartment}</TitleTypo>
            </CustomGridBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Network;
