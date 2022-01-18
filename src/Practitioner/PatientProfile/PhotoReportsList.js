import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import useStores from '../../Basics/UseStores';
import PatientInformationAPI from '../../API/PatientInformationAPI';

const useStyles = makeStyles({
    header: {
        "& > th":{
            textTransform: "capitalize"
        }
    },
    image:{
        height: "75px",
        width: "75px"
    }
})

const PhotoReportsList = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { selectedPatientReports, patientId } = useStores().patientProfileStore;
    const [photos,setPhotos] = useState([]);

    const api = new PatientInformationAPI();

    const getPhotos = async (offset = 0) => {
        if(patientId){
            let reports = await api.getPhotoReports(offset,patientId);
            setPhotos([...reports,...photos]);
        }
    }

    useEffect(()=>{
        getPhotos();
    },[patientId])

    return (<Paper className={classes.table}>
        <TableContainer>
            <Table className={classes.spacing} stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>{t('coordinator.patientProfile.date')}</TableCell>
                        <TableCell>{t('photoReportReview.result')}</TableCell>
                        <TableCell>{t('flags')}</TableCell>
                        <TableCell>{t('Photo')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {photos.map((row) => (
                        <Row key={`patient-report-${row.id}`} {...row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>)

}

const Row = ({ date, approved, url, whyPhotoWasSkipped }) => {

    const classes = useStyles();

    return (<TableRow>
        <TableCell>{date}</TableCell>
        <TableCell>{approved ? "yes" : "no"}</TableCell>
        <TableCell>Flags</TableCell>
        <TableCell>{url ? <img className={classes.image} src={url} /> : "Skipped"}</TableCell>
    </TableRow>)
}

export default PhotoReportsList;