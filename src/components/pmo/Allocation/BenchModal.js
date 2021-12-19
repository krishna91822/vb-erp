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
            <div
              style={{
                padding: "0 20px",
                height: "calc(100% - 68px)",
                marginTop: "20px",
                overflowY: "auto",
              }}
            >
              {entryData.projects &&
                (entryData.projects.length > 0 ? (
                  <ul style={{ display: "flex", flexWrap: "wrap" }}>
                    {entryData.projects.map((currElem, index) => (
                      <li
                        key={index}
                        style={{
                          fontSize: "18px",
                          marginBottom: "20px",
                          flexBasis: "50%",
                        }}
                      >
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
                            <div
                              style={{
                                color: "gray",
                                width: "150px",
                                display: "inline-block",
                              }}
                            >
                              Allocated Percentage
                            </div>
                            {` ${currElem.allocationPercentage}%`}
                          </li>
                          <li>
                            <div
                              style={{
                                color: "gray",
                                width: "155px",
                                display: "inline-block",
                              }}
                            >
                              Allocated Start Date
                            </div>
                            {currElem.allocationStartDate}
                          </li>
                          <li>
                            <div
                              style={{
                                color: "gray",
                                width: "155px",
                                display: "inline-block",
                              }}
                            >
                              Allocated End Date
                            </div>
                            {currElem.allocationEndDate}
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "95px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      style={{
                        color: "gray",
                        fontSize: "25px",
                        padding: "3px",
                        display: "flex",
                        justifyConents: "center",
                      }}
                    >
                      Not Allocated Yet
                    </Typography>
                  </div>
                ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
