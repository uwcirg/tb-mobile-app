import React from 'react';
import HomePageCard from '../../../Components/Patient/HomePageCard';
import NewButton from '../../../Basics/NewButton';
import useStores from '../../../Basics/UseStores';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    contactTracing: {
        "& > button": {
            textTransform: "capitalize"
        }
    }
})

const ContactTracingCard = () => {

    const classes = useStyles();
    const {uiStore} = useStores();
    const { t } = useTranslation('translation');

    const openContactTracing = () => { uiStore.push('/contactTracing') }

    return (<HomePageCard className={classes.contactTracing} upperText="">
            <NewButton onClick={openContactTracing} icon={<EditIcon />} text={t('updatedContactTracing.button')} />
        </HomePageCard>)

}

export default ContactTracingCard;