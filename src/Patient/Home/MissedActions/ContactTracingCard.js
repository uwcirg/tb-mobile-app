import React from 'react';
import useStores from '../../../Basics/UseStores';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from 'react-i18next';
import MissedActionCard from './MissedActionCard';
import ButtonLayout from './ButtonLayout';

const ContactTracingCard = () => {
    const {uiStore} = useStores();
    const { t } = useTranslation('translation');

    const openContactTracing = () => { uiStore.push('/contactTracing') }

    return (
        <MissedActionCard>
            <ButtonLayout
                text={t('updatedContactTracing.button')}
                icon={<EditIcon />}
                onClick={openContactTracing}
            />
        </MissedActionCard>)

}

export default ContactTracingCard;