import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import PreviewOne from './ministry-of-health-video.jpg';
import PreviewTwo from './province-of-misiones-video.png';
import { Button } from '@material-ui/core';
import Interactioncard from '../../Basics/InteractionCard'
import Colors from '../../Basics/Colors'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
            margin: "12px 0px"
        }      
    }
})

export default function Videos() {

    const classes = useStyles();

    return (
        <Interactioncard className={classes.topCard} >
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="panel-content"
                    id="expand-section"
                >
                    <Typography variant="h2" className={classes.heading}>Videos</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div>
                    <div className={classes.video}>
                        <a href="https://www.youtube.com/watch?v=KizqF_HmI2w"><img className={classes.preview} src={PreviewOne}></img></a>
                        <Button className={classes.button} href="https://www.youtube.com/watch?v=KizqF_HmI2w">
                            Video educativo tuberculosis Ministerio de Salud</Button>
                    </div>
                    <div className={classes.video}>
                        <a href="https://www.youtube.com/watch?v=vaXrKW0ZGtg"><img className={classes.preview} src={PreviewTwo}></img></a>
                        <Button className={classes.button} href="https://www.youtube.com/watch?v=vaXrKW0ZGtg">
                            Programa Tuberculosis Provincia de Misiones</Button>
                    </div>
                </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>             
        </Interactioncard>
    )
}