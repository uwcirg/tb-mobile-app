import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../Basics/UseStores';
import ReportViews from '../../Components/Shared/ReportViews'

const ProgressPage = observer(() => {
    
    const { patientStore } = useStores();

    return (<ReportViews reports={patientStore.savedReports} loading={!patientStore.savedReportsLoaded} patientId={patientStore.userID} patient={{treatmentStart: patientStore.treatmentStart}} />);
});

export default ProgressPage;