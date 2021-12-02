import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import InteractionCard from '../../Basics/HomePageSection';
import Typography from '@material-ui/core/Typography'
import { Box, Button } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import ActionButton from './ActionButton';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    cardReset:{
        padding:0
    }
})

const PhotoRequestCard = () => {

    const classes = useStyles();

    return (<InteractionCard className={classes.cardReset} upperText={<> <CameraAlt /> Test Strip Request </>}>
        <Box padding="1em">
            <p style={{ fontSize: "1.2em", margin: "0", display: "block", width: "90%" }}>Please complete a test strip to confirm your progress</p>
            <Box height="1em" />
            <ActionButton text="Complete Test Strip and Submit Photo" icon={<CameraAlt />} backgroundColor={Colors.accentBlue} />
        </Box>
    </InteractionCard>)

}

export default PhotoRequestCard;