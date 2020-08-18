import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react'
import ReportCard from './ReportCard'
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors'
import { useTranslation } from 'react-i18next';
import ReportItem from './ReportCardItem';

const useStyles = makeStyles({

})

const CompName = observer(() => {

    const classes = useStyles();
    const notes = useStores().practitionerStore.selectedPatient.notes;
    const { t, i18n } = useTranslation('translation');

    return (<div>
        {notes.length > 0 ? notes.map(note => {
            return (
                <ReportCard 
                tagText={t('note')}
                tagColor={Colors.noteBlue}
                date={note.createdAt}>
                    <ReportItem title={"Title"} content={note.title} />
                    <ReportItem title={"Detail"} content={note.note} />
                </ReportCard>
            )
        }) : <p> No Notes Found</p>}

    </div>)

})

export default CompName;