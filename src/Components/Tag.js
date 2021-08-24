import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    tag: {
        backgroundColor: props => props.backgroundColor,
        padding: "5px 8px",
        textTransform: "uppercase",
        fontSize: ".75em",
        borderRadius: "5px"
    }
})

const Tag = (props) => {
    const classes = useStyles(props);
    return <Typography className={`${classes.tag} ${props.className}`}>{props.children}</Typography>
}

export default Tag;