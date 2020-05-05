
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles({
    search: {

    },
    container: {
        borderRadius: "10px",
        padding: "1px",
        display: "flex",
        alignItems: "center",
        width: "80%",
        margin: "auto",
        backgroundColor: "lightgray",
        "& > svg": {
            margin: "5px"
        }

    }
})

const SearchBar = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <SearchIcon />
            <InputBase

                placeholder={props.placeholder}
                className={classes.search}
                id="search-input"
                onChange={props.handleChange}
            />
        </div>
    )

}

export default SearchBar;



