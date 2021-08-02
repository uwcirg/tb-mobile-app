import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import HideIcon from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';
import HomePageCard from '../Components/Patient/HomePageCard';


const HomePageSection = (props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    if (props.isHidden) {
        return <></>
    }

    return (<div className={classes.superContainer} >
        {props.upperText && <span className={classes.upperText}>{props.upperText}</span>}
        <HomePageCard {...props} />
        {props.hideCard && <div className={classes.bottomText} onClick={props.hideCard}>
            <span>{t('commonWords.hideThis')}</span>
            <HideIcon style={{ fontSize: "1.25em", marginLeft: ".5em" }} />
        </div>}
    </div>)
}

const useStyles = makeStyles({

    superContainer: {
        width: "100%",

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


export default HomePageSection;