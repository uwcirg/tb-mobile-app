import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontSize: '1.25em',
    },
});

const ListSectionLabel = ({ children, icon }) => {

    const classes = useStyles();

    return (
        <Box padding="8px">
            {icon}
            <Typography className={classes.title} variant="h2">
                {children}
            </Typography>
        </Box>
    );
};

export default ListSectionLabel;
