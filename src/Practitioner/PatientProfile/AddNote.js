import React from 'react'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver';
import MuiButton from '../../Basics/MuiButton';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'

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
    const { practitionerStore } = useStores();

    return (
        <PopOver close={props.close} title={t("coordinator.patientProfile.addNote.title")}>
            <div className={classes.container}>
            <TextField
                id="title"
                label="title"
            />
            <TextField
                id="note-input"
                outlined
                multiline
                rows={4}
                label="note"
            />
            <MuiButton>Add</MuiButton>
            </div>
        </PopOver>)
});

export default AddNote;
