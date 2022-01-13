import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Colors from '../../Basics/Colors';
import { CameraAlt } from '@material-ui/icons';
import Pill from '../../Basics/Icons/Pill';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        backgroundColor: Colors.lightgray,
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

    useEffect(()=>{
        
    },[])

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Tabs centered classes={{ indicator: classes.indicator }} className={classes.tabs} value={activeTab} onChange={handleChange} aria-label="progress view switch">
                <Tab className={classes.tab} label={<Pill />} {...a11yProps(0)} />
                <Tab className={classes.tab} label={<CameraAlt />} {...a11yProps(1)} />
            </Tabs>
            {content[activeTab]}
        </>

    );
}
