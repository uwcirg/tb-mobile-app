import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TopPageLabel from '../../Components/Shared/TopPageLabel';
import { PageLabel } from '../../Components/Shared/PageLabel';
import { VideoCallOutlined, YouTube } from '@material-ui/icons';

const useStyles = makeStyles({
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px"
    },
    box: {
        border: "solid 1px lightgray",
        borderRadius: "5px",
        display: "flex",
        aspectRatio: "1",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        "& *": {
            textAlign: "center"
        },
        "& svg": {
            fontSize: "4em"
        }
    }
})


const buttonData = [

    {
        sectionTitle: "Information about treatment", items: [
            { translationKey: "Videos", to: "/information/videos", icon: <YouTube /> },
            { translationKey: "Questions and Answers", to: "/information/faq" }
        ]
    },
    {
        sectionTitle: "Help with app",
        items: [
            { translationKey: "Help Videos", to: "/information/help-videos" },
            { translationKey: "Report an Issue", to: "/information/issue" },
        ]
    }


]

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


    const buttons = []

    buttonData.forEach(d => {
        buttons.push(...d.items)
    })

    return (
        <Switch>
            {buttons.map(_each => {
                const { to, translationKey } = _each;
                return <InfoRoute key={`route-${to}`} title={translationKey} path={to}>
                    <p>Content!</p>
                </InfoRoute>
            })}
            <Route>
                <Buttons />
            </Route>
        </Switch>
    )
}

const Buttons = () => {
    const classes = useStyles();

    return (
        <Box padding="0 16px">
            {buttonData.map(each => {
                return <React.Fragment key={each.sectionTitle}>
                    <p>{each.sectionTitle}</p>
                    <div className={classes.grid}>
                        {each.items.map(_each => {
                            const { icon, translationKey, to } = _each;
                            return <ButtonBase key={`button-${to}`} className={classes.box} component={Link} to={to}>
                                {icon}
                                <Typography>{translationKey}</Typography>
                            </ButtonBase>
                        })}
                    </div>
                </React.Fragment>

            })}
        </Box >
    )
}