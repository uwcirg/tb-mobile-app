import { Box, styled, Typography } from '@material-ui/core';
import React from 'react';
import Colors from '../../Basics/Colors';

const getBackgroundColor = (priority) => {
    if(priority === 2) return Colors.warningRed
    if(priority === 1) return Colors.yellow
    return Colors.approvedGreen
}

const Container = styled(Box)({
    height: "fit-content",
    backgroundColor:  props => getBackgroundColor(props.priority),
    borderRadius: "4px",
    padding: "0 .5em",
    fontSize: ".75em",
    minWidth: "30px",
    textAlign: "center"
})

const AdherenceLabel = ({ patient }) => {

    return (<Container priority={patient.priority}>
       <Typography>{Math.floor(patient.adherence * 100)}%</Typography> 
    </Container>)

}

export default AdherenceLabel;