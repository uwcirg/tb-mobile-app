import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../Basics/UseStores';
import ReportViews from '../../Components/Shared/ReportViews'

const ProgressPage = observer(() => {

    const { patientStore } = useStores();

    useEffect(() => {
        patientStore.getReports();
    }, [])

    return (<ReportViews
        tabTopPostition={"60px"}
        reports={patientStore.savedReports}
        loading={patientStore.savedReports.length === 0 && !patientStore.savedReportsLoaded}
        patientId={patientStore.userID}
        patient={{ treatmentStart: patientStore.treatmentStart, photoDays: Object.keys(patientStore.photoSchedule)  }}
    />);
});

export default ProgressPage;