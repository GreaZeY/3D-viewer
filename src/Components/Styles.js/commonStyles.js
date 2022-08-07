import { makeStyles } from "@material-ui/core/styles";

export const commonStyles = makeStyles({
  flexRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  main: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    "@media screen and (max-width: 640px)": {
      flexDirection: "column",
    },
  },
  delete: {
    marginTop: ".7rem",
    cursor: "pointer",
    transition: ".3s",
    "&:hover": {
      color: "red",
    },
  },
  symbol: {
    border: "1px solid #ECEBEB",
    width: "1rem",
    height: "1rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: ".5s",
    justifyContent: "center",
    marginRight: ".2rem",
    color: "gray",
    fontSize: "12px",
    "&:hover": {
      border: "1px Solid gray",
    },
  },

  modalStyle: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    background: "rgba(0, 0, 0, 0.514)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  containerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "25vw",
    borderRadius: "8px",
    boxSizing: "border-box",
    flexDirection: "column",
    background: "white",
    zIndex: 1000,
  },
  field: {
    "& input": {
      border: "none",
      outline: "none",
      fontSize: "15px",
    },
    margin: "1rem 0",
    borderRadius: "4px",
    padding: "0 0 0 5px",
    border: "2px solid #e1e1e1",
  },
});
