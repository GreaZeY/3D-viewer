import { prepareObjectsAndAdd } from "lib/actions/objectAction";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

const FileDropZone = () => {
  const [showDropPreview, setShowDropPreview] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();

  const getDropedFiles = (e) => {
    e.preventDefault();
    setShowDropPreview(false);
    let files = [];
    for (let item of e.dataTransfer?.items) {
      const file = item.getAsFile();
      files.push(file);
    }
    dispatch(prepareObjectsAndAdd(files, alert.error));
  };

  const events = [
    { event: "drop", listener: getDropedFiles },
    { event: "dragover", listener: (e) => e.preventDefault() },
    { event: "dragenter", listener: () => setShowDropPreview(true) },
    { event: "dragleave", listener: () => setShowDropPreview(false) },
  ];

  useEffect(() => {
    events.forEach(({ event, listener }) => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach(({ event, listener }) => {
        document.removeEventListener(event, listener);
      });
    };
  }, []);

  return (
    showDropPreview && (
      <div className="drag-n-drop-preview">
        <span>Upload Your Model</span>
      </div>
    )
  );
};

export default FileDropZone;
