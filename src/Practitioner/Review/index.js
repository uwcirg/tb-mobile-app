import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})

const Review = () => {

    const classes = useStyles();

    return(<div>
        <p>Patients To Review</p>
    </div>)

}

export default Review;