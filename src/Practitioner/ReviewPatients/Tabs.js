import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
  },
  tab: {
    textTransform: "capitalize",
    color: Colors.textDarkGray,
  },
  label: {
    fontSize: "1em",
    color: (props) => props.color,
  },
}));

const ReviewPatientTabs = ({ value }) => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  return (
    <AppBar elevation={1} className={classes.root} color="default">
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab
          className={classes.tab}
          component={Link}
          to="/home/needs-review"
          label={<LabelWithoutDot text={t("reviewIssues.issues")} />}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/home/reviewed"
          label={<LabelWithoutDot text={t("reviewIssues.reviewed")} />}
          {...a11yProps(1)}
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/home/all"
          label={<LabelWithoutDot text={t("time.all")} />}
          {...a11yProps(1)}
        />
      </Tabs>
    </AppBar>
  );
};

const LabelWithoutDot = ({ text }) => {
  return (
    <Grid justify="center" direction="column" alignItems="center" container>
      <Typography variant="h6">{text}</Typography>
    </Grid>
  );
};

export default ReviewPatientTabs;
