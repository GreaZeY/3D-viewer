const CustomFileInput = ({ label, onChange, style, icon, accept }) => {
  return (
    <>
      <label style={style} htmlFor="import">
        {icon}
        {label}
      </label>
      <input
        type="file"
        id="import"
        accept={accept}
        hidden
        onChange={onChange}
      />
    </>
  );
};

export default CustomFileInput;
