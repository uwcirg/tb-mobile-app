import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomePageCard from '../../../Components/Patient/HomePageCard';

const useStyles = makeStyles({
    override: {
        padding: "5px"
    }
})

const MissedActionCard = (props) => {

    const classes = useStyles();

    return(<HomePageCard className={classes.override}>
        {props.children}
    </HomePageCard>)

}

export default MissedActionCard;