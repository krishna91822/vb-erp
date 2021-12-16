import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        maxDate={props.maxDate === "POSOW" ? undefined : new Date()}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
