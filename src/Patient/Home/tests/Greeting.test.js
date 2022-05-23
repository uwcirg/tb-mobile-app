import React from 'react';
import Greeting from '../Greeting';
import { render, stores, fireEvent } from '../../../Utility/test-utils'

describe('greeting message', () => {

    const env = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...env }
    })

    afterEach(() => {
        process.env = env
    })

    it('renders without error', () => {
        render(<Greeting />)
    });

    it('does not show up when indonesia env variable is not true', () => {
        process.env.REACT_APP_IS_INDONESIA = 'false'
        const { queryByTestId } = render(<Greeting />)
        stores.patientStore.patientInformation.daysInTreatment = 0;
        let message = queryByTestId('motivational-message')
        expect(message).not.toBeInTheDocument();
    })

    it('shows the day zero message on a patients first day', () => {
        process.env.REACT_APP_IS_INDONESIA = 'true'
        const { getByTestId } = render(<Greeting />)
        stores.patientStore.patientInformation.daysInTreatment = 0;
        const message = getByTestId('motivational-message')
        expect(message).toHaveTextContent("Selamat datang di layanan pendamping minum obat! Masa depan cerah menantimu 😊")
    })  

    it('shows the proper message on a patients 113th day', () => {
        process.env.REACT_APP_IS_INDONESIA = 'true'
        const { getByTestId } = render(<Greeting />)
        stores.patientStore.patientInformation.daysInTreatment = 113;
        const message = getByTestId('motivational-message')
        expect(message).toHaveTextContent("Jangan lupa untuk selalu mengecek persediaan obat kamu")
    })


})

