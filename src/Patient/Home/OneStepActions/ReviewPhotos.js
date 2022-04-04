import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import { Image, KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

const useStyles = makeStyles({
    container: {
        boxSizing: "border-box",
        width: "100%",
        borderTop: `1px solid ${Colors.lightgray}`,
        padding: "1em",
        "& a:visited , & a":{
            color: "black",
            textDecoration: "none"
        }
    }
})

const ReviewPhotos = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Link to="/progress/photos">
                <Grid alignItems='center' container>
                    <Image style={{color: Colors.buttonBlue}} />
                    <Box width=".5em" />
                    <Typography>{t('redoPhoto.viewMyPhotos')}</Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRight style={{color: Colors.textGray}} />
                </Grid>
            </Link>
        </div>
    )

}

export default ReviewPhotos;