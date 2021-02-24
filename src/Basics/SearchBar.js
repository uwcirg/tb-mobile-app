import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
        <div className={`${classes.container} ${props.className && props.className}`}>
            <SearchIcon />
            <InputBase
                placeholder={props.placeholder}
                className={classes.search}
                id={`search-input-${props.kind}`}
                onChange={props.handleChange}
            />
        </div>
    )

}

export default SearchBar;



