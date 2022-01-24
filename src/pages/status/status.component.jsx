import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Pagination,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ProfileContent from "./../../components/templates/profileContent/profileContent.component";
import {
  StyledTypography,
  StyledTableCell,
} from "./../../assets/GlobalStyle/style";
import { Search as SearchIcon } from "./../../icons/search";

import {
  TitleTypo,
  CustomGridBox,
  ContentTypo,
  ModalBoxItem,
  NoteTypo,
  CustomTextField,
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
                    // onChange={searchHandleChange}
                    // onKeyPress={searchHandleChange}
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
                      // value={sort}
                      // onChange={handleChange}
                      sx={{ width: "15vw" }}
                    >
                      {statusConstants.sortOption.map((option) => (
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
                  <StyledTableCell align="center">
                    Requester Name
                  </StyledTableCell>
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
                    <StyledTableCell align="center">
                      {item.reqId}
                    </StyledTableCell>
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
    </Box>
  );
};

export default Status;
