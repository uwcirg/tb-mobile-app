import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../../Basics/Colors';
import Grid from '@material-ui/core/Grid';
import MissedActionCard from './MissedActionCard';

const useStyles = makeStyles({
    container:{
        padding: "12px 1em"
    },
    icon:{
        color: Colors.warningRed,
        marginRight: ".5em"
    }
})

const MissedPhoto = () => {

    const classes = useStyles();

    return (<MissedActionCard>
        <Grid className={classes.container} container>
            <PhotoIcon className={classes.icon} />
            <Typography variant="body1" color="initial">
                You missed a photo
            </Typography>
        </Grid>
    </MissedActionCard>)

}

export default MissedPhoto;