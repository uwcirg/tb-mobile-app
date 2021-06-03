import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    adherence: {
        fontWeight: "bold",
        fontSize: "1.75em",
        textAlign: "center"
    }
})

const AdherenceValue = ({ adherence }) => {

    const classes = useStyles();
    return <Typography className={classes.adherence}>{adherence * 100}%</Typography>
}

export default AdherenceValue;