import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../Basics/Colors'
import Fab from '@material-ui/core/Fab'
import PlusIcon from '@material-ui/icons/Add'
import Collapse from '@material-ui/core/Collapse'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    main: {
        padding: "1em 0 1em 0",
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        "& > button > svg": {
            color: Colors.buttonBlue
        }
    },
    base: {
        display: "flex",
        flexDirection: "column",
        height: "300px",
        width: "100%",
        padding: "1em",
        boxSizing: "border-box",
        "& > div":{
            marginTop: "1em"
        }
    },
    title: {
        alignSelf: "flex-start",
        fontSize: "1.25em",
        fontWeight: "normal",
    },
    addTopic:{
    }
})

const AddTopic = () => {

    const [add, setAdd] = useState(false);

    const classes = useStyles();

    return (<div className={classes.addTopic}>
        <Collapse in={add}><AddDiscussion /></Collapse>
        <div className={classes.main}>{!add ? <>Add Discussion Topic <Fab size="small" style={{ backgroundColor: Colors.buttonBlue, boxShadow: "none" }} onClick={() => { setAdd(true) }}><PlusIcon style={{ color: "white" }} /></Fab></> :
            <><Button onClick={() => { setAdd(false) }}>Cancel</Button>
                <Button>Submit</Button>
            </>
        }</div>
    </div>)

}

const AddDiscussion = () => {

    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    return (<div className={classes.base}>
        <h2 className={classes.title}>Add New Discussion</h2>
        <TextField fullWidth variant="outlined" label="Discussion Title" placeholder="hello"></TextField>
        <TextField multiline rows={2} fullWidth variant="outlined" placeholder="Description"></TextField>



    </div>)

}


export default AddTopic;