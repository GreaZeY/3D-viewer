import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AiOutlineDownload } from "react-icons/ai";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
const downSvg = {
  marginTop: "0px",
  marginRight: ".5rem",
  fontSize: "1.2rem",
  strokeWidth: "30",
};
const DropDownButton = ({ options, loading, loader, getSelectedIndex }) => {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setOpen(false);
    getSelectedIndex(index);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
        <Button
          disabled={loading}
          size="small"
          style={{
            background: "transparent",
            border: "1px solid var(--color)",
            color: "var(--color)",
          }}
          onClick={() => getSelectedIndex(selectedIndex)}
        >
          {loading ? loader : <AiOutlineDownload style={downSvg} />}{" "}
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          style={{
            background: "transparent",
            border: "1px solid var(--color)",
          }}
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          disabled={loading}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(e) => handleMenuItemClick(e, index)}
                    >
                      <AiOutlineDownload style={downSvg} />
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default DropDownButton;
