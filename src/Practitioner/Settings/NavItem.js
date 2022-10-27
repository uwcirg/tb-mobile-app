import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../../Basics/Colors";
import { ButtonBase } from "@material-ui/core";
import useLogout from "../../Basics/Logout";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  navItemContainer: {
    listStyle: "none",
    width: "100%",
    height: "2.5em",
  },
  navItem: {
    boxSizing: "border-box",
    height: "100%",
    margin: "1rem 0 0 0",
    padding: "1.5rem .75rem",
    display: "flex",
    width: "100%",
    borderRadius: "4px",
    color: (props) => (props.selected ? "white" : Colors.buttonBlue),
    backgroundColor: (props) =>
      props.selected ? Colors.textGray : Colors.lightgray,
    "& > span:first-letter": {
      textTransform: "capitalize",
    },
    alignItems: "center",
    justifyContent: "flex-start",
    "& > *:first-child": {
      marginRight: "8px",
    },
    fontSize: "1em",
  },
});

const LinkButton = (props) => {
  const location = useLocation();
  const classes = useStyles({
    selected: props.to === location.pathname,
    isLogout: props.isLogout,
  });

  return (
    <ButtonBase
      component={props.to ? Link : "button"}
      to={props.to}
      href={props.href}
      target={props.href ? "blank" : null}
      onClick={props.onClick}
      className={`${classes.navItem}`}
    >
      {props.icon}
      <span>{props.text}</span>
    </ButtonBase>
  );
};

const NavItem = (props) => {
  const classes = useStyles();
  const logout = useLogout();

  return (
    <li className={classes.navItemContainer}>
      <LinkButton
        to={props.to && `/settings/${props.to}`}
        icon={props.icon}
        href={props.href}
        text={props.text}
        onClick={props.isLogout && logout}
      />
    </li>
  );
};

export default NavItem;
