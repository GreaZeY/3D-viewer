const CustomFileInput = ({ label, onChange, style, icon }) => {
  return (
    <>
      <label style={style} htmlFor="import">
        {icon}
        {label}
      </label>
      <input
        type="file"
        id="import"
        accept=".gltf,.stl,.fbx,.obj"
        hidden
        onChange={onChange}
      />
    </>
  );
};

export default CustomFileInput;
