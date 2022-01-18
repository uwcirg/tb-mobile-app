import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Refresh from '@material-ui/icons/Refresh';
import { useTranslation } from 'react-i18next';
import PatientInformationAPI from '../../API/PatientInformationAPI';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({
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

const PhotoReportsProvider = ({ initalPhotos = [], listComponent }) => {

    const [photos, setPhotos] = useState(initalPhotos);
    const [allItemsLoaded, setAllItemsLoaded] = useState(photos.length % 10 !== 0);
    const { t } = useTranslation();
    const classes = useStyles();

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


    return (
        <>
            {React.cloneElement(listComponent, { photos: photos })}
            <Grid container justify="center">
                <Button disabled={allItemsLoaded} variant="contained" disableElevation className={classes.loadButton} onClick={handleLoadMore}>
                    {!allItemsLoaded && <Refresh />}
                    <Box width="5px" />
                    {!allItemsLoaded ? t('commonWords.loadMore') : t('photoReportReview.allLoaded')}
                </Button>
            </Grid>
            <Box height="1em" />
        </>
    )
}

export default PhotoReportsProvider;