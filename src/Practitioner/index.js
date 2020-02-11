import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import AppBar from '@material-ui/core/AppBar';
import { StylesProvider } from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PractitionerBody from './PractitionerBody';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ButtonBase from '@material-ui/core/ButtonBase';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const PractitionerHome = observer(() => {

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
        <StylesProvider injectFirst>
        <AppBarStyled>
            <h1>{t("title")}</h1>

            <StyledAutocomplete
                id="combo-box-demo"
                options={["patient2","patient3"]}
                getOptionLabel={option => option}
                renderInput={params => (
                    <TextField  {...params}  variant="outlined" fullWidth />
                )}
            />

            <AccountButton onClick={handleClick}>
                <AccountCircle id="account-button"/>
            </AccountButton>
        </AppBarStyled>
        </StylesProvider>

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
        </Menu>
            </div>
    )
 
});

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
    }

    

`

export default PractitionerHome;
