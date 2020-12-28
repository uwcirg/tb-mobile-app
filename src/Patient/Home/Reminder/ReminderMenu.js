import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import Options from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../../Basics/Colors';
import useStores from '../../../Basics/UseStores';
import {observer} from 'mobx-react'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    delete: {
        color: Colors.warningRed
    }
})

const SimpleMenu = observer((props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const patientID = useStores().patientStore.userID;
    const {reminderStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null); 
    };

    const handleItemClick = () =>{
        handleClose();
        reminderStore.delete(patientID,props.reminderID);
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <Options />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.delete} onClick={handleItemClick}>{t('commonWords.delete')}</MenuItem>
            </Menu>
        </>
    );
})

export default SimpleMenu;