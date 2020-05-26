import React from 'react';
import { useTranslation } from 'react-i18next';
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import {makeStyles} from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import PractitionerBody from './PractitionerBody';
import Drawer from './Drawer'

const useStyles = makeStyles({
    topBar: {
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
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
    },
    container:{
        width: "100vw",
        display: "flex"
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
        <div className={classes.container}>
            <Drawer />
            <PractitionerBody />
        </div>
    )
 
});

export default PractitionerHome;
