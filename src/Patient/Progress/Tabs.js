import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Colors from '../../Basics/Colors';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Pill from '../../Basics/Icons/Pill';

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
        boxShadow: "none",
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

export default function SimpleTabs({ activeTab, setTab, content }) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Tabs centered classes={{ indicator: classes.indicator }} className={classes.tabs} value={activeTab} onChange={handleChange} aria-label="progress view switch">
                <Tab className={classes.tab} label={<Pill />} {...a11yProps(0)} />
                <Tab className={classes.tab} label={<PhotoLibraryIcon />} {...a11yProps(1)} />
            </Tabs>
            {content[activeTab]}
        </>

    );
}
