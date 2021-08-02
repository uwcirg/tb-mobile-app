import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import Paper from '@material-ui/core/Paper';
import HideIcon from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';

const HomePageCard = (props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    if (props.isHidden) {
        return <></>
    }

    return (<div className={classes.superContainer} >
        {props.upperText && <span className={classes.upperText}>{props.upperText}</span>}
        <Paper id={props.id} className={`${classes.container}  ${props.noPadding && classes.noPadding} ${props.className}`}>
            {props.children}
        </Paper>
        {props.hideCard && <div className={classes.bottomText} onClick={props.hideCard}>
            <span>{t('commonWords.hideThis')}</span>
            <HideIcon style={{ fontSize: "1.25em", marginLeft: ".5em" }} />
        </div>}
    </div>)
}

const useStyles = makeStyles({

    superContainer: {
        width: "100vw",

    },
    container: {
        ...Styles.modifiedPaper,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1em",
        padding: ".5em",
        paddingTop: "1em",
    },
    upperText: {
        ...Styles.secondaryText,
        fontSize: ".8em",
        textAlign: "left",
        width: "85%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        "& > svg": {
            fontSize: "1.25em",
            marginRight: ".25em"
        }
    },
    bottomText: {
        ...Styles.secondaryText,
        width: "90%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }
})


export default HomePageCard;