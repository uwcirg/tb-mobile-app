import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    debugging: {
        padding: "1em"
    }
})

const Debugging = observer((props) => {
    const classes = useStyles();
    const { patientStore, uiStore } = useStores();

    return (
        <>
            {window._env.ENVIRONMENT === "development" ?
                <div className={classes.debugging}>
                    <a href="https://redcap.iths.org/surveys/?s=YXW3H4H7A3DNLYDP">Link To Survey To Test</a>
                    Debugging Mode Enabled (config.js or set with environment variable in docker)
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={patientStore.patientInformation.daysInTreatment}
                        onChange={(e) => { patientStore.patientInformation.daysInTreatment = e.target.value }}
                    />
                    <p>Visibily Change Count{uiStore.visibilityChangeCount}</p>
                    <button onClick={() => {
                        patientStore.educationStore.setLocalToOldDateForTesting(DateTime.local().minus({ days: 2 }).toISODate())
                    }}>Update Date of Last Update Read to 2 days ago</button>

                </div> :
                ""}
        </>
    )
})

export default Debugging;