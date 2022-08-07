import { createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

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
