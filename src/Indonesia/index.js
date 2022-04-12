import React from 'react';
import { Grid, makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
    pageItem:{
        borderRadius: "5px",
        flexBasis: "45%",
        padding: "1em",
        boxSizing: "border-box",
        backgroundColor: "lightgray"
    },
    container:{
        padding: "1em",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        rowGap: "1em",
        columnGap: "1em"
    }
})

const IndonesiaPatientHome = () => {

    const classes = useStyles();

    return (<div className={classes.container}>
        <PageItem text="Report" />
        <PageItem text="Report" />
        <PageItem text="Report" />
        <PageItem text="Report" />
        <PageItem text="Report" />
    </div>)

}

const PageItem = ({text}) => {
    const classes = useStyles();
    return (<Box className={classes.pageItem}>
            <Typography>{text}</Typography>
        </Box>)

}

export default IndonesiaPatientHome;