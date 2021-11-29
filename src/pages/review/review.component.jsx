import React, { useState } from "react";
import { CustomGridBox, CustomTextField, TitleTypo } from "./review.styles";
import { Container, Box, MenuItem, Typography } from "@mui/material";
import { reviewText } from "./review.constant";
import axios from "axios";

const Review = () => {
  const { title, sortOption } = reviewText;
  const [data, setData] = useState([]);
  axios
    .get("http://localhost:5000/request")
    .then((response) => response.json())
    .then((data) => setData(data));

  const [sort, setSort] = React.useState("empId");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleClick = (item) => {};

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
        <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
          User - Admin/Approver{" "}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <TitleTypo sx={{ textTransform: "capitalize", mb: 0.5 }}>
            My Reviews
          </TitleTypo>
          <CustomTextField
            label="Sort"
            id="outlined-select-currency"
            select
            value={sort}
            onChange={handleChange}
            sx={{ width: "15%" }}
          >
            {sortOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>
        <Box
          sx={{
            width: "100%-1",
            backgroundColor: "textColor.light",
            padding: 1,
          }}
        >
          <CustomGridBox
            sx={{
              height: 50,
              backgroundColor: "white",
            }}
          >
            {
              //title of the network table
              title.map((item, i) => (
                <TitleTypo key={i}>{item}</TitleTypo>
              ))
            }
          </CustomGridBox>
          {data.map((item) => (
            <CustomGridBox
              key={item.empId}
              sx={{
                mt: 1,
                mb: 1,
                height: 40,
              }}
              onClick={(e) => handleClick(item)}
            >
              <TitleTypo>{item.id}</TitleTypo>
              <TitleTypo>{item.id}</TitleTypo>
              <TitleTypo>{item.requesterName}</TitleTypo>
              <TitleTypo>{item.requestedOn}</TitleTypo>
              <TitleTypo>{item.requestType}</TitleTypo>
              <TitleTypo>{item.requestStatus}</TitleTypo>
            </CustomGridBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Review;
