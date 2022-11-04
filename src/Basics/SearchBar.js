import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Colors from "./Colors";

const useStyles = makeStyles({
  container: {
    borderRadius: "4px",
    padding: "1px",
    display: "flex",
    alignItems: "center",
    width: "80%",
    margin: "auto",
    backgroundColor: Colors.lightgray,
    "& > svg": {
      margin: "5px",
    },
  },
});

const SearchBar = (props) => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.container} ${props.className && props.className}`}
    >
      <SearchIcon style={{ fontSize: "1.1em", color: Colors.textDarkGray }} />
      <InputBase
        value={props.value}
        placeholder={props.placeholder}
        className={classes.search}
        id={`search-input-${props.kind}`}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default SearchBar;
