import React, { useState, useEffect } from "react";
import { Box, Modal, Pagination, Typography } from "@mui/material";
import ProfileContent from "./../../components/templates/profileContent/profileContent.component";

import {
  TitleTypo,
  CustomGridBox,
  ContentTypo,
  ModalBoxItem,
  NoteTypo,
} from "./status.styles";
import { statusConstants } from "./status.constant";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import axiosInstance from "../../helpers/axiosInstance";

import CloseIcon from "@mui/icons-material/Close";

const Status = (props) => {
  const { user } = useSelector((state) => state.user);
  const { toggleLoader } = uiActions;
  const dispatch = useDispatch();

  const [reviewData, setReviewData] = useState([]);
  const [reviewItemData, setReviewItemData] = useState({});

  //pagination
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

  useEffect(() => {
    dispatch(toggleLoader());
    axiosInstance
      .get(
        `/reviews?sort=-reqId&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
      )
      .then((response) => {
        dispatch(toggleLoader());
        // setReviewData(response.data.data.reviews);
        setReviewData(
          response.data.data.reviews.filter(
            (el) => el.employeeDetails.empEmail === user.email
          )
        );
        response.data.totalResult < paginationInfo.limit &&
        paginationInfo.page === 1
          ? setPaginationInfo({
              ...paginationInfo,
              totalPage: 1,
            })
          : setPaginationInfo({
              ...paginationInfo,
              totalPage: Math.ceil(
                response.data.totalDocuments / paginationInfo.limit
              ),
            });
      })
      .catch((err) => {
        dispatch(toggleLoader());
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationInfo.page]);

  //modal
  const [openModalForReview, setOpenModalForReview] = useState(false);
  const handleCloseModalForReview = () => {
    setOpenModalForReview(false);
    setReviewItemData({});
  };
  const handleOpenModalForReview = () => setOpenModalForReview(true);

  const handleClickReviewItem = async (item) => {
    setReviewItemData({
      ...item.employeeDetails,
      _id: item._id,
      status: item.status,
      message: item.message,
    });
    handleOpenModalForReview();
  };

  const renderChildStatus = (status) => {
    if (status === "accepted") {
      return (
        <ContentTypo
          sx={{
            backgroundColor: "#2AB3A6",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "16px",
          }}
        >
          {status}
        </ContentTypo>
      );
    } else if (status === "pending") {
      return (
        <ContentTypo
          sx={{
            backgroundColor: "#F7C839",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "16px",
          }}
        >
          {status}
        </ContentTypo>
      );
    } else {
      return (
        <ContentTypo
          sx={{
            backgroundColor: "#D3455B",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "16px",
          }}
        >
          {status}
        </ContentTypo>
      );
    }
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TitleTypo
          sx={{
            fontSize: "1.5em",
            textTransform: "capitalize",
            mb: 0.5,
            mr: 2,
          }}
        >
          {statusConstants.pageTitle}
        </TitleTypo>
      </Box>
      <Box
        sx={{
          padding: "0.5em",
          border: "0.1em solid",
          borderColor: "textColor.paletteGrey",
          borderRadius: "5px",
          pb: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%-1",
            backgroundColor: "textColor.light",
            padding: 1,
            marginTop: 1,
            borderRadius: "5px",
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
              //title of the status table
              statusConstants.tableTitle.map((item, i) => (
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
              <ContentTypo>
                {item.employeeDetails.empReportingManager}
              </ContentTypo>
              <ContentTypo>{item.reqType}</ContentTypo>
              {renderChildStatus(item.status)}
            </CustomGridBox>
          ))}
        </Box>
        {/* pagination */}
        <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
          <Pagination
            data-test="pagination-test"
            count={paginationInfo.totalPage}
            page={paginationInfo.page}
            onChange={handlePagination}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Box>
        <Modal open={openModalForReview} onClose={handleCloseModalForReview}>
          <ModalBoxItem sx={{ height: "auto" }}>
            <Box
              sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {reviewItemData.message && (
                <ContentTypo sx={{ display: "flex", alignItems: "center" }}>
                  <NoteTypo>note:&nbsp;</NoteTypo>
                  {reviewItemData.message}
                </ContentTypo>
              )}
              <CloseIcon
                fontSize="medium"
                onClick={handleCloseModalForReview}
                sx={{ cursor: "pointer" }}
              />
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
    </Box>
  );
};

export default Status;
