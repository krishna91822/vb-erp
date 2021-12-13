import React, { useEffect, useState } from "react";

import {
  CustomGridBox,
  CustomTextField,
  TitleTypo,
  ModalBoxItem,
  ContentTypo,
  ColorButton,
} from "./review.styles";

import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  Box,
  MenuItem,
  Modal,
  Pagination,
  TextField,
} from "@mui/material";

import { reviewText } from "./review.constant";
import ProfileContent from "../../components/templates/profileContent/profileContent.component";

import axiosInstance from "./../../helpers/axiosInstance";

const Review = () => {
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

  const searchHandleChange = (event) => {
    setSearchEmp(event.target.value);
  };

  //modal
  const [openModalForReview, setOpenModalForReview] = useState(false);
  const handleCloseModalForReview = () => {
    setOpenModalForReview(false);
    setReviewItemData({});
  };
  const handleOpenModalForReview = () => setOpenModalForReview(true);

  useEffect(() => {
    axiosInstance
      .get(
        `/reviews?search=${searchEmp}&sort=${sort},-reqId&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
      )
      .then((response) => {
        setReviewData(response.data.reviews);

        response.results < paginationInfo.limit && paginationInfo.page === 1
          ? setPaginationInfo({
              ...paginationInfo,
              totalPage: 1,
            })
          : setPaginationInfo({
              ...paginationInfo,
              totalPage: Math.ceil(
                response.totalDocuments / paginationInfo.limit
              ),
            });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewItemData, sort, paginationInfo.page, searchEmp]);

  const handleClickReviewItem = async (item) => {
    axiosInstance
      .get(`/reviews?reqId=${item.reqId}`)
      .then((response) => {
        setReviewItemData({
          ...response.data.reviews[0].employeeDetails,
          _id: response.data.reviews[0]._id,
          status: response.data.reviews[0].status,
        });
        handleOpenModalForReview();
      })
      .catch((err) => console.log(err));
  };

  const handleReject = () => {
    axiosInstance
      .patch(`/reviews/${reviewItemData._id}`, {
        status: "rejected",
      })
      .then((response) => {
        handleCloseModalForReview();
      })
      .catch((err) => console.log(err, reviewItemData._id));
  };

  const handleApprove = () => {
    axiosInstance
      .patch(`/reviews/${reviewItemData._id}`, {
        status: "accepted",
      })
      .then((response) => {
        handleCloseModalForReview();
      })
      .catch((err) => console.log(err, reviewItemData._id));
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const renderChildStatus = (status) => {
    if (status === "accepted") {
      return <ContentTypo sx={{ color: "#2AB3A6" }}>{status}</ContentTypo>;
    } else if (status === "pending") {
      return <ContentTypo sx={{ color: "#F7C839" }}>{status}</ContentTypo>;
    } else {
      return <ContentTypo sx={{ color: "#D3455B" }}>{status}</ContentTypo>;
    }
  };

  return (
    <Box sx={{ width: "100%", pt: 3, pb: 3 }}>
      <Container
        sx={{
          minHeight: "60vh",
          width: "calc(100% - 48px)",
          border: "2px solid",
          borderColor: "textColor.paletteGrey",
          pb: 3,
          position: "relative",
        }}
      >
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
          <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
            <TitleTypo sx={{ textTransform: "capitalize", mb: 0.5, mr: 2 }}>
              My Reviews
            </TitleTypo>
            <TextField
              onChange={searchHandleChange}
              placeholder="Search By Req Name"
              id="outlined-search"
              size="small"
              variant="outlined"
              sx={{ width: "30%", height: "40px" }}
            />
          </Box>
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
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            {
              //title of the review table
              title.map((item, i) => (
                <TitleTypo key={i} sx={{ textTransform: "capitalize" }}>
                  {item}
                </TitleTypo>
              ))
            }
          </CustomGridBox>
          {reviewData.map((item) => (
            <CustomGridBox
              key={item.reqId}
              sx={{
                mt: 1,
                mb: 1,
                height: 40,
                cursor: "pointer",
              }}
              onClick={(e) => handleClickReviewItem(item)}
            >
              <ContentTypo>{item.reqId}</ContentTypo>
              <ContentTypo>{item.reqName}</ContentTypo>
              <ContentTypo>
                {new Date(item.createdAt).toISOString().slice(0, 10)}
              </ContentTypo>
              <ContentTypo>{item.reqType}</ContentTypo>
              {renderChildStatus(item.status)}
            </CustomGridBox>
          ))}
        </Box>
        {/* pagination */}
        <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={paginationInfo.totalPage}
            page={paginationInfo.page}
            onChange={handlePagination}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Box>
      </Container>
      <Modal open={openModalForReview} onClose={handleCloseModalForReview}>
        <ModalBoxItem>
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
          <Box sx={{ width: 1, display: "flex", justifyContent: "flex-end" }}>
            {reviewItemData.status === "rejected" ||
            reviewItemData.status === "accepted" ? (
              <ColorButton
                disabled
                size="medium"
                variant="contained"
                // color='hsl(350.7,61.7%,54.9%)'
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
              <ColorButton
                size="medium"
                variant="contained"
                // color='hsl(350.7,61.7%,54.9%)'
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
            )}
            {reviewItemData.status === "accepted" ? (
              <ColorButton
                disabled
                size="medium"
                variant="contained"
                // color='#1AAE9F'
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
              <ColorButton
                size="medium"
                variant="contained"
                // color='#1AAE9F'
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
            )}
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
            }}
          >
            <ProfileContent currentEmployee={reviewItemData} />
          </Box>
        </ModalBoxItem>
      </Modal>
    </Box>
  );
};
export default Review;
