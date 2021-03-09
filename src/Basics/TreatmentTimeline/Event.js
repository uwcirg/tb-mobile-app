import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Styles from '../Styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Colors';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    summary: {
        marginTop: ".5em",
        textTransform: "capitalize",
        padding: ".25em .5em",
        borderRadius: "8px",
        backgroundColor: props => props.backgroundColor || Colors.timelineGreen
    },
    subtitle: {
        fontSize: ".8em",
        color: props => props.accentColor || Colors.textGray,
        textTransform: "capitalize",

    },
    title:{
        lineHeight: '16px'
    }
})

const Event = (props) => {

    //const styleProps = { backgroundColor: props.weeksInTreatment === props.weekValue ? Colors.timelineYellow : props.weeksInTreatment < props.weekValue ? Colors.lightgray : Colors.calendarGreen }

    const backgroundColor = false
    const styleProps = { backgroundColor: backgroundColor}

    const classes = useStyles(styleProps);
    const { t } = useTranslation('translation');
    return (
        <div className={`${classes.summary} titles `}>
            <Typography className={classes.title}>{props.title}</Typography>
            <Typography className={classes.subtitle}>
                {props.subtitle}
            </Typography>
        </div>
    )
};

export default Event;