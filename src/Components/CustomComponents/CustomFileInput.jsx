const CustomFileInput = ({ label = "Choose File", style, icon, ...props }) => {
  return (
    <>
      <label style={style} htmlFor={label}>
        {icon && icon}
        {label}
      </label>
      <input type="file" id={label} hidden {...props} />
    </>
  );
};

export default CustomFileInput;
