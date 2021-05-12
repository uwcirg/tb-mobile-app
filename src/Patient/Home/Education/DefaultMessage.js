import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import RateButtons from './RateButtons'

const useStyles = makeStyles({
    header: {
        fontSize: "1.25em",
        fontWeight: "bold",
        marginTop: "1em",
        textTransform: "capitalize"
    },
    subHeader: {
        textTransform: "capitalize"
    },
    graphic: {
        width: "90%",
        marginTop: "1em"
    },
    body: {
        maxHeight: "60vh",
        overflow: "scroll",
        padding: ".5em",
        "& > p": {
            textAlign: "left",
            marginTop: 0
        },
        "& > h2": {
            fontWeight: "bold",
            fontSize: "1em",
            textAlign: "left"
        },
        margin: "auto"
    },
})

const DefaultLayout = observer((props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientStore } = useStores();
    const { educationStore: education } = patientStore;

    return (<>
        <Typography className={classes.header} variant="h1">{t("educationalMessages.header")} </Typography>
        <Typography className={classes.subHeader} >{t("time.week")} {Math.round(education.dayShown / 7)}</Typography>
        <Graphic imagePath={props.imagePath} imageClass={props.imageClass} />
        <div data-testid="education-body" className={classes.body}>
            <p>{education.message}</p>
            {props.children}
        </div>
        <RateButtons />
    </>)
})

const Graphic = ({imagePath = "/treatment-update.png", imageClass}) => {
    const classes = useStyles();
    const classToUse = imageClass || classes.graphic
    return <img className={classToUse} src={imagePath} />
}

export default DefaultLayout;