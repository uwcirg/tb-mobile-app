import React, {useState} from 'react'
import LargeSelector from '../Basics/LargeSelector'
import {makeStyles} from '@material-ui/core/styles'

//Components
import AppLogo from '../Basics/AppLogo'

//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import Colors from '../Basics/Colors'

const useStyles = makeStyles({
    selectionContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    center: {
        backgroundColor: "black",
        justifyItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    logo: {
        height: "30vh",
        marginBottom: "2em"
    }
  });


const Selection = (props) => {
    const classes = useStyles();
    return (
    <div className={classes.selectionContainer}>
        <LargeSelector onClick={props.handleSelection} id="Patient" backgroundColor={Colors.blue}><AccountBoxIcon /><span>Patient</span></LargeSelector>
        <LargeSelector onClick={props.handleSelection} id="Provider" backgroundColor={Colors.blue}><SupervisorAccountIcon /><span>Provider</span></LargeSelector>
        <LargeSelector onClick={props.handleSelection} id="Administrator" backgroundColor={Colors.blue}><SupervisedUserCircleIcon /><span>Administrator</span></LargeSelector>
    </div>)
}

const LoginRouter = () => {
    const classes = useStyles();
    const [selection,setSelection] = useState("");

    const handleSelection = (event) => {
        setSelection(event.target.id);
    }

    return(
        <div className={`${classes.selectionContainer} ${classes.center}`}>
            <AppLogo className={classes.logo}/>
            {!selection ? <Selection handleSelection={handleSelection} /> : <div style={{color:"white"}}>{selection}</div>}
        </div>
    )
}

export default LoginRouter;