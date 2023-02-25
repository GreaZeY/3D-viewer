import CustomFileInput from "../CustomComponents/CustomFileInput";
import { AiOutlineUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { prepareObjectsAndAdd } from "lib/actions/objectAction";
import { useAlert } from "react-alert";

const ImportObject = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const dispatchObject = (e) => {
    dispatch(prepareObjectsAndAdd(e.target.files, alert.error));
  };

  return (
    <CustomFileInput
      label="Import"
      style={{
        fontSize: "1rem",
        borderRadius: "5px",
        cursor: "pointer",
        height: "2.2rem",
      }}
      accept={".gltf,.stl,.fbx,.obj"}
      icon={<AiOutlineUpload style={upSvg} />}
      onChange={dispatchObject}
      multiple
    />
  );
};

export default ImportObject;

const upSvg = {
  marginTop: "0px",
  marginRight: ".5rem",
  fontSize: "1.2rem",
  strokeWidth: "30",
};
