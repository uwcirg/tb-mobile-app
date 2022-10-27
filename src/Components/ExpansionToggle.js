import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowDown } from "@material-ui/icons";

const useStyles = makeStyles({
  "@keyframes collapse": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(180deg)",
    },
  },
  "@keyframes collapsed": {
    "0%": {
      transform: "rotate(180deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  expanded: {
    animation: `$collapse .2s linear forwards`,
  },
  collapsed: {
    animation: `$collapsed .2s linear forwards`,
  },
  icon: {
    transform: (props) => (props.expanded ? "rotate(180deg)" : ""),
  },
});

export default function ExpansionToggle(props) {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [props.expanded]);

  const classes = useStyles({ expanded: props.expanded });

  return (
    <KeyboardArrowDown
      className={`${classes.icon} ${
        !(renderCount > 1)
          ? ""
          : props.expanded
          ? classes.expanded
          : classes.collapsed
      }`}
    />
  );
}

ExpansionToggle.propTypes = {
  expanded: PropTypes.bool.isRequired,
};
