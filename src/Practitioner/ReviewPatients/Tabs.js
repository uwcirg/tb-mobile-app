import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import Colors from '../../Basics/Colors';

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
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: "static"
    },
    tab: {
        textTransform: "none",
        color: Colors.textDarkGray
    }
}));

const ReviewPatientTabs = ({value}) => {

    const classes = useStyles();

    return (<AppBar elevation={1} className={classes.root} color="default">
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
                label={<LabelWithDot text="Review"
                    color={Colors.yellow} />} {...a11yProps(0)} />
            <Tab
                className={classes.tab}
                component={Link}
                to="/home/reviewed"
                label={<LabelWithDot text="Viewed"
                    color={Colors.green} />} {...a11yProps(1)} />
                    <Tab
                className={classes.tab}
                component={Link}
                to="/home/all"
                label={<LabelWithDot text="All"
                    color={Colors.buttonBlue} />} {...a11yProps(1)} />
        </Tabs>

    </AppBar>);
}

const LabelWithDot = ({ text, color }) => {
    return (<Grid justify="center" alignItems='center' container>
        <FiberManualRecord style={{ fontSize: "1em", color: color }} />
        <Box width="5px" />
        <Typography>{text}</Typography>
    </Grid>)
}

export default ReviewPatientTabs;