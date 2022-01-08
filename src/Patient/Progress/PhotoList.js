import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  
})

const PhotoList = ({photos}) => {

    const classes = useStyles();

    return(<div>
        <Typography variant="body1" color="initial">PhotoList</Typography>
    </div>)

}

export default PhotoList;