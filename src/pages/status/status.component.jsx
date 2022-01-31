import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Pagination,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Stack,
} from "@mui/material";
import ProfileContent from "./../../components/templates/profileContent/profileContent.component";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import {
  TitleTypo,
  ContentTypo,
  ModalBoxItem,
  NoteTypo,
} from "./status.styles";
import { statusConstants } from "./status.constant";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import axiosInstance from "../../helpers/axiosInstance";

import CloseIcon from "@mui/icons-material/Close";
import "./../../assets/GlobalStyle/TableStyles.css";
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
        `/reviews?sort=-reqId&reqEmail=${user.email}&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
      )
      .then((response) => {
        dispatch(toggleLoader());
        setReviewData(response.data.data.reviews);
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

      <div className="ListContainer">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                {
                  //title of the status table
                  statusConstants.tableTitle.map((item, i) => (
                    <StyledTableCell align="center" key={i}>
                      {item}
                    </StyledTableCell>
                  ))
                }
              </TableRow>
            </TableHead>

            <TableBody>
              {reviewData.map((item) => (
                <TableRow
                  className="table-row"
                  key={item.reqId}
                  onClick={(e) => handleClickReviewItem(item)}
                >
                  <StyledTableCell align="center">{item.reqId}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.reqName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(item.createdAt).toISOString().slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.employeeDetails.empReportingManager}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.reqType}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {renderChildStatus(item.status)}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* pagination */}

      <div className="pagination">
        <Stack spacing={2}>
          {paginationInfo.page > 1 && (
            <Pagination
              data-test="pagination-test"
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

export default Status;
