import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import Fab from '@material-ui/core/Fab'
import PlusIcon from '@material-ui/icons/Add'
import Collapse from '@material-ui/core/Collapse'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores'


const useStyles = makeStyles({
    main: {
        padding: "1em 0 1em 0",
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        "& > button > svg": {
            color: Colors.buttonBlue
        }
    },
    base: {
        display: "flex",
        flexDirection: "column",
        height: "300px",
        width: "100%",
        padding: "1em",
        boxSizing: "border-box",
        "& > div": {
            marginTop: "1em"
        }
    },
    title: {
        alignSelf: "flex-start",
        fontSize: "1.25em",
        fontWeight: "normal",
    },
    addTopic: {
    },
    cancel: {
        color: Colors.red
    },
    create: {
        color: Colors.green
    },
    errorInfo:{
        fontSize: ".75em"
    }
})

const AddTopic = observer(() => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { messagingStore } = useStores();
    const add = messagingStore.newChannel.visible;

    return (<div className={classes.addTopic}>
        <Collapse in={add}><AddDiscussion /></Collapse>
        <div className={classes.main}>{!add ? <>{t("messaging.creation.fab")} <Fab size="small" style={{ backgroundColor: Colors.buttonBlue, boxShadow: "none" }} onClick={() => {messagingStore.newChannel.visible = true  }}><PlusIcon style={{ color: "white" }} /></Fab></> :
            <>
                <Button className={classes.cancel} onClick={() => { messagingStore.newChannel.visible = false }}>{t("messaging.creation.cancel")}</Button>
                <Button onClick={messagingStore.submitNewChannel} className={classes.create}>{t("messaging.creation.create")}</Button>
            </>
        }</div>
    </div>)

})

const AddDiscussion = observer(() => {

    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const {practitionerUIStore} = useStores();
    const { newChannel, updateNewTitle, updateNewSubtitle } = useStores().messagingStore;

    const values = Object.values(newChannel.errors)

    useEffect(() => {
        if (values.length > 0) {
           practitionerUIStore.alert = t('messaging.creation.error')
        }

    }, [newChannel.errors])

    return (<div className={classes.base}>
        <h2 className={classes.title}>{t("messaging.creation.header")}</h2>
        <TextField
            error={newChannel.errors.title}
            value={newChannel.title}
            onChange={(e) => { updateNewTitle(e.target.value) }}
            fullWidth
            variant="outlined"
            label={t("messaging.creation.title")}
            placeholder={t("messaging.creation.title")} />
        <TextField
            error={newChannel.errors.subtitle}
            value={newChannel.subtitle}
            onChange={(e) => { updateNewSubtitle(e.target.value) }}
            multiline
            rows={2}
            fullWidth
            variant="outlined"
            label={t("messaging.creation.description")}
            placeholder={t("messaging.creation.description")} />

    {values.length > 0 && <p className={classes.errorInfo}>{t("messaging.creation.errorInfo")}</p>}



    </div>)

})


export default AddTopic;