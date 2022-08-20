import { BsArrowsMove } from "react-icons/bs";
import { FaMousePointer } from "react-icons/fa";
import { MdRotate90DegreesCcw } from "react-icons/md";
import { SiScaleway } from "react-icons/si";

export const baseTools = [
  { tool: "Select", Icon: FaMousePointer },
  { tool: "Translate", Icon: BsArrowsMove },
  { tool: "Rotate", Icon: MdRotate90DegreesCcw },
  { tool: "Scale", Icon: SiScaleway },
];


export const transformTools = [
  "translate",
  "rotate",
  "scale"
]