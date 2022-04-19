import React, { useEffect, useState } from 'react';
import PatientInformationAPI from '../../../API/PatientInformationAPI';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import OverTopBar from '../../Navigation/OverTopBar';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import Confirmation from './Confirmation';
import ErrorMessage from './ErrorMessage';
import PreSubmissionView from './PreSubmissionView';
import capitalizeFirstLetter from '../../../Utility/StringUtils';

const useStyles = makeStyles({
    container: {
        width: "100%",
        padding: "1em",
        boxSizing: "border-box"
    }
})

const RedoPhotoFlow = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const [photo, setPhoto] = useState(false);
    const [response, setResponse] = useState(false);
    const [loading, setLoading] = useState(false);

    const eligible = patientStore.eligibleForRedoPhoto;

    useEffect(()=>{
        setLoading(true);
        patientStore.getPhotoReports().then( () => {
            setLoading(false);
        })
    },[])

    const handleSubmit = () => {
        if (!patientStore.photoReportWithRedoRequest) {
            throw new Error("PhotoReport with resubmission flag not found")
        }

        const date = patientStore.photoReportWithRedoRequest.date;
        const reportId = patientStore.photoReportWithRedoRequest.photoId;

        setLoading(true);
        new PatientInformationAPI().submitBackPhotoReport(photo, date, reportId).then(report => {
            setLoading(false);
            setResponse(report);
        })
    }

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title={ capitalizeFirstLetter(t('photoReportReview.resubmit'))} />
        <div className={classes.container}>
            {response ? <PostSubmissionView response={response} /> :
                <PreSubmissionView
                    isRedo
                    redoURL={patientStore.photoReportWithRedoRequest?.url}
                    redoReason={patientStore.photoReportWithRedoRequest?.redoReason}
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
    return (<>{success ? <Confirmation /> : <ErrorMessage />}</>);
}

export default RedoPhotoFlow;