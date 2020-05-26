import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    container: {
        width: "25%",
        backgroundColor: "lightgray",
    },
    clear:{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        "& > svg": {
            margin: ".5em"
        }
    }
})

const Card = (props) => {

    const classes = useStyles();

    const { practitionerStore } = useStores();

    const setSidebar = (id, type) => {
        practitionerStore.selectedRow.visible = true;
    }

    const handleClick = (id, type) => {
        console.log(" " + id + " " + type)
    }

    const handleClose = () => {
        practitionerStore.selectedRow.clearSelection();
    }

    return (
        <div className={classes.container}>
            <div className={classes.clear}><IconButton onClick={handleClose}><ClearIcon /></IconButton></div>
            {props.children}
        </div>
    )
}

export default Card;