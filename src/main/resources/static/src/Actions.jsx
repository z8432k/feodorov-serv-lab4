import {Button, Menu, MenuItem} from "@mui/material";
import {useState} from "react";

export default function Actions({ onClick }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelClick = () => {
        onClick();
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                onClick={handleClick}
            >
                Actions
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleDelClick}>Delete</MenuItem>
            </Menu>
        </div>
    );
}