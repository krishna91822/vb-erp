import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllDropDownName,
  updateDropDownName,
  RemoveDropDownName,
  getSelectedDropDownName,
} from "../../store/dropDown-actions";
import { uiActions } from "../../store/ui-slice";
import { StyledTypography } from "../../assets/GlobalStyle/style";

const DropDown = () => {
  const [searchDropDownName, setSearchDropDownName] = useState("");
  const [newValue, setNewValue] = useState("");
  const { dropDownName } = useSelector((state) => state.dropdown);
  const { selectedValue } = useSelector((state) => state.dropdown);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDropDownName());
    // eslint-disable-next-line
  }, []);

  const handleOnClick = (item) => {
    const removeValues = {
      label: item.label,
    };
    dispatch(
      RemoveDropDownName(searchDropDownName.dropdownName, removeValues)
    ).then((res) => {
      if (res) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: "Value Removed",
          })
        );
        dispatch(getSelectedDropDownName(searchDropDownName.dropdownName));
      }
    });
  };

  const handleNewValue = () => {
    const newValues = {
      label: newValue,
      value: newValue,
    };
    dispatch(
      updateDropDownName(searchDropDownName.dropdownName, newValues)
    ).then((res) => {
      if (res) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            message: "New Value Added",
          })
        );
        dispatch(getSelectedDropDownName(searchDropDownName.dropdownName));
      }
    });

    setNewValue("");
  };

  const handleChange = (event) => {
    setSearchDropDownName(event.target.value);
    dispatch(getSelectedDropDownName(event.target.value.dropdownName));
  };
  return (
    <div>
      <StyledTypography
        sx={{
          margin: "0 10%",
          padding: "5px 0px",
        }}
      >
        Add DropDown
      </StyledTypography>
      <Card sx={{ margin: "0 10%", px: 3 }}>
        <CardContent>
          <TextField
            size="small"
            value={searchDropDownName}
            fullWidth
            select
            label="Select Drop Down"
            onChange={(event) => handleChange(event)}
          >
            {dropDownName &&
              dropDownName.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.dropdownName}
                </MenuItem>
              ))}
          </TextField>
          <CardContent sx={{ margin: "0 10%", padding: "10px" }}>
            <Grid container spacing={1} wrap="wrap">
              {selectedValue &&
                selectedValue.map((currElem, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      sm={6}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      xs={12}
                    >
                      <p style={{ display: "inherit" }}>
                        <DeleteIcon
                          onClick={() => handleOnClick(currElem)}
                          style={{ cursor: "pointer" }}
                        />

                        <span style={{ padding: "0 5px" }}>
                          {currElem.label}
                        </span>
                      </p>
                    </Grid>
                  );
                })}
            </Grid>
          </CardContent>
          {selectedValue.length > 0 && (
            <>
              <TextField
                placeholder="Add new Value"
                size="small"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />

              <Button
                sx={{ mx: 1 }}
                onClick={handleNewValue}
                color="primary"
                variant="contained"
              >
                ADD
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DropDown;
