import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  styled,
} from "@mui/material";

import { EditViewSwitchStyled } from "./styles";
import UpdateModal from "../UpdateModal";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const EditViewSwitchs = ({
  id,
  edit,
  setEdit,
  onUpdate,
  setUpdateModal,
  updateModal,
}) => {
  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.checked) {
      setEdit(true);
      history.push(`/pmo/projects/${id}/edit`);
    } else {
      setEdit(false);
      history.push(`/pmo/projects/${id}`);
    }
  };
  const onUpdateEditView = () => {
    onUpdate(id);
  };

  return (
    <EditViewSwitchStyled style={{ display: id ? "flex" : "none" }}>
      <UpdateModal
        setUpdateModal={setUpdateModal}
        updateModal={updateModal}
        id={id}
      />
      <Button
        type="submit"
        variant="contained"
        size="small"
        color="primary"
        style={{ display: edit && id ? "block" : "none" }}
        onClick={onUpdateEditView}
      >
        Save
      </Button>
      <span data-test="edit-mode-title">Edit Mode</span>
      <FormGroup data-test="edit-mode-formgroup">
        <FormControlLabel
          control={
            <IOSSwitch checked={edit} onChange={handleChange} name="checkedB" />
          }
          label=""
        />
      </FormGroup>
    </EditViewSwitchStyled>
  );
};

export default EditViewSwitchs;
