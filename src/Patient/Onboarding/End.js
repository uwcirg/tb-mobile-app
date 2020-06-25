import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})

const End = () => {

    const classes = useStyles();

    return(<div>

        Thank you for your input, lets get started!

    </div>)

}

export default End;