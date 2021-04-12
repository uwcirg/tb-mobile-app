import React from 'react';
import Education from '../Education'
import { DateTime } from 'luxon';

import { render, screen, stores, waitFor} from '../../../Utility/test-utils'

const updateOpenState = () => {
    stores.patientStore.patientInformation.daysInTreatment = 5;
    stores.patientStore.patientInformation.loaded = true;
    stores.patientStore.educationStore.setLocalToOldDateForTesting(DateTime.local().minus({ days: 5 }).toISODate())
    stores.patientStore.educationStore.updateCurrentDate();
    stores.patientStore.educationStore.dateOfLastUpdateRead = DateTime.local().minus({ days: 5 }).toISODate()
}

it('renders using render function without errror', () => {
    render(<Education />)
});

it('does not render by default', () => {
    render(<Education />)
    expect(screen.queryByTestId('education-body')).toBeNull();
})

it('can modify stores', () => {
    updateOpenState();
    render(<Education />)
});

test('update appears when its a new day', async () => {
    stores.patientStore.educationStore.updateCurrentDate();
    stores.patientStore.educationStore.setDateOfLastUpdateRead(DateTime.local().minus({ days: 1 }).toISODate())
    render(<Education />)
    await waitFor(() => { 
        expect(screen.queryByTestId('education-body')).toBeInTheDocument();
    })
}) 

test('disapear when marked as read for the day', async () => {
    stores.patientStore.educationStore.updateCurrentDate();
    stores.patientStore.educationStore.setDateOfLastUpdateRead(DateTime.local().toISODate())
    render(<Education />)
    await waitFor(() => { 
        expect(screen.queryByTestId('education-body')).not.toBeInTheDocument();
    })
}) 


