import React from 'react';
import { useTranslation } from 'react-i18next';
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PractitionerBody from './PractitionerBody';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

import Drawer from './Drawer'


const useStyles = makeStyles({
    topBar: {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        color: Colors.blue,
        height: "10vh",
        fontFamily: "roboto, sans-serif",
        zIndex: 20
    },
    appName:{
        fontSize: "1.25em",
        fontWeight: 600,
        display: "block",
        marginLeft: "2em"
    },
    input:{
        marginLeft: "auto",
        marginRight: "2em",
        width: "300px",
        display: "inline"
    },
    menu:{
        fontSize: "1.2em",
        marginLeft: "1em"
    } 
})


const PractitionerHome = observer(() => {

    const classes = useStyles();

    const {practitionerStore,uiStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    return(
        <div>
        <Drawer />
        <AppBar  className={classes.topBar}> 
            <IconButton className={classes.menu}  onClick={uiStore.toggleMenu} edge="start"  color="primary" aria-label="menu"> <MenuIcon/></IconButton>
            <Typography className={classes.appName}>{t("title")}</Typography>
            <Autocomplete
                fullWidth="false"
                className={classes.input}
                id="combo-box-demo"
                options={["patient2","patient3"]}
                getOptionLabel={option => option}
                renderInput={params => (
                    <TextField className={classes.textField}  {...params}  variant="outlined" fullWidth />
                )}
            />
            <IconButton onClick={handleClick}>
                <AccountCircle id="account-button"/>
            </IconButton>
        </AppBar>

        <PractitionerBody />

        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={practitionerStore.logout}>Logout</MenuItem>
            <MenuItem onClick={practitionerStore.getParticipants}>GetP</MenuItem>
        </Menu>
            </div>
    )
 
});

/*

const StyledAutocomplete = styled(Autocomplete)`

margin-left: auto;
margin-right: 2em;
width: 300px;

input{
    height: .5em;
}

`

const AccountButton = styled.div`
    margin-right: 2em;
    

    svg{
        height: 1.25em;
        width: 1.25em;  
    }
`
const AppBarStyled = styled(AppBar)`

    display: flex;
    justify-content: center;
    flex-direction: row;
    align-content: center;
    align-items: center;
    background-color: white;
    color: ${Colors.blue};
    height: 10vh;
    font-family: roboto, sans-serif;

    h1{
        font-size: 1.25em;
        font-weight: 600;
        display: block;
        margin-left: 2em;
    }

    

`
*/

export default PractitionerHome;
