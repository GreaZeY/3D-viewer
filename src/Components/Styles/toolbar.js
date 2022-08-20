import { makeStyles } from "@material-ui/core/styles";
const width = "2.2rem",
  height = "2.2rem";
export const toolbarStyles = makeStyles({
  toolbar: {
    display: "flex",
    position: "absolute",
    top: 80,
    left: 15,
    alignItems: "center",
    width,
    padding: "",
    borderRadius: "5px",
    flexDirection: "column",
    background: "#47494a",
    zIndex: 10,
  },
  tool: {
    cursor: "pointer",
    width,
    height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: "1.3rem",
    margin: 0,
  },
  selected: {
    background: "var(--color)",
    borderRadius: "4px",
    "& svg": {
      fill: "var(--background-color)",
    },
  },
});
