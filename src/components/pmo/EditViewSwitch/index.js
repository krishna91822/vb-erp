import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  withStyles,
} from "@material-ui/core";

import { EditViewSwitchStyled } from "./styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const EditViewSwitchs = ({ id, edit, setEdit, onUpdate }) => {
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

  return (
    <EditViewSwitchStyled style={{ display: id ? "flex" : "none" }}>
      <Button
        type="submit"
        variant="contained"
        size="small"
        color="primary"
        style={{ display: edit && id ? "block" : "none" }}
        onClick={onUpdate}
      >
        Save
      </Button>
      <span data-test="edit-mode-title">Edit Mode</span>
      <FormGroup data-test="edit-mode-formgroup">
        <FormControlLabel
          control={
            <IOSSwitch checked={edit} onChange={handleChange} name="checkedB" />
          }
        />
      </FormGroup>
    </EditViewSwitchStyled>
  );
};

export default EditViewSwitchs;
