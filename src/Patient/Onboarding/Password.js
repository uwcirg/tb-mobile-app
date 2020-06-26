import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import SurveyHeader from './SurveyHeader'
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    password: {
        marginBottom: "2em",
        "&:before": {
            borderBottom: "0px solid gray"
        }
    }
})

const Password = observer((props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation(['onboarding', 'translation']);
    const { activationStore } = useStores();

    return (
        <>
            <div className={props.bodyClass} >
                <SurveyHeader number={1} title={t("password.title")} />
                <form>
                    <TextField
                        onChange={(e) => {activationStore.onboardingInformation.newPassword = e.target.value }}
                        value={activationStore.onboardingInformation.newPassword}
                        fullWidth
                        className={classes.password}
                        id="password-input"
                        label={t("translation:login.password")}
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                    <TextField
                        onChange={(e) => {activationStore.onboardingInformation.newPasswordConfirmation = e.target.value }}
                        value={activationStore.onboardingInformation.newPasswordConfirmation}
                        fullWidth
                        className={classes.password}
                        id="password-confirmation-input"
                        label={t("password.confirmation")}
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                </form>
            </div>
            {React.cloneElement(props.button, {
                onClick: () => {
                    console.log("test")
                    props.handleNext()
                }, disabled: !activationStore.checkPasswords
            })}
        </>
    )

})

export default Password;