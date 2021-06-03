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
        backgroundColor: Colors.warningRed,
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
    }

})


const StackedLinearProgress = ({ partValue, totalValue, tooltipContent }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');


    return (
        <div className={classes.container}>
            <div className={classes.barContainer}>
                {partValue > 0 && <div style={{ backgroundColor: Colors.approvedGreen, width: `${partValue}%` }} />}
                <div style={{ backgroundColor: Colors.yellow, width: `${totalValue - partValue}%` }} />
            </div>
            <ExpansionPanel 
            previewClassName={classes.expansionPanel} 
            previewClosedText={t('commonWords.viewDetails')}
            previewOpenText={t('commonWords.hideDetails')}
            >
                <Details content={tooltipContent} />
            </ExpansionPanel>
        </div>
    )

}

const Details = ({ content = {} }) => {
    return (<Grid alignItems="flex-end">
        <Label color={Colors.green}>{content.green}</Label>
        <Label color={Colors.yellow}>{content.yellow}</Label>
        <Label color={Colors.red}> {content.red}</Label>
    </Grid>)
}

const Label = (props) => {
    const classes = useStyles({ color: props.color })
    return (
        <Grid container alignItems="center"><div className={classes.colorLabel} /> <Typography> {props.children}</Typography></Grid>
    )
}


export default StackedLinearProgress;