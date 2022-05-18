import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '../Components/SimpleExpansionPanel'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        margin: "1em auto"
    },
    barContainer: {
        height: "15px",
        borderRadius: "5px",
        overflow: "hidden",
        width: "100%",
        backgroundColor: Colors.adherence.red,
        display: "flex"
    },

    colorLabel: {
        backgroundColor: props => props.color,
        height: "1em", width: "1em",
        borderRadius: "2px",
        marginRight: ".5em"
    },
    expansionPanel:{
        width: "100%",
        justifyContent: "flex-end",
        color: Colors.textDarkGray,
        padding: '.5em 0',
    },
    data: {
        marginLeft: "auto"
    },
    label:{
        width: "100%",
        borderBottom: `dashed 1px ${Colors.lightgray}`
    }

})


const StackedLinearProgress = ({ partValue, totalValue, detailContent,additionalDetails }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');


    return (
        <div className={classes.container}>
            <div className={classes.barContainer}>
                {partValue > 0 && <div style={{ backgroundColor: Colors.adherence.green, width: `${partValue}%` }} />}
                <div style={{ backgroundColor: Colors.adherence.yellow, width: `${totalValue - partValue}%` }} />
            </div>
            <ExpansionPanel 
            previewClassName={classes.expansionPanel} 
            previewClosedText={t('commonWords.viewDetails')}
            previewOpenText={t('commonWords.hideDetails')}
            >
                <Details content={detailContent} additionalDetails={additionalDetails} />
            </ExpansionPanel>
        </div>
    )

}

const Details = ({ content = {}, additionalDetails }) => {
    return (<Grid alignItems="flex-end">
        {additionalDetails}
        <Label color={Colors.calendarGreen} {...content.green} />
        <Label color={Colors.timelineYellow} {...content.yellow} />
        <Label color={Colors.calendarRed} {...content.red} />
    </Grid>)
}

const Label = ({color, label, data}) => {
    const classes = useStyles({ color: color })
    return (
        <Grid container className={classes.label} alignItems="center"><div className={classes.colorLabel} /> <Typography>{label}</Typography> <Typography className={classes.data}>{data}</Typography></Grid>
    )
}


export default StackedLinearProgress;