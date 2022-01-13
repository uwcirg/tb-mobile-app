import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PatientInformationAPI from '../../../API/PatientInformationAPI';
import PhotoResponseItem from './PhotoResponseItem';


const useStyles = makeStyles({
    container: {
        padding: "0 .5em"
    },
    title: {
        fontSize: "1.25em",
        padding: ".5em 0"
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

    useEffect(() => {
        loadPhotos();
    }, [])

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {photos.map((photoReport) => <PhotoResponseItem {...photoReport} />)}
        <Box padding="1em 0">
            <button onClick={() => { loadPhotos(photos.length) }}>{t('commonWords.clickToLoadMore')}</button>
        </Box>
    </div>)

})

export default PhotoList;