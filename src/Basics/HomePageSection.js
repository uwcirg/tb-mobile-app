import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import HideIcon from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';
import HomePageCard from '../Components/Patient/HomePageCard';
import HomePageSectionContainer from '../Components/Patient/HomePageSectionContainer';

const HomePageSection = (props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    if (props.isHidden) {
        return <></>
    }

    return (<HomePageSectionContainer upperText={props.upperText}>
        <HomePageCard {...props} />
        {props.hideCard && <div className={classes.bottomText} onClick={props.hideCard}>
            <span>{t('commonWords.hideThis')}</span>
            <HideIcon style={{ fontSize: "1.25em", marginLeft: ".5em" }} />
        </div>}
    </HomePageSectionContainer>)
}

const useStyles = makeStyles({

    bottomText: {
        ...Styles.secondaryText,
        width: "90%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }
})


export default HomePageSection;