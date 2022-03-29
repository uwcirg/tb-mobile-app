import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Colors from '../../Basics/Colors';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Pill from '../../Basics/Icons/Pill';
import { Link } from 'react-router-dom';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        zIndex: 2,
        boxShadow: "none",        
        position: "sticky",
        top: 0,
        left: 0,
        backgroundColor: "white"
    },
    tab: {

        display: "flex",
        flexGrow: 1,
        color: Colors.buttonBlue
    },
    indicator: {
        backgroundColor: Colors.buttonBlue
    }
}));

export default function SimpleTabs({ activeTab, content }) {
    const classes = useStyles();
    return (
        <>
            <Tabs centered classes={{ indicator: classes.indicator }} className={classes.tabs} value={activeTab} aria-label="progress view switch">
                <Tab component={Link} to="/progress/calendar" className={classes.tab} label={<Pill />} {...a11yProps(0)} />
                <Tab component={Link} to="/progress/photos" className={classes.tab} label={<PhotoLibraryIcon />} {...a11yProps(1)} />
            </Tabs>
            {content[activeTab]}
        </>

    );
}
