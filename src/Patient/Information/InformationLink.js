import { Box, ButtonBase, Paper, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    box: {
        // border: `solid 2px gray`,
        // backgroundColor: "#E3F2FD",
        borderRadius: "5px",
        display: "flex",
        padding: "8px",
        aspectRatio: "1",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        "& > p": {
            textAlign: "center",
            fontSize: ".9rem"
        },
        "& > svg": {
            fontSize: "4em",
            color: Colors.buttonBlue
        }
    },
    buttonText: {
        lineHeight: "1.1rem",
        fontWeight: "500",
        textTransform: "capitalize"
    },
    new: {
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)"
    }
})


export default function InformationLink({ icon, translationKey, to }) {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<Paper className={classes.new} key={`button-${to}`}>
        <ButtonBase className={classes.box} component={Link} to={to}>
            {icon}
            <Box height="8px" />
            <Typography className={classes.buttonText}>
                {t(translationKey)}
            </Typography>
        </ButtonBase>
    </Paper>)
}