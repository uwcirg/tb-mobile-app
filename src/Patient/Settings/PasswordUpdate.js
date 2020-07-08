import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import OverTopBar from '../Navigation/OverTopBar';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    form:{
        width: "80%",
        "& > div":{
            marginBottom: "1em"
        }
    },
    container:{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer:{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    }
})

const CompName = observer(() => {

    const classes = useStyles();
    const {patientStore,patientUIStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        return function cleanup() {
            patientStore.resetPasswordUpdateState();
        }
    },[])

    return (<>
         <OverTopBar title={t("settings.updatePassword")} handleBack={patientUIStore.closePasswordUpdate} ></OverTopBar>
        <div className={classes.container}>
        <form className={classes.form} >
            <TextField
                onChange={(e) => { patientStore.passwordUpdate.currentPassword = e.target.value }}
                value={patientStore.passwordUpdate.currentPassword}
                fullWidth
                className={classes.password}
                id="currentPassword"
                label={t("settings.currentPassword")}
                type="password"
                autoComplete="current-password"
                variant="filled"
                error={patientStore.passwordUpdate.errors.slice().includes("currentPassword")}
            />
            <TextField
                onChange={(e) => { patientStore.passwordUpdate.newPassword = e.target.value }}
                value={patientStore.passwordUpdate.newPassword}
                fullWidth
                className={classes.password}
                id="newPassword"
                label={t("settings.newPassword")}
                type="password"
                autoComplete="new-password"
                variant="filled"
                error={patientStore.passwordUpdate.errors.slice().includes("newPassword")}
            />
            <TextField
                onChange={(e) => { patientStore.passwordUpdate.newPasswordConfirmation = e.target.value }}
                value={patientStore.passwordUpdate.newPasswordConfirmation}
                fullWidth
                className={classes.password}
                id="newPasswordConfirmation"
                label={t("settings.confirmPassword")}
                type="password"
                autoComplete="new-password"
                variant="filled"
                error={patientStore.passwordUpdate.errors.slice().includes("newPasswordConfirmation")}
            />
            <div className={classes.buttonContainer}>
            <Button onClick={patientStore.updatePassword}> {t("settings.submit")}</Button>
            </div>
        </form>
        {patientStore.passwordUpdate.message && <MuiAlert elevation={6} variant="filled" severity={ patientStore.passwordUpdate.success ? "success" : "error"}>{patientStore.passwordUpdate.message}</MuiAlert>}
        </div>

    </>)

})

export default CompName;