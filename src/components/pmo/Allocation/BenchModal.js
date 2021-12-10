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
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
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
                right: "0",
                top: "0",
              }}
            />
            <Typography variant="h6">Details:-</Typography>
            {entryData.projects &&
              entryData.projects.map((currElem, index) => (
                <div key={index}>
                  <p>======================</p>
                  <Typography>{`project name = ${currElem.projectName},`}</Typography>
                  <Typography>{`rack rate = ${currElem.rackRate},`}</Typography>
                  <Typography>{`last start date = ${currElem.allocationStartDate},`}</Typography>
                  <Typography>{`last end date = ${currElem.allocationEndDate}`}</Typography>
                  <p>======================</p>
                </div>
              ))}

            {/* <Typography>{`name = ${entryData.associateName},`}</Typography>
            <Typography>{`last allocated project = ${entryData.lastAllocatedProject},`}</Typography>
            <Typography>{`last start date = ${entryData.startDate},`}</Typography>
            <Typography>{`last end date = ${entryData.endDate},`}</Typography> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
