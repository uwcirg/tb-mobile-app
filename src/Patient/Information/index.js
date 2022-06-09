import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    grid:{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px"
    },
    box:{
        border: "solid 1px lightgray",
        borderRadius: "4px",
        display: "flex",
        aspectRatio: "1",
        alignItems: "center",
        justifyContent: "center",
        "& *":{
            textAlign: "center"
        }
    }
})

export default function InformationPage() {
    return (
        <Switch>
            <Route path="/information/help">
                <h1>Help</h1>
            </Route>
            <Route path="/information/videos">
                <h1>Videos</h1>
            </Route>
            <Route path="/information/videos">
                <h1>Help</h1>
            </Route>
            <Route path="/information/videos">
                <h1>Report an Issue</h1>
            </Route>
            <Route>
                <Buttons />
            </Route>
        </Switch>
    )
}

const buttonData = [
    { translationKey: "Videos", to: "/information/videos" },
    { translationKey: "Help", to: "/information/help" },
    { translationKey: "Questions and Answers", to: "/information/faq" },
    { translationKey: "Report an Issue", to: "/information/issue" },

]


const Buttons = () => {
    const classes = useStyles();
    return (
        <Box padding="16px">
            <div className={classes.grid}>
                {buttonData.map(each => {
                    return <ButtonBase className={classes.box} component={Link} to={each.to}>
                        <Typography>{each.translationKey}</Typography>
                    </ButtonBase>
                })}
            </div>
        </Box>
    )
}