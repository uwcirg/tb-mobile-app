import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../Home/InteractionCard'
import CheckIcon from '@material-ui/icons/Check';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';

import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    textContainer:{
        ...Styles.flexRow,
        alignItems: "center",
        width: "90%",
        fontWeight: "bold",
        padding: 0,
        margin: 0
    },
    checkIcon:{
        marginLeft: "auto",
        color: Colors.approvedGreen
    },
    card:{
        paddingTop: ".5em"
    },
    test:{
        width: "90%",
        height: "1em",
    }
})

const ApprovalStatus = () => {

    const classes = useStyles();

    return (
        <InteractionCard className={classes.card} upperText="Approval Status">
            <div className={classes.textContainer}>
                <p>45/45 Test Strips Approved</p>
                 <CheckIcon className={classes.checkIcon}/>
            </div>
            <div className={classes.test}>
            <LinearProgress variant="determinate" color="primary" value={75} />
            </div>
        </InteractionCard>)

}

export default ApprovalStatus;