import DropdownSliders from "../CustomComponents/DropDownSliders";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

export const ColorInput = ({ value, setValue }) => (
  <div className="centerRow">
    Color
    <input
      style={{ borderColor: "#ff6a0073", cursor: "pointer" }}
      type="color"
      onChange={(e) => setValue(e.currentTarget.value)}
      value={value}
    />
  </div>
);

export const MaterialControls = ({ value, setValue }) => {
  const updateValues = (val, currItem) => {
    let prevVal = [...value];
    if (currItem === 0) {
      prevVal[0] = val;
    } else {
      prevVal[1] = val;
    }
    // console.log(prevVal)
    setValue(prevVal);
  };

  return (
    <DropdownSliders
      items={["Metalness", "Roughness"]}
      values={value}
      onChange={updateValues}
      label="Material Properties"
      mins={[0, 0]}
      maxs={[1, 1]}
      steps={[0.01, 0.01]}
    />
  );
};

export const ChangeMode = ({ value, setValue }) => (
  <FormControl style={{ width: "25%", marginTop: ".7rem" }}>
    <InputLabel>Mode</InputLabel>
    <Select
      value={value}
      label="Mode"
      onChange={(e) => setValue(e.target.value)}
    >
      <MenuItem value={"translate"}>Translate</MenuItem>
      <MenuItem value={"rotate"}>Rotate</MenuItem>
      <MenuItem value={"scale"}>Scale</MenuItem>
    </Select>
  </FormControl>
);
