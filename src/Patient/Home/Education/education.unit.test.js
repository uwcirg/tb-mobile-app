import React from 'react';
import TestWrapper from '../../../Utility/TestInitalizationWrapper'
import ReactDOM from 'react-dom';
import Education from '../Education'
import { stores, history } from '../../../DataStores'
import { DateTime } from 'luxon';

//import { render, fireEvent } from '../test-utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <TestWrapper stores={stores} history={history}>
            <Education />
        </TestWrapper>, div);
    ReactDOM.unmountComponentAtNode(div);
});

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

