import React, { useState } from "react";

import { Box, Container } from "@mui/material/";

import ProfileInfoReadable from "./profileInfo/profileInfoReadable.component";
import TabPanelCustom from "./tabPanelCustom.component";
import PersonalReadable from "./personal/personalReadable.component";
import PersonalEditable from "./personal/personalEditable.component";
import ProfessionalReadable from "./professional/professionalReadable.component";
import ProfessionalEditable from "./professional/professionalEditable.component";
import SkillReadable from "./skill/skillReadable.component";
import SkillEditable from "./skill/skillEditable.component";

const ProfileContent = ({
  inEditMode,
  currentEmployee,
  updateRequest,
  setUpdateRequest,
}) => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        minHeight: "calc( 100% - 80px )",
        border: "2px solid",
        borderColor: "textColor.paletteGrey",
      }}
    >
      <Container>
        <ProfileInfoReadable
          value={value}
          setValue={setValue}
          currentEmployee={currentEmployee}
        />
      </Container>
      <Container sx={{ width: "calc(100% - 16px)" }}>
        <TabPanelCustom value={value} index={0}>
          {inEditMode ? (
            <PersonalEditable
              empData={updateRequest}
              setEmpData={setUpdateRequest}
            />
          ) : (
            <PersonalReadable empData={currentEmployee} />
          )}
        </TabPanelCustom>
        <TabPanelCustom value={value} index={1}>
          {inEditMode ? (
            <ProfessionalEditable
              empData={updateRequest}
              setEmpData={setUpdateRequest}
            />
          ) : (
            <ProfessionalReadable empData={currentEmployee} />
          )}
        </TabPanelCustom>
        <TabPanelCustom value={value} index={2}>
          {inEditMode ? (
            <SkillEditable
              empData={updateRequest}
              setEmpData={setUpdateRequest}
            />
          ) : (
            <SkillReadable empData={currentEmployee} />
          )}
        </TabPanelCustom>
      </Container>
    </Box>
  );
};

export default ProfileContent;
