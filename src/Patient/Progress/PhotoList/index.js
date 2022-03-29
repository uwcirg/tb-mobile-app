import React, { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import PhotoResponseItem from './PhotoResponseItem';
import PhotoReportsProvider from '../../../Components/Shared/PhotoReportsProvider';
import useStores from '../../../Basics/UseStores';

const useStyles = makeStyles({
    container: {
        padding: "0 .5em"
    },
    title: {
        fontSize: "1.25em",
        padding: ".5em 0"
    }
})

const PhotoList = ({ initalPhotos = [] }) => {

    return (<PhotoReportsProvider initalPhotos={initalPhotos} listComponent={<ListComponent />} />)

}

const ListComponent = ({ photos }) => {

    const classes = useStyles();
    const { t } = useTranslation();
    const { patientStore } = useStores();

    useEffect(() => {
        patientStore.getPhotoReports();
    }, [])

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {photos.map((photoReport) => <PhotoResponseItem key={`photo-list-${photoReport.photoId}`} {...photoReport} />)}
    </div>)
}

export default PhotoList;