import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    photo: {
        backgroundColor: Colors.lighterGray,
        height: "75px",
        width: "75px",
        backgroundSize: "fill",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        borderRadius: "4px"
    },
    item:{
        padding: ".5em"
    }
})

const PhotoList = observer(({ photos }) => {

    const classes = useStyles();
    const { patientStore } = useStores();

    return (<div>
        {patientStore.photoReports.map(photoReport => {
            return (
                <>
                <Grid className={classes.item} container>
                    <Box flexGrow="1">
                        <Typography>Date: </Typography>
                    </Box>
                    <div>{photoReport.date}</div>
                    <div style={{ backgroundImage: `url(${photoReport.url})` }} className={classes.photo} />
                    <Box width=".5em" />
                </Grid>
                <Box height=".5em" />
                </>
            )
        })}
    </div>)

})

export default PhotoList;