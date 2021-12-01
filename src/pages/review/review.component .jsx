import React, { useEffect, useState } from "react";
import { CustomGridBox, CustomTextField, TitleTypo } from "./review.styles";
import {
  Container,
  Box,
  Button,
  MenuItem,
  List,
  Typography,
} from "@mui/material";
import { reviewText } from "./review.constant";
import ProfileContent from "../../components/templates/profileContent.component";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import axios from "axios";
const Review = () => {
  const { title, sortOption } = reviewText;
  const [state, setState] = useState(false);
  const [revData, setRevData] = useState([]);
  const [data, setData] = useState([]);
  // const [status, setStatus] = useState("pending");
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/reviews")
      .then((response) => setData(response.data));
  }, []);
  const [sort, setSort] = React.useState("empId");
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handleClick = async (item) => {
    const data = await axios.get(`http://localhost:5000/reviews/${item.ReqId}`);
    await setRevData(data.data[0]);
    setState(true);
  };
  const successClicked = () => {
    const body = JSON.stringify({ ...revData, Status: "Accepted" });
    console.log(revData.ReqId);
    console.log(body);

    axios
      .post(`http://localhost:5000/reviews/${revData.ReqId}`, body, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });
    setState(false);
  };
  const rejectedClicked = () => {
    const body = JSON.stringify({ ...revData, Status: "Rejected" });
    console.log(revData.ReqId);
    console.log(body);

    axios
      .post(`http://localhost:5000/reviews/${revData.ReqId}`, body, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      });
    setState(false);
  };
  const list = (revData) => {
    const allEmp = { ...revData };
    return (
      <List>
        <div style={{ textAlign: "end" }}>
          <Button variant="contained" color="success" onClick={successClicked}>
            Approve
          </Button>
          <Button variant="contained" color="error" onClick={rejectedClicked}>
            Reject
          </Button>
        </div>
        <ProfileContent currentEmployee={allEmp} />
      </List>
    );
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
              <TitleTypo>{item.ID}</TitleTypo>
              <TitleTypo>{item.ReqId}</TitleTypo>
              <TitleTypo>{item.ReqName}</TitleTypo>
              <TitleTypo>{item.ReqOn}</TitleTypo>
              <TitleTypo>{item.ReqType}</TitleTypo>
              {item.Status === "Rejected" ? (
                <TitleTypo style={{ color: "red" }}>{item.Status}</TitleTypo>
              ) : item.Status === "Pending" ? (
                <TitleTypo style={{ color: "orange" }}>{item.Status}</TitleTypo>
              ) : (
                <TitleTypo style={{ color: "green" }}>{item.Status}</TitleTypo>
              )}
            </CustomGridBox>
          ))}
        </Box>
      </Container>
      <SwipeableDrawer
        anchor={"bottom"}
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list(revData)}
      </SwipeableDrawer>
    </Box>
  );
};
export default Review;
