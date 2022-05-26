import React from 'react';
import { PageLabel } from "../../../Components/Shared/PageLabel";
import PopOverV2 from "../../../Components/Shared/PopOverV2";
import StickyTopBar from "../../../Components/Shared/StickyTopBar";
import { useTranslation } from 'react-i18next';

export default function AddAppointment({ handleClose }) {
    const { t } = useTranslation('translation');
    return (<PopOverV2 open disableTopBar>
        <StickyTopBar>
            <PageLabel title={t('appointments.addAppointment')} handleExit={handleClose} />
        </StickyTopBar>
    </PopOverV2>)
}