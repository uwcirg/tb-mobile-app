import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MinusIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
    button:{
        "& > span > svg": {
            fontSize: "2em"
        }
    },
    numberSelector: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})


const AddSubtractField = ({value,setValue}) => {

    const classes = useStyles();

    const handleChange = (toAdd) => {
        setValue( value + toAdd);
    }

    return (
        <div className={classes.numberSelector}>
            <IconButton disabled={value === 0} className={classes.button} onClick={() => { handleChange(-1) }}>
                <MinusIcon />
            </IconButton>
            <p>{value}</p>
            <IconButton className={classes.button} onClick={() => { handleChange(1) }}>
                <AddIcon />
            </IconButton>
        </div>
    );

}

export default AddSubtractField;