import React from 'react';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import AdherenceValue from '../../../Components/AdherenceValue';
import StackedLinearProgress from '../../../Components/StackedLinearProgress';
import { Typography, makeStyles, Grid, Box } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import ExpansionPanel from '../../../Components/SimpleExpansionPanel'

const useStyles = makeStyles({
    expansionPanel: {
        width: "100%",
        justifyContent: "flex-end",
        color: Colors.textDarkGray,
        padding: '.5em 0',
    },
    label: {
        width: "100%",
        borderBottom: `dashed 1px ${Colors.lightgray}`
    },
    colorLabel: {
        backgroundColor: props => props.color,
        height: "1em", width: "1em",
        borderRadius: "2px",
        marginRight: ".5em"
    },
    data: {
        marginLeft: "auto"
    }
})

export default function AdherenceDetails({ detailContent, additionalDetails }) {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<ExpansionPanel
        previewClassName={classes.expansionPanel}
        previewClosedText={t('commonWords.viewDetails')}
        previewOpenText={t('commonWords.hideDetails')}
    >
        <Box padding="1rem 0">
            <Details content={detailContent} additionalDetails={additionalDetails} />
        </Box>
    </ExpansionPanel>)
}

const Details = ({ content = {}, additionalDetails }) => {
    return (<Grid alignItems="flex-end">
        {additionalDetails}
        <Label color={Colors.calendarGreen} {...content.green} />
        <Label color={Colors.timelineYellow} {...content.yellow} />
        <Label color={Colors.calendarRed} {...content.red} />
    </Grid>)
}

const Label = ({ color, label, data }) => {
    const classes = useStyles({ color: color })
    return (
        <Grid container className={classes.label} alignItems="center"><div className={classes.colorLabel} />
            <Typography>{label}</Typography>
            <Typography className={classes.data}>{data}</Typography>
        </Grid>
    )
}