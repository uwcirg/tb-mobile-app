import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TopPageLabel from '../../Components/Shared/TopPageLabel';
import { PageLabel } from '../../Components/Shared/PageLabel';

const useStyles = makeStyles({
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px"
    },
    box: {
        border: "solid 1px lightgray",
        borderRadius: "4px",
        display: "flex",
        aspectRatio: "1",
        alignItems: "center",
        justifyContent: "center",
        "& *": {
            textAlign: "center"
        }
    }
})

const InfoRoute = (props) => {

    const { title, children } = props;

    return <Route {...props}>
        <Box width="100%" bgcolor="white" zIndex={10} position="fixed" top={0}>
            <PageLabel title={title} />
        </Box>
        {children}
    </Route>
}

export default function InformationPage() {
    return (
        <Switch>

            {buttonData.map(each => {
                const { to, translationKey } = each;
                return <InfoRoute title={translationKey} path={to}>
                    <p>Content!</p>
                </InfoRoute>
            })}
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