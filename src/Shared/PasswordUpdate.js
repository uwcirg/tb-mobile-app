import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'

const useStyles = makeStyles({
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        "& > div": {
            marginBottom: "1em"
        }
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    button: {
        display: "block",
        alignSelf: "flex-end",
        marginTop: "2em"
    },
    password: {
        width: "90%",
        height: '1.5em',
        margin: "2em"
    }
})

const PasswordReset = observer(() => {

    const classes = useStyles();
    const { patientUIStore, passwordStore } = useStores();
    const { t } = useTranslation('translation');

    useEffect(() => {
        return function cleanup() {
            passwordStore.resetPasswordUpdateState();
        }
    }, [])

    return (
        <div className={classes.container}>
            <form className={classes.form} >
                <TextField
                    onChange={(e) => { passwordStore.currentPassword = e.target.value }}
                    value={passwordStore.currentPassword}
                    fullWidth
                    className={classes.password}
                    id="currentPassword"
                    label={t("settings.currentPassword")}
                    type="password"
                    autoComplete="current-password"
                    error={passwordStore.errors.slice().includes("currentPassword")}
                />
                <TextField
                    onChange={(e) => { passwordStore.newPassword = e.target.value }}
                    value={passwordStore.newPassword}
                    fullWidth
                    className={classes.password}
                    id="newPassword"
                    label={t("settings.newPassword")}
                    type="password"
                    autoComplete="new-password"
                    error={passwordStore.errors.slice().includes("newPassword")}
                />
                <TextField
                    onChange={(e) => { passwordStore.newPasswordConfirmation = e.target.value }}
                    value={passwordStore.newPasswordConfirmation}
                    fullWidth
                    className={classes.password}
                    id="newPasswordConfirmation"
                    label={t("settings.confirmPassword")}
                    type="password"
                    autoComplete="new-password"
                    error={passwordStore.errors.slice().includes("newPasswordConfirmation")}
                />
                <Button variant="contained" className={classes.button} onClick={passwordStore.updatePassword}> {t("settings.submit")}</Button>
            </form>
            {passwordStore.message && <Snackbar  open={passwordStore.message} autoHideDuration={6000} onClose={() => {passwordStore.message = ""} }>
                <MuiAlert elevation={6} variant="filled" severity={passwordStore.success ? "success" : "error"}>{passwordStore.message}</MuiAlert>
            </Snackbar>}
        </div>)

})

export default PasswordReset;