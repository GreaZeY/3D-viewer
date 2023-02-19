import DropdownSliders from "../CustomComponents/DropDownSliders";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CustomFileInput from "../CustomComponents/CustomFileInput";

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

export const FileInput = ({ value, setValue }) => (
  <div style={{ marginTop: "1rem" }}>
    Map :
    <CustomFileInput
      label="Load Map"
      style={{
        fontSize: ".8rem",
        borderRadius: "5px",
        cursor: "pointer",
        border: "1px solid var(--color)",
        padding: ".1rem .5rem",
        cursor: "pointer",
        textAlign: "center",
        borderRadius: "5px",
        marginLeft: "1rem",
      }}
      accept={".png,.jpg,.jpeg"}
      onChange={(e) => setValue(e.target.files[0])}
    />
  </div>
);
