import React, { useEffect } from 'react';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';

const PushActionReportingFlow = observer(() => {

    const { uiStore, patientStore, patientUIStore } = useStores();
    const search = uiStore.router.location.search;

    const noIssues = search.includes("noIssues=true")
    const hadIssues = search.includes("issues=true")

    useEffect(() => {
        if (noIssues) {
            patientStore.reportStore.oneStepReport();
            uiStore.push("/")
        } else if (hadIssues) {
            patientUIStore.moveToReportFlow();
        }
    }, [search])

})


export default PushActionReportingFlow;