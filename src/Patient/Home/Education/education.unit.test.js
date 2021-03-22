import React from 'react';
import TestWrapper from '../../../Utility/test-utils'
import ReactDOM from 'react-dom';
import Education from '../Education'
//import { stores, history } from '../../../DataStores'
import { DateTime } from 'luxon';

import {render, screen, stores } from '../../../Utility/test-utils'

//import { render, fireEvent } from '../test-utils';

it('renders using render function without errror', () => {
    render(<Education />)
});

it('can modify stores',() => {
    updateOpenState();
    render(<Education />)

});


const updateOpenState = () => {
    stores.patientStore.patientInformation.daysInTreatment = 5;
    stores.patientStore.patientInformation.loaded = true;
    stores.patientStore.educationStore.setLocalToOldDateForTesting(DateTime.local().minus({days: 5}).toISODate())
    stores.patientStore.educationStore.updateCurrentDate();
    stores.patientStore.educationStore.dateOfLastUpdateRead = DateTime.local().minus({days: 5}).toISODate()
}

// it("does not render an education message if its already been viewed today", () => {
//     stores.patientStore.educationStore.updateCurrentDate();
//     stores.patientStore.educationStore.setLocalDateOfLastReadAsToday();

//     //dayShown = DateTime.local().toISODate();

//     const wrapper = mount(<TestWrapper>
//         <Education />
//     </TestWrapper>);
//     //const welcome = <h1>Display Active Users Account Details</h1>;

//     expect(wrapper.toEqual(<></>))
//     //expect(wrapper.contains(welcome)).toEqual(true);
// });

