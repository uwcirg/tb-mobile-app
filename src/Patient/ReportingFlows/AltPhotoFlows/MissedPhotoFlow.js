import React, { useState } from 'react';
import PatientInformationAPI from '../../../API/PatientInformationAPI';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import OverTopBar from '../../Navigation/OverTopBar';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import Confirmation from './Confirmation';
import ErrorMessage from './ErrorMessage';
import PreSubmissionView from './PreSubmissionView';

const useStyles = makeStyles({
    container: {
        width: "100%",
        padding: "1em",
        boxSizing: "border-box"
    },
    topText: {
        padding: "1em 0"
    },
    strip: {
        display: "block",
        height: '50vh',
        width: '90%',
        "& > img": {
            objectFit: 'contain',
            height: '100%',
            width: '100%'
        },
        margin: 'auto'
    },
    fullWidth: {
        padding: "0 1em",
        boxSizing: "border-box"
    },
    loading: {
        height: "80vh"
    }
})

const MissedPhotoFlow = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const [photo, setPhoto] = useState(false);
    const [response, setResponse] = useState(false);
    const [loading, setLoading] = useState(false);

    const eligible = patientStore.eligibleForBackPhoto;

    const handleSubmit = () => {
        setLoading(true);
        new PatientInformationAPI().submitBackPhotoReport(photo, patientStore.lastPhotoRequestStatus.dateOfRequest).then(report => {
            setLoading(false);
            setResponse(report);
        })
    }

    const requestDateFormatted = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({ day: "numeric", month: "long" });

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title={t('missedPhotoDetails.topBarText')} />
        <div className={classes.container}>
            {response ? <PostSubmissionView response={response} /> :
                <PreSubmissionView
                    requestDateFormatted={requestDateFormatted}
                    photo={photo}
                    eligible={eligible}
                    setPhoto={setPhoto}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />}
        </div>
    </>)
});

const PostSubmissionView = ({ response }) => {
    const success = response.httpStatus < 400;
    return (<>{ success ? <Confirmation /> : <ErrorMessage />}</>);
}

export default MissedPhotoFlow;