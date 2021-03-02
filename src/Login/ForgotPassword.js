import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})

const ForgotPassword = () => {

    const classes = useStyles();

    return(<div>
        Contact your coordinator, they will send you a code you can use to login and create a new password.
    </div>)

}

export default ForgotPassword;