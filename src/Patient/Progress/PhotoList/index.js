import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PatientInformationAPI from '../../../API/PatientInformationAPI';
import PhotoResponseItem from './PhotoResponseItem';
import Button from '@material-ui/core/Button';
import { Refresh } from '@material-ui/icons';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    container: {
        padding: "0 .5em"
    },
    title: {
        fontSize: "1.25em",
        padding: ".5em 0"
    },
    loadButton: {
        textTransform: "capitalize",
        width: "100%",
        color: Colors.buttonBlue,
        backgroundColor: Colors.lighterGray,
        "&:disabled": {
            backgroundColor: Colors.lighterGray,
            color: Colors.textDarkGray
        }

    }
})

const PhotoList = ({ initalPhotos = [] }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    const [photos, setPhotos] = useState(initalPhotos);
    const [allItemsLoaded, setAllItemsLoaded] = useState(photos.length % 10 !== 0);

    const api = new PatientInformationAPI();

    const loadPhotos = async (offset = 0) => {
        const newPhotos = await api.getPhotoReports(offset);
        setAllItemsLoaded(newPhotos.length < 10);
        setPhotos([...photos, ...newPhotos]);
    }

    const handleLoadMore = () => { loadPhotos(photos.length) }

    useEffect(() => {
        if (initalPhotos.length === 0) {
            handleLoadMore();
        }
    }, [])

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {photos.map((photoReport) => <PhotoResponseItem key={`photo-list-${photoReport.photoId}`} {...photoReport} />)}
        <Grid container justify="center">
            <Button disabled={allItemsLoaded} variant="contained" disableElevation className={classes.loadButton} onClick={handleLoadMore}>
                {!allItemsLoaded && <Refresh />}
                <Box width="5px" />
                {!allItemsLoaded ? t('commonWords.loadMore') : t('photoReportReview.allLoaded')}
            </Button>
        </Grid>
        <Box height="1em" />
    </div>)

}

export default PhotoList;