import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Box, Button } from '@material-ui/core';
import Colors from '../../Basics/Colors'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    preview:{
        width: "100%",
        height: "auto"
    },
    panel: {
        boxShadow: "none",
        margin: 0,
    },
    topCard: {
        paddingTop: "8px"
    },
    heading:{
        fontSize: "1em"
    },
    button: {
        color: Colors.buttonBlue,
        textTransform: "capitalize"
    },
    video:{
        "&:first-of-type": {
            marginBottom: "12px"
        }      
    }
})

export default function Videos() {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
                <Box padding="2rem 1rem">
                    <div className={classes.video}>
                        <a href="https://www.youtube.com/watch?v=KizqF_HmI2w"><img className={classes.preview} src={"/img/es-Ar/video-previews/ministry-of-health-video.jpg"}></img></a>
                        <Button className={classes.button} href="https://www.youtube.com/watch?v=KizqF_HmI2w">
                            Video de Ministerio de Salud</Button>
                    </div>
                    <div className={classes.video}>
                        <a href="https://www.youtube.com/watch?v=vaXrKW0ZGtg"><img className={classes.preview} src={"/img/es-Ar/video-previews/province-of-misiones-video.png"}></img></a>
                        <Button className={classes.button} href="https://www.youtube.com/watch?v=vaXrKW0ZGtg">
                            Programa Tuberculosis Provincia de Misiones</Button>
                    </div>
                </Box>
    )
}