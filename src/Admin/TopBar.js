import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Logout from '../Basics/Logout';
import useStores from '../Basics/UseStores';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    topBar: {
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "10",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "50px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
        padding: "5px",
        "& > img": {
            height: "50px"
        }
    },
    settings: {
        marginLeft: "auto",
        marginRight: "1em"
    }
})


const AdminTopBar = () => {
    const classes = useStyles();
    const {uiStore} = useStores();

    return (
        <div className={classes.topBar}>
            <img src="/logo.png" />
            <Typography variant="h1">Trial Dashboard</Typography>
            <Button onClick={()=>{uiStore.push("/")}}>Home</Button>
            <Button onClick={()=>{uiStore.push("/patients")}}>Patients</Button>
            <Settings />
        </div>
    )
}


function Settings() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {uiStore} = useStores();

    const logout = Logout();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        handleClose();
        logout();
    };

    const handleLanguage = () => {
        uiStore.toggleLanguage();
        handleClose();
    }

    const classes = useStyles();

    return (
        <div className={classes.settings}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>
                    Log Out
                </MenuItem>
                <MenuItem onClick={handleLanguage}>
                    Toggle Language
                </MenuItem>
            </Menu>
        </div>
    );
}

export default AdminTopBar;