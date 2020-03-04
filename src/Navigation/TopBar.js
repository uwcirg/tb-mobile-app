import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person'
import Colors from '../Basics/Colors';

const useStyles = makeStyles({
  personIcon:{
    color: Colors.buttonBlue,
    fontSize: "1.5em"
  },
  menuContainer:{

  },
  appTitle:{
    marginRight: "auto"
  },
    bar:{
      boxShadow: "none",
      border: `1px solid ${Colors.gray}`
  }


})

const TopBar = inject("uiStore","patientStore")(observer(({ uiStore,patientStore, props }) => {

  const classes = useStyles();

  const { t, i18n } = useTranslation('translation');


  //Conditional Logic to Display back button during treatment flow
  let buttonToDisplay = (
    patientStore.isLoggedIn && <IconButton className={classes.menuContainer} onClick={uiStore.toggleMenu} edge="start"  color="inherit" aria-label="menu"> <PersonIcon className={classes.personIcon} /></IconButton>
  )


    return(
        <AppBar className={classes.bar} color={!uiStore.offline ? "secondary" : "primary"} position="fixed" >
          <Toolbar>
            
            <Typography variant="h6" className={classes.appTitle}> {t("title")}</Typography>
            {buttonToDisplay}
            <Typography variant="h6" color={!uiStore.offline ? "secondary" : "primary"} style={{color: "flex-end"}} >
            {uiStore.offline ? <OfflineBoltIcon style={{color:"white"}} /> : ""}
            </Typography>
          </Toolbar>
        </AppBar>
    )
}));


export default TopBar;
