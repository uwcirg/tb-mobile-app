import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../../Basics/Styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    item: {
        ...Styles.flexColumn,
        marginRight: ".5em",
        "& > *": {
            margin: 0,
            ...Styles.profileItem
        },
        "& > *:nth-child(1)": {
            textTransform: "capitalize"
        },
        "& > *:nth-child(2)": {
            fontWeight: "bold",
        }
    }
})

const Item = ({top,bottom}) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <Typography variant="body1">{top}</Typography>
            <Typography variant="body1">{bottom}</Typography>
        </div>)
}

export default Item;