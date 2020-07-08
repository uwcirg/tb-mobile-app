import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({

})

const CompName = () => {

    const classes = useStyles();

    return (<div>
        <form>
            <TextField
                onChange={(e) => { activationStore.passwordUpdate.password = e.target.value }}
                value={activationStore.passwordUpdate.password}
                fullWidth
                className={classes.password}
                id="password-input"
                label={t("translation:login.password")}
                type="password"
                autoComplete="current-password"
                variant="filled"
            />
            <TextField
                onChange={(e) => { activationStore.passwordUpdate.passwordConfirmation = e.target.value }}
                value={activationStore.passwordUpdate.passwordConfirmation}
                fullWidth
                className={classes.password}
                id="password-confirmation-input"
                label={t("password.confirmation")}
                type="password"
                autoComplete="current-password"
                variant="filled"
            />
            <TextField
                onChange={(e) => { activationStore.passwordUpdate.passwordConfirmation = e.target.value }}
                value={activationStore.passwordUpdate.passwordConfirmation}
                fullWidth
                className={classes.password}
                id="password-confirmation-input"
                label={t("password.confirmation")}
                type="password"
                autoComplete="current-password"
                variant="filled"
            />
        </form>

    </div>)

}

export default CompName;