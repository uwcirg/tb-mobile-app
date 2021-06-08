import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Colors from '../Basics/Colors'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    adherence: {
        fontWeight: "bold",
        fontSize: "1.75em",
        lineHeight: "1em",
        marginLeft: "auto",
    },
    title: {
        fontSize: "1em",
        color: Colors.textDarkGray,
        fontWeight: "bold",
        padding: 0,
        margin: 0
    }
})

const AdherenceValue = ({ adherence, title, style }) => {

    const classes = useStyles();


    if(!title) return <Typography style={style} variant="h2" className={classes.adherence}>{Math.floor(adherence * 100)}%</Typography>

    return (<Grid container alignItems="flex-start">
        <Typography className={classes.title} variant="h2">{title}</Typography>
        <Typography variant="h2" className={classes.adherence}>{adherence * 100}%</Typography>
    </Grid>)
}

export default AdherenceValue;