import React, { useEffect, useState, useRef } from "react";
import {
  StyledTableCell,
  StyledTableCell2,
} from "../../assets/GlobalStyle/style";
import { StyledTypography } from "../../assets/GlobalStyle/style";

import {
  CustomTextField,
  ModalBoxItem,
  ContentTypo,
  ColorButton,
} from "./review.styles";

import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Grid,
  MenuItem,
  Modal,
  Button,
  Stack,
  Pagination,
  TextField,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Card,
  CardContent,
  SvgIcon,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
// eslint-disable-next-line no-unused-vars
import { reviewText } from "./review.constant";
import ProfileContent from "../../components/templates/profileContent/profileContent.component";

import axiosInstance from "./../../helpers/axiosInstance";

import { useDispatch } from "react-redux";
import { uiActions } from "./../../store/ui-slice";

import "../../assets/GlobalStyle/TableStyles.css";

const Review = () => {
  const { toggleLoader } = uiActions;
  const dispatch = useDispatch();
  const { title, sortOption } = reviewText;

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    limit: 10,
    totalPage: 0,
  });
  const handlePagination = (event, value) => {
    setPaginationInfo({
      ...paginationInfo,
      page: value,
    });
  };

  const [searchEmp, setSearchEmp] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [reviewItemData, setReviewItemData] = useState({});

  const [sort, setSort] = useState("reqId");
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const searchHandleChange = (event) => {
    const searchFileds = event.target.value;
    if (event.key === "Enter") {
      setSearchEmp(searchFileds);
    }
  };

  //modal
  const [openModalForReview, setOpenModalForReview] = useState(false);
  const handleCloseModalForReview = () => {
    setOpenModalForReview(false);
    setReviewItemData({});
  };
  const handleOpenModalForReview = () => setOpenModalForReview(true);

  useEffect(() => {
    dispatch(toggleLoader());
    axiosInstance
      .get(
        `/reviews?search=${searchEmp}&sort=${sort},-reqId&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
      )
      .then((response) => {
        dispatch(toggleLoader());
        setReviewData(response.data.data.reviews);
        setPaginationInfo({
          ...paginationInfo,
          totalPage: Math.ceil(response.data.totalCount / paginationInfo.limit),
        });
      })
      .catch((err) => {
        dispatch(toggleLoader());
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewItemData, sort, paginationInfo.page, searchEmp]);

  const handleClickReviewItem = async (item) => {
    axiosInstance
      .get(`/reviews?reqId=${item.reqId}`)
      .then((response) => {
        setReviewItemData({
          ...item.employeeDetails,
          _id: item._id,
          status: item.status,
          message: item.message,
        });
        handleOpenModalForReview();
      })
      .catch((err) => console.log(err));
  };

  const reviewMessage = useRef("");
  const handleReviewMessage = (event) => {
    reviewMessage.current = event.target.value;
  };

  const handleReject = () => {
    console.log(reviewMessage.current);
    axiosInstance
      .patch(`/reviews/${reviewItemData._id}`, {
        status: "rejected",
        message: reviewMessage.current,
      })
      .then((response) => {
        handleCloseModalForReview();
      })
      .catch((err) => console.log(err, reviewItemData._id));
  };

  const handleApprove = () => {
    console.log(reviewMessage.current);
    axiosInstance
      .patch(`/reviews/${reviewItemData._id}`, {
        status: "accepted",
        message: reviewMessage.current,
      })
      .then((response) => {
        handleCloseModalForReview();
      })
      .catch((err) => console.log(err, reviewItemData._id));
  };

  const renderChildStatus = (status) => {
    if (status === "accepted") {
      return (
        <ContentTypo
          sx={{
            color: "#2AB3A6",
            fontWeight: "bold",
          }}
        >
          {status}
        </ContentTypo>
      );
    } else if (status === "pending") {
      return (
        <ContentTypo
          sx={{
            color: "#F7C839",
            fontWeight: "bold",
          }}
        >
          {status}
        </ContentTypo>
      );
    } else {
      return (
        <ContentTypo
          sx={{
            color: "#D3455B",
            fontWeight: "bold",
          }}
        >
          {status}
        </ContentTypo>
      );
    }
  };

  return (
    <div className="list-wrapper">
      <StyledTypography>My Reviews</StyledTypography>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  data-test="Search By Req Name-test"
                  fullWidth
                  onChange={searchHandleChange}
                  onKeyPress={searchHandleChange}
                  placeholder="Search By Req Name"
                  id="outlined-search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={8}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Box m={1}>
                  <CustomTextField
                    data-test="Sort-test"
                    label="Sort"
                    id="outlined-select-currency"
                    select
                    value={sort}
                    onChange={handleChange}
                    sx={{ width: "15vw" }}
                  >
                    {sortOption.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <div className="ListContainer">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <StyledTableCell align="center">Req Id</StyledTableCell>
                <StyledTableCell align="center">Requester Name</StyledTableCell>
                <StyledTableCell align="center">Requested on</StyledTableCell>
                <StyledTableCell align="center">Reporting to</StyledTableCell>
                <StyledTableCell align="center">Request type</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reviewData.map((item) => (
                <TableRow
                  className="table-row"
                  key={item.reqId}
                  onClick={(e) => handleClickReviewItem(item)}
                >
                  <StyledTableCell2 align="center">
                    {item.reqId}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {item.reqName}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {new Date(item.createdAt).toISOString().slice(0, 10)}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {item.employeeDetails.empReportingManager}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {item.reqType}
                  </StyledTableCell2>
                  <StyledTableCell2 align="center">
                    {renderChildStatus(item.status)}
                  </StyledTableCell2>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          {paginationInfo.totalPage > 1 && (
            <Pagination
              count={paginationInfo.totalPage}
              page={paginationInfo.page}
              onChange={handlePagination}
            />
          )}
        </Stack>
      </div>
      <Modal open={openModalForReview} onClose={handleCloseModalForReview}>
        <ModalBoxItem sx={{ height: "auto" }}>
          <Box
            sx={{
              width: 1,
              textAlign: "end",
            }}
          >
            <CloseIcon
              fontSize="medium"
              onClick={handleCloseModalForReview}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItem: "center",
            }}
          >
            <Box sx={{ width: "60%", display: "flex", alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="Any Message"
                onChange={(event) => handleReviewMessage(event)}
                fullWidth
              />
            </Box>
            <Box>
              {reviewItemData.status === "rejected" ||
              reviewItemData.status === "accepted" ? (
                <ColorButton
                  disabled
                  size="medium"
                  variant="contained"
                  onClick={handleReject}
                  sx={{
                    m: 1,
                    backgroundColor: "hsl(350.7,61.7%,54.9%)",
                    "&:hover": {
                      backgroundColor: "hsl(350.7,61.7%,45.9%)",
                    },
                  }}
                >
                  Reject
                </ColorButton>
              ) : (
                <Button
                  sx={{ marginRight: "1rem" }}
                  color="error"
                  variant="contained"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              )}
              {reviewItemData.status === "accepted" ? (
                <ColorButton
                  disabled
                  size="medium"
                  variant="contained"
                  onClick={handleApprove}
                  sx={{
                    m: 1,
                    backgroundColor: "#1AAE9F",
                    "&:hover": {
                      backgroundColor: "hsl(173.9,74%,30%)",
                    },
                  }}
                >
                  Approve
                </ColorButton>
              ) : (
                <Button variant="contained" onClick={handleApprove}>
                  Approve
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: 1,
              height: "calc( 80vh - 90px )",
              overflowY: "scroll",
              outline: "1px solid",
              outlineColor: "#9e9e9e",
              borderRadius: "5px",
              mt: 1,
              backgroundColor: "rgb(249, 250, 252)",
            }}
          >
            <ProfileContent currentEmployee={reviewItemData} />
          </Box>
        </ModalBoxItem>
      </Modal>
    </div>
  );
};
export default Review;
