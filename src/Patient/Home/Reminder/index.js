import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})

const CompName = () => {

    const classes = useStyles();

    return(<div>
        Add a reminder
    </div>)

}

export default CompName;