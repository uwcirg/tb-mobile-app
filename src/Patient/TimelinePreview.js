import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})



const TimelinePreview = () => {

    const {patientStore} = useStores();

    const classes = useStyles();

    return(<div>

    </div>)

}

export default TimelinePreview;
