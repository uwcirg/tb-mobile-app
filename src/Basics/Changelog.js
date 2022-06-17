import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";

const enChangeLog = raw("../Content/changelog/en.md")

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

    return (
        <div className={classes.changeLog}>
            <Markdown children={enChangeLog} />
        </div>)

}

export default ChangeLog;