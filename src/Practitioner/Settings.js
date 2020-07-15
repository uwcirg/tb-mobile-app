import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';
import LanguageQuestion from '../Basics/LanguageQuestion';


const useStyles = makeStyles({
    image: {
        height: "100px",
        marginLeft: "auto"
    },
    report: {
        display: "flex",
        width: "100%",
        border: "2px solid lightgray"

    },
    container: {
        width: "100%",
        marginLeft: "1em"
    },
    reportContainer: {
        width: "50%"
    },
    patient: {
        backgroundColor: "lightgray"
    }
})

const Settings = observer((props) => {

    const { practitionerStore } = useStores();

    useEffect(() => {
        practitionerStore.getRecentReports()
    }, [])


    const classes = useStyles();

    return (<div className={classes.container}>
        <h1>Settings</h1>
        <LanguageQuestion />
    </div>)

});

export default Settings;