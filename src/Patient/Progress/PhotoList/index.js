import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
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
    loadContainer:{

    },
    loadButton:{
        textTransform: "capitalize",
        width: "100%",
        color: Colors.buttonBlue,
        backgroundColor: Colors.lighterGray
        
    }
})

const PhotoList = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    const [photos, setPhotos] = useState([]);

    const api = new PatientInformationAPI();

    const loadPhotos = async (offset = 0) => {
        const newPhotos = await api.getPhotoReports(offset);
        setPhotos([...photos, ...newPhotos]);
    }

    const handleLoadMore = () => { loadPhotos(photos.length) }

    const allItemsLoaded = photos.length % 10 !== 0;

    useEffect(() => {
        loadPhotos();
    }, [])

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {photos.map((photoReport) => <PhotoResponseItem {...photoReport} />)}
        <Grid className={classes.loadContainer} container justify="center">
            {allItemsLoaded ? <Typography variant="body1">{t('photoReportReview.allLoaded')}</Typography> :
            <Button variant="contained" disableElevation className={classes.loadButton} onClick={handleLoadMore}>
                <Refresh />
                <Box width="5px" />
                {t('commonWords.loadMore')}
                </Button>}
        </Grid>
        <Box height="1em" />
    </div>)

})

export default PhotoList;