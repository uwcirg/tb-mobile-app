import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('translation');

    return (
        <div className={classes.container}>
            <Link to="/progress/photos">
                <Grid alignItems='center' container>
                    <PhotoLibraryIcon style={{color: Colors.buttonBlue}} />
                    <Box width=".5em" />
                    <Typography>{t('redoPhoto.viewMyPhotos')}</Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRightIcon style={{color: Colors.textGray}} />
                </Grid>
            </Link>
        </div>
    )

}

export default ReviewPhotos;