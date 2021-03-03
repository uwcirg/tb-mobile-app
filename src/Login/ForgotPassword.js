import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container:{
      width: "80%",
      margin: "auto",
      color: "white"
  }
})

const ForgotPassword = () => {

    const classes = useStyles();

    return(<div className={classes.container}>
        Contact your coordinator on WhatsApp, they will send you a code you can use to login and create a new password.
    </div>)

}

export default ForgotPassword;