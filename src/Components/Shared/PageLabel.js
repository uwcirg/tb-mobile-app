import React from 'react'
import { Grid, IconButton, Typography } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        fontSize: "1.25em",
        padding: ".5em 0"
    },
    backButton: {
        "& svg": {
            fontSize: "1.5em",
        },
        color: "black"
    }
})

export function PageLabel({ title, handleExit, to }) {

    const classes = useStyles();

    const buttonProps = to ? {component: Link, to: to} : {onClick: handleExit}

    return (<Grid className={classes.topBar} container alignItems='center' wrap="nowrap">
        <IconButton className={classes.backButton} {...buttonProps}>
            <ChevronLeftRounded />
        </IconButton>
        <PageLabelTitle title={title} />
    </Grid>)
}

export function PageLabelTitle({ title }) {
    const classes = useStyles();
    return <Typography className={classes.title} variant="h2">{title}</Typography>
}

