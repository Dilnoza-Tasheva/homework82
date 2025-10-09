import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {User} from "../../../app/types";
import {logout} from "../../../features/users/usersThunks.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        handleClose();
        navigate("/login");
    };

    return (
        <>
            <Button onClick={handleClick} color="inherit">
                Hello, {user.username}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};


export default UserMenu;