import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'markdown-to-jsx';
import useStores from './UseStores';
import raw from "raw.macro";


const enChangeLog = raw("../Content/changelog/en.md")
const esChangeLog = raw("../Content/changelog/es-AR.md")

const useStyles = makeStyles({
    changeLog:{
        padding: "1rem",
        "& > div > h2":{
            fontSize: "1em"
        }
    }
})

const ChangeLog = () => {

    const classes = useStyles();
    const {uiStore} = useStores();

    return (
        <div className={classes.changeLog}>
            <Markdown children={uiStore.locale === "en" ? enChangeLog : esChangeLog} />
        </div>)

}

export default ChangeLog;