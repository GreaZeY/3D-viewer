import { suppportedFileTypes } from "lib/constants/objectContants";

export const isSupportedFileType = (type) => {
  if (suppportedFileTypes.includes(type)) return true;
  return false;
};
