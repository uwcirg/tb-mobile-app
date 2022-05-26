import React from 'react';
import Greeting from '../Greeting';
import { render, stores, fireEvent } from '../../../Utility/test-utils'
import isIndonesiaPilot from '../../../Utility/check-indonesia-flag';

jest.mock('../../../Utility/check-indonesia-flag', () => jest.fn());

describe('greeting message', () => {

    it('renders without error', () => {
        render(<Greeting />)
    });

    it('does not show up when indonesia env variable is not true', () => {
        isIndonesiaPilot.mockReturnValue(false)
        const { queryByTestId } = render(<Greeting />)
        stores.patientStore.patientInformation.daysInTreatment = 0;
        let message = queryByTestId('motivational-message')
        expect(message).not.toBeInTheDocument();
    })

    it('shows the day zero message on a patients first day', () => {
        isIndonesiaPilot.mockReturnValue(true)
        const { getByTestId } = render(<Greeting />)
        stores.patientStore.patientInformation.daysInTreatment = 0;
        const message = getByTestId('motivational-message')
        expect(message).toHaveTextContent("Selamat datang di layanan pendamping minum obat! Masa depan cerah menantimu 😊")
    })  

    it('shows the proper message on a patients 113th day', () => {
        isIndonesiaPilot.mockReturnValue(true)
        const { getByTestId } = render(<Greeting />)
        stores.patientStore.patientInformation.daysInTreatment = 113;
        const message = getByTestId('motivational-message')
        expect(message).toHaveTextContent("Jangan lupa untuk selalu mengecek persediaan obat kamu")
    })


})

