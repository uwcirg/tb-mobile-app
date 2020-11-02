import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import ButtonBase from '@material-ui/core/ButtonBase'
import DocIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    document: {
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        padding: ".5em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "300px",
        "& > p":{
           marginTop: ".5em"
        }
    },
    documentHeader: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        "& > h3":{
            fontSize: "1.5em"
        }
    },
    container: {
        padding: "1em"
    }
})

const Documents = () => {

    const classes = useStyles();

    return (<div className={classes.container}>
        <Document />
    </div>)

}

const Document = (props) => {
    const classes = useStyles();
    return (
        <ButtonBase className={classes.document} target="blank" href="https://docs.google.com/document/d/14b8LLBAgWyF21isDdztHXOksvo5JC0LBDY6iyTKs13Y/edit?usp=sharing">
            <div className={classes.documentHeader}>
                <DocIcon style={{fontSize: "2em"}} />
                <Typography variant="h3">Application Manual</Typography>
            </div>

            <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nulla quis libero consequat sodales.
            </Typography>

        </ButtonBase>
    )
}

export default Documents;