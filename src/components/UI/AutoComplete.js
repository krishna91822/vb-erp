import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Employee Name" />}
    />
  );
}

const top100Films = [
  { label: "Alex", year: 1994 },
  { label: "David", year: 1972 },
  { label: "yusuf", year: 1974 },
  { label: "Aquib", year: 2008 },
  { label: "yash DY", year: 1957 },
  { label: "Ayushi", year: 1993 },
  { label: "Tanmay", year: 1994 },
];
