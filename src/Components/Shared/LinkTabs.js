import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Typography, Tab, Tabs, AppBar, Box } from '@material-ui/core';
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

const LinkTabs = ({ label, tabs }) => {

    const location = useLocation();
    const classes = useStyles();

    const urlParts = location.pathname.split("/")
    const tabIndex = tabs.findIndex(_tab => {
        return urlParts[urlParts.length - 1] === _tab.link;
    }) 


    return (<AppBar elevation={1} className={classes.root} color="default">
        <Tabs
            indicatorColor="primary"
            value={tabIndex > -1 ? tabIndex : 0}
            variant="fullWidth"
            aria-label={label}>
            {tabs.map(tab => {
                return (
                    <Tab
                        key={`tab-${tab.text}`}
                        className={classes.tab}
                        component={Link}
                        to={tab.link}
                        label={<Label icon={tab.icon} text={tab.text} />} {...a11yProps(0)} />)

            })}
        </Tabs>

    </AppBar>);
}

const Label = ({ text, icon }) => {
    return (<Grid direction='column' justify="center" alignItems='center' container>
        {React.createElement(icon)}
        <Box width="5px" />
        <Typography style={{fontSize: ".75em"}}>{text}</Typography>
    </Grid>)
}

export default LinkTabs;