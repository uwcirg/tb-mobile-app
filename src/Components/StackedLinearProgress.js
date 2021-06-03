import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    container: {
        margin: "1em auto",
        height: "15px"
    },
    barContainer: {
        height: "15px",
        borderRadius: "5px",
        overflow: "hidden",
        width: "100%",
        backgroundColor: Colors.warningRed,
        display: "flex",
        // "& > div:first-of-type": {
        //     borderTopLeftRadius: "5px",
        //     borderBottomLeftRadius: "5px"
        // },
        "&:hover":{
            cursor: "pointer"
        }

    },

    colorLabel: {
        backgroundColor: props => props.color,
        height: "1em", width: "1em",
        borderRadius: "2px",
        marginRight: ".5em"
    }

})

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "white",
      color: Colors.textDarkGray,
      border: "solid 1px black"
    },
  }))(Tooltip);

const StackedLinearProgress = ({ partValue, totalValue, tooltipContent }) => {

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <LightTooltip interactive placement="right"  title={<Details content={tooltipContent} />}>
                <div className={classes.barContainer}>
                    {partValue > 0 && <div style={{ backgroundColor: Colors.approvedGreen, width: `${partValue}%` }} />}
                    <div style={{ backgroundColor: Colors.yellow, width: `${totalValue - partValue}%` }} />
                </div>
            </LightTooltip>
        </div>
    )

}

const Details = ({content={}}) => {
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