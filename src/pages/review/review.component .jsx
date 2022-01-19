import React, { useEffect, useState } from "react";
import { StyledTableCell } from "../../assets/GlobalStyle/style";
import { StyledTypography } from "../../assets/GlobalStyle/style";

import {
  CustomGridBox,
  CustomTextField,
  TitleTypo,
  ModalBoxItem,
  ContentTypo,
  ColorButton,
  CustomeContainer,
} from "./review.styles";

import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  Box,
  Grid,
  MenuItem,
  Modal,
  Stack,
  Pagination,
  TextField,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Card,
  CardContent,
  SvgIcon,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { ClearRounded as ClearRoundedIcon } from "@mui/icons-material";
import { reviewText } from "./review.constant";
import ProfileContent from "../../components/templates/profileContent/profileContent.component";

import axiosInstance from "./../../helpers/axiosInstance";

import { useDispatch } from "react-redux";
import { uiActions } from "./../../store/ui-slice";

import "../../assets/styles/ClientListStyles.css";

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
    dispatch(toggleLoader());
    axiosInstance
      .get(
        `/reviews?search=${searchEmp}&sort=${sort},-reqId&page=${paginationInfo.page}&limit=${paginationInfo.limit}`
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
  }, [reviewItemData, sort, paginationInfo.page, searchEmp]);

  const handleClickReviewItem = async (item) => {
    axiosInstance
      .get(`/reviews?reqId=${item.reqId}`)
      .then((response) => {
        setReviewItemData({
          ...response.data.data.reviews[0].employeeDetails,
          _id: response.data.data.reviews[0]._id,
          status: response.data.data.reviews[0].status,
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
    <div className="list-wrapper">
      <StyledTypography>My Reviews</StyledTypography>
      <Card>
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <TextField
                    data-test="Search By Req Name-test"
                    onChange={searchHandleChange}
                    placeholder="Search By Req Name"
                    id="outlined-search"
                    size="small"
                    variant="outlined"
                    sx={{ width: "15vw", height: "40px", mr: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                      //onClick={handelClearSearch}
                    }}
                    variant="outlined"
                  />
                </Box>
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
          <Pagination
            count={paginationInfo.totalPage}
            page={paginationInfo.page}
            onChange={handlePagination}
          />
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
