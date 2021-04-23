import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles({
    unread:{
        padding: '2px',
        '& > p':{
          color: 'white'
        },
        fontSize: '.75em',
        backgroundColor: Colors.buttonBlue,
        borderRadius: '15px',
        minHeight: '18px',
        minWidth: '18px',
        maxHeight: '18px',
        maxWidth: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  
})

const Unread = (props) => {

    const classes = useStyles();

    return(
<Zoom in={props.value != 0}>
    <div className={classes.unread}><p>{props.value}</p></div>
</Zoom>
        )

}

export default Unread;