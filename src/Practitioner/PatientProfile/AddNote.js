import React, {useState, useEffect} from 'react'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver';
import MuiButton from '../../Basics/MuiButton';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import PractitionerUIStore from '../../DataStores/practitionerUIStore';

const useStyles = makeStyles({
    popOverBody: {
        marginBottom: "1em"
    },
    container:{
        display: "flex",
        flexDirection: "column",
        "& > button":{
            marginTop: "1em",
            width: "50%"
        }
    }
})

const AddNote = observer((props) => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const { practitionerStore, practitionerUIStore } = useStores();

    const [title,setTitle] = useState("");
    const [note,setNote] = useState("");

    useEffect(() => {
        return function cleanup(){
            setTitle("");
            setNote("");
        }
    },[])

    const submitNote = () => {
        practitionerStore.postPatientNote(title,note);
        practitionerUIStore.closeAddPatientNote();
    }

    return (
        <PopOver close={props.close} title={`${t("coordinator.patientProfile.addNote.header")} ${practitionerStore.selectedPatient.details.givenName}`}>
            <div className={classes.container}>
            <TextField
                id="title"
                value={title}
                onChange={e => {setTitle(e.target.value)}}
                label={t("coordinator.patientProfile.addNote.title")}
            />
            <TextField
                id="note-input"
                onChange={e => {setNote(e.target.value)}}
                value={note}
                outlined
                multiline
                rows={4}
                label={t("coordinator.patientProfile.addNote.note")}
            />
            <MuiButton disabled={!title || !note} onClick={submitNote}>{t("coordinator.patientProfile.addNote.button")}</MuiButton>
            </div>
        </PopOver>)
});

export default AddNote;
