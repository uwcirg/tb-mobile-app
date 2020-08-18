import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import SurveyHeader from './SurveyHeader'
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'


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
    const { t, i18n } = useTranslation('translation');
    const { activationStore } = useStores();

    //Once password is accepted on the server move to next step
    useEffect(() => {
        if(activationStore.passwordUpdate.passwordAccepted ){
            props.handleNext()
            activationStore.passwordUpdate.passwordAccepted = false;
        }

    },[activationStore.passwordUpdate.passwordAccepted ])

    return (
        <>
            {activationStore.passwordUpdate.passwordLoading ? <Loading /> : <div className={props.bodyClass} >
                <SurveyHeader number={1} title={t("patient.onboarding.password.title")} />
                <form>
                    <TextField
                        onChange={(e) => {activationStore.passwordUpdate.password = e.target.value }}
                        value={activationStore.passwordUpdate.password}
                        fullWidth
                        className={classes.password}
                        id="password-input"
                        label={t("login.password")}
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                    <TextField
                        onChange={(e) => {activationStore.passwordUpdate.passwordConfirmation = e.target.value }}
                        value={activationStore.passwordUpdate.passwordConfirmation}
                        fullWidth
                        className={classes.password}
                        id="password-confirmation-input"
                        label={t("patient.onboarding.password.confirmation")}
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                </form>
                {!activationStore.passwordsMatch && <p>Passwords Do Not Match</p>}
            </div>}
           
            {React.cloneElement(props.button, {
                onClick: () => {
                    activationStore.submitPassword();
                }, disabled: !activationStore.checkPasswords
            })}
        </>
    )

})

export default Password;