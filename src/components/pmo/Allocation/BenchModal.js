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
              <Typography variant="h5">
                <span
                  style={{
                    color: "black",
                    fontSize: "22px",
                    textTransform: "capitalize",
                    lineHeight: "0.8",
                  }}
                >
                  {entryData.empName}
                </span>
              </Typography>
              <Typography>
                <span
                  style={{
                    color: "gray",
                    fontSize: "12px",
                    padding: "0 3px",
                  }}
                >
                  {entryData.empId}
                </span>
              </Typography>
              {entryData.projects &&
                entryData.projects.map((currElem, index) => (
                  <div key={index}>
                    <Typography style={{ padding: "10px 20px" }}>
                      <li>
                        <span style={{ textTransform: "capitalize" }}>
                          {currElem.projectName}
                        </span>
                        <ul style={{ padding: "0 10px", fontSize: "14px" }}>
                          <li style={{ color: "gray" }}>
                            Allocated Percentage
                            <span
                              style={{ color: "black", marginLeft: "6px" }}
                            >{` ${currElem.allocationPercentage}%`}</span>
                          </li>
                          <li style={{ color: "gray" }}>
                            Allocated Start Date
                            <span
                              style={{ color: "black", marginLeft: "19px" }}
                            >
                              {currElem.allocationStartDate}
                            </span>
                          </li>
                          <li style={{ color: "gray" }}>
                            Allocated End Date
                            <span
                              style={{ color: "black", marginLeft: "24px" }}
                            >
                              {currElem.allocationEndDate}
                            </span>
                          </li>
                        </ul>
                      </li>
                    </Typography>
                  </div>
                ))}
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
