import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    sectionHeader:{
        width: "100%",
        fontSize: "2em"
    }
})

const SectionHeader = (props) => {

    const classes = useStyles();

    return(<Typography variant="h2" className={classes.sectionHeader}>{props.children}</Typography>)

}

export default SectionHeader;