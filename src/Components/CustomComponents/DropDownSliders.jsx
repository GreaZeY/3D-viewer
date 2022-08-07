import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";
import MenuItem from "@material-ui/core/MenuItem";
import { commonStyles } from "../Styles.js/commonStyles";

const DropdownSliders = ({
  items,
  values,
  label,
  onChange,
  mins,
  maxs,
}) => {
  const [currItem, setCurrItem] = useState(0);
    const classes = commonStyles();
  return (
    <div style={{ width: "100%" }}>
      <InputLabel
        style={{
          marginTop: "1rem",
          fontSize: "12px",
        }}
      >
        {label}
      </InputLabel>
      <div
        style={{ display: "flex", marginTop: "-1rem", alignItems: "center" }}
      >
        <div
          style={{
            justifyContent: "space-between",
            marginRight: "2rem",
            marginTop: "1rem",
          }}
          className={classes.flexRow}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
            <Select
              size="small"
              value={currItem}
              label={label}
              onChange={(e) => setCurrItem(e.target.value)}
            >
              {items.map((item, i) => (
                <MenuItem key={i + item} value={i}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{ marginTop: "2rem", width: "100%" }}
          className={classes.flexRow}
        >
          <Slider
            aria-label="Sizes"
            onChange={(e, val) => onChange(val, currItem)}
            step={0.1}
            style={{ marginRight: "1rem" }}
            min={mins[currItem]}
            max={maxs[currItem]}
            value={values ? values[currItem] || 0 : 0}
            color="primary"
          />
          <input
            className={classes.symbol}
            style={{ padding: ".2rem", cursor: "text", width: "2rem" }}
            onChange={(e) => onChange(parseFloat(e.target.value), currItem)}
            type="number"
            min={mins[currItem]}
            max={maxs[currItem]}
            step={0.1}
            value={values ? values[currItem] || 0 : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownSliders;
