import React from "react";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "900px",
  height: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 3,
  ".css-ag7rrr-MuiTypography-root": {
    lineHeight: "1",
  },
};

export default function BenchModal({
  modalDetails,
  setModalDetails,
  entryData,
}) {
  const onCloseHandle = () => {
    setModalDetails(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalDetails}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalDetails}>
          <Box sx={style}>
            <CloseIcon
              variant="contained"
              onClick={onCloseHandle}
              style={{
                color: "black",
                cursor: "pointer",
                position: "absolute",
                right: "5px",
                top: "5px",
              }}
            />
            <ul>
              <Typography component={"div"} variant="h5">
                <span
                  style={{
                    color: "black",
                    fontSize: "26px",
                    textTransform: "capitalize",
                    lineHeight: "0.8",
                  }}
                >
                  {entryData.empName}
                </span>
              </Typography>
              <Typography component={"div"}>
                <span
                  style={{
                    color: "gray",
                    fontSize: "14px",
                    padding: "0 3px",
                  }}
                >
                  Emp ID:{entryData.empId}
                </span>
              </Typography>
              {entryData.projects &&
                (entryData.projects.length > 0 ? (
                  entryData.projects.map((currElem, index) => (
                    <div key={index} style={{ padding: "20px" }}>
                      <Typography component={"span"}>
                        <li style={{ fontSize: "20px" }}>
                          <span style={{ textTransform: "capitalize" }}>
                            {currElem.projectName}
                          </span>
                          <ul
                            style={{
                              padding: "0 10px",
                              fontSize: "14px",
                              listStylePosition: "inside",
                            }}
                          >
                            <li>
                              <span
                                style={{ color: "gray", marginRight: "35px" }}
                              >
                                Allocated Percentage
                              </span>
                              {` ${currElem.allocationPercentage}%`}
                            </li>
                            <li>
                              <span
                                style={{ color: "gray", marginRight: "48px" }}
                              >
                                Allocated Start Date
                              </span>
                              {currElem.allocationStartDate}
                            </li>
                            <li>
                              <span
                                style={{ color: "gray", marginRight: "53px" }}
                              >
                                Allocated End Date
                              </span>
                              {currElem.allocationEndDate}
                            </li>
                          </ul>
                        </li>
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography
                    component={"span"}
                    style={{
                      color: "gray",
                      fontSize: "30px",
                      padding: "3px",
                    }}
                  >
                    NOT ALLOCATED YET
                  </Typography>
                ))}
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
