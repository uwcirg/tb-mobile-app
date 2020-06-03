
import React from 'react'
import Basicsidebar from '../Shared/BasicSidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { groupBy } from 'lodash';

const SymptomSidebar = observer((props) => {
    const { practitionerStore } = useStores();
    const symptomGroups = groupBy(practitionerStore.filteredPatients.symptoms[practitionerStore.selectedRow.id].symptomSummary);
    
    return (
        <Basicsidebar>
            <h2>Symptoms Sice Last Resolution:</h2>
        </Basicsidebar>
    )
});

export default SymptomSidebar;