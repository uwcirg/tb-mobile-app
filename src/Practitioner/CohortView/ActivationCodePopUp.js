import React from 'react'
import PopOver from '../Shared/PopOver'
import { useTranslation } from 'react-i18next';
import TextCopy from '../../Utility/CopyableText'

const ActivationCodePopup = ({ activationCode, close }) => {

    const { t } = useTranslation('translation');

    if (activationCode) return (<PopOver ignoreClickAway title={t('coordinator.addPatientFlow.forPatient')} close={close}>
        <TextCopy readOnly text={activationCode} />
    </PopOver>)
    return ""

}

export default ActivationCodePopup;