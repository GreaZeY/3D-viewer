import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

export const muiTheme = createTheme({
  palette: {
    primary: orange,
    "& :hover": {
      borderColor: orange,
    },
  },
  overrides: {
    MuiSlider: {
      thumb: {
        color: "var(--color)",
      },
      track: {
        color: "var(--Pcolor)",
      },
    },
    MuiSelect: {
      icon: {
        marginRight: ".3rem",
      },
    },

  },
});
