import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from '../Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
    body:{
        minHeight: "100vh",
        width: "100%",
        paddingTop: "60px",
        backgroundColor: "white"
    },
    container:{
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 10,
    }
  
})

const Onboarding = () => {

    const classes = useStyles();
    const {patientUIStore} = useStores();

    return(
    <div className={classes.container}>
        <OverTopBar handleBack={() => {patientUIStore.onOnboarding = false}} title="Welcome" />
        <div className={classes.body}>
            Welcome to the treatment app!
        </div>
    </div>)

}

export default Onboarding;