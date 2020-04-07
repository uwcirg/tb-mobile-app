import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import {makeStyles} from '@material-ui/core/styles/'
import Styles from '../../Basics/Styles'
import ClickableText from '../../Basics/ClickableText'


const useStyles = makeStyles({
    line: {
        display: "block",
        width: "100%",
        borderBottom: "solid 1px lightgray"
    },
    preference: {
        ...Styles.flexRow,
        justifyContent: "space-between",
        width: "90%",
        margin: "auto"

    },
})

const Options = observer(() => {

    const { patientStore, uiStore } = useStores();
    const classes = useStyles();

    return (
        <>
            <div>
                <h1>Language</h1>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={uiStore.isSpanish} onChange={() => { }} name="checkedA" />}
                        label="Spanish" />
                </FormGroup>
            </div>

            <div>
                <h1>Daily Notifications</h1>
                <div className={classes.preference}>
                    <p>Medication Reminder</p>
                    <Switch
                        checked={false}
                        onChange={() => { }}
                        color="primary"
                        name="notification enabled"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                <span className={classes.line} />
                <div className={classes.preference}>
                    <p>Remind Me</p>
                    <ClickableText hideIcon className={classes.blueText} text={"Every Day at 3:40pm"} />
                </div>
            </div>
        </>
    )
});



export default Options;