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
import ExpandablePhoto from '../../Components/ExpandablePhoto';
import PhotoResultTag from '../../Components/Shared/PhotoResultTag';
import PhotoReportsProvider from '../../Components/Shared/PhotoReportsProvider';

const useStyles = makeStyles({
    header: {
        "& > th": {
            textTransform: "capitalize"
        }
    }
})

const PhotoReportsList = () => {

    const { patientId } = useStores().patientProfileStore;
    return (
        <>
            {!!patientId && <PhotoReportsProvider patientId={patientId} listComponent={<ReportListComponent />} />}
        </>
    )

}

const ReportListComponent = ({ photos }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<Paper className={classes.table}>
        <TableContainer>
            <Table className={classes.spacing} stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>{t('Photo')}</TableCell>
                        <TableCell>{t('coordinator.patientProfile.date')}</TableCell>
                        <TableCell>{t('photoReportReview.result')}</TableCell>
                        <TableCell>{t('report.flags')}</TableCell>
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

    const { t } = useTranslation('translation');

    return (
        <>
            <TableRow>
                <TableCell>
                    <ExpandablePhoto url={url} />
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>
                    <PhotoResultTag skipped={!url} approved={approved} />
                </TableCell>
                <TableCell>{!url && <>{whyPhotoWasSkipped || t('coordinator.sideBar.noReason')}</>}</TableCell>
            </TableRow>
        </>
    )
}

export default PhotoReportsList;