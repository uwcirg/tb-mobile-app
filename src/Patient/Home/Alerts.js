import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../../Basics/InteractionCard'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    expansionPanel: {
        boxShadow: "none"
    },
    new: {
        color: Colors.textGray,
        paddingLeft: "1em",
        fontSize: ".75em"
    },
    noPadding: {
        paddingLeft: "1em",
        paddingRight: "1em",
    }

})

const Alerts = () => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
        <InteractionCard upperText={t("patient.home.cardTitles.myLearning")}>
            <Alert summary="Week One" new />
            <Alert summary="Welcome" />
        </InteractionCard>)
}


const Alert = (props) => {

    const classes = useStyles();

    return (
        <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
                className={classes.noPadding}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{props.summary} {props.new && <span className={classes.new}>New</span>}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Alerts;