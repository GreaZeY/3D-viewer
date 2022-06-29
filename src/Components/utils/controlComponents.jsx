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
