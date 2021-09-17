import React, { useState } from 'react'
import Basicsidebar from '../Shared/BasicSidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import SharedButton from '../Shared/SharedButton'
import QIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from 'react-i18next';
import ImagePopUp from '../Shared/ImagePopUp';
import ClickableText from '../../Basics/ClickableText';
import ExpandIcon from '@material-ui/icons/AspectRatio';
import Label from '../../Components/Label';
import { Typography } from '@material-ui/core';
import { DateTime } from 'luxon';

const useStyles = makeStyles({

    photoContainer: {
        width: "100%",
        ...Styles.flexColumn,
        alignItems: "center",
        "& > img": {
            height: "300px",
            width: "90%",
            objectFit: "contain"
        },
        "& > h2": {
            fontSize: "1em",
            width: "90%"
        }
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    },
    expand: {
        width: "100%",
        display: "flex",
        paddingLeft: "10%",
        marginTop: "1em"
    },
    expandIcon: {
        marginRight: "5px"
    },
    lateArea:{
        width: "100%",
        padding: "1em",
        boxSizing: "border-box"
    },
    label:{
        width: "fit-content",
        marginBottom: ".5em"
    }
})

const PhotoSidebar = observer(() => {
    const [expand, setExpand] = useState(false);

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const item = practitionerStore.filteredPatients.photo[practitionerStore.selectedRow.index];

    const toggleExpanded = () => { setExpand(!expand) }

    return (
        <Basicsidebar buttons={
            <>
                <SharedButton text={t('report.inconclusive')} onClick={() => { practitionerStore.processPhoto(item.photoId, false) }} color={Colors.warningRed} icon={<QIcon />} />
                <SharedButton text={t('report.conclusive')} onClick={() => { practitionerStore.processPhoto(item.photoId, true) }} />
            </>}>
            <div className={classes.photoContainer} >
                <h2>{t("coordinator.sideBar.photoSub")}:</h2>
                {item.backSubmission && <LateSubmissionInfo photoReport={item} />}
                <img className={classes.photoPreview} src={item.url} />
                <div className={classes.expand}>
                    <ClickableText onClick={toggleExpanded} hideIcon text={<><ExpandIcon className={classes.expandIcon} />{t('coordinator.sideBar.expandPhoto')}</>} />
                </div>
                {expand && <ImagePopUp close={toggleExpanded} imageSrc={item.url} />}
            </div>
        </Basicsidebar>
    )
});

const LateSubmissionInfo = ({photoReport}) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    const requestDate = DateTime.fromISO(photoReport.date).toLocaleString(DateTime.DATE_MED)
    const submittedDatetime = DateTime.fromISO(photoReport.createdAt).toLocaleString(DateTime.DATETIME_MED)

    return (
        <div className={classes.lateArea}>
            <Label className={classes.label} backgroundColor={Colors.yellow} text={t('patient.report.late')} />
            <Typography><strong>{t('dashboard.requested')}:</strong> {requestDate}</Typography>
            <Typography><strong>{t('dashboard.submitted')}:</strong> {submittedDatetime}</Typography>
        </div>
    )

}


export default PhotoSidebar;