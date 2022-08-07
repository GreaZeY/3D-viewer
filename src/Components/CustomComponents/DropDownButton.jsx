import { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CloudDownload from "@material-ui/icons/CloudDownload";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { AiOutlineDownload } from "react-icons/ai";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";

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
            border: "1px solid #var(--color)",
          }}
          onClick={() => getSelectedIndex(selectedIndex)}
        >
          {loading ? (
            loader
          ) : (
            <AiOutlineDownload
              style={{ marginTop: "0px", marginRight: ".5rem" }}
            />
          )}{" "}
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
                      <AiOutlineDownload
                        style={{
                          marginTop: "0px",
                          marginRight: ".5rem",
                        }}
                      />
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
