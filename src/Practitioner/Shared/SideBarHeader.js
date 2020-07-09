import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
    sideBarTop: {
        display: "flex",
        width: "100%"
    },
    clear:{
        marginLeft: "auto"
    }

})

const SideBarTop = (props) => {

    const classes = useStyles();

    return (<div className={classes.sideBarTop}>
        <h2>{props.title}</h2>
        <IconButton className={classes.clear} onClick={props.handleExit}><ClearIcon /></IconButton>
    </div>)

}



export default SideBarTop;