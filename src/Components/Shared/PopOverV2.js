import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton, Modal, Typography } from '@material-ui/core';
import { ChevronLeftRounded, Clear } from '@material-ui/icons';

const useStyles = makeStyles({
    modalContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll"
    },
    topBar: {
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: "100",
        borderBottom: "1px solid lightgray"
    },
    scrollableArea: {
        flexGrow: 1,
        overflow: "scroll"
    },
    backButton: {
        "& svg":{
            fontSize: "1.5em",
        },
        color: "black"
    }
})

const PopOverV2 = ({ open, children, disableTopBar, topBarTitle, handleExit }) => {

    const classes = useStyles();

    return (
        <Modal
            BackdropProps={{ style: { backgroundColor: "white" } }}
            open={open}>
            <div className={classes.modalContainer}>
                {!disableTopBar && <Grid className={classes.topBar} container alignItems='center' wrap="nowrap">
                    <IconButton className={classes.backButton} onClick={handleExit}>
                        <ChevronLeftRounded />
                    </IconButton>
                    <Typography style={{ fontSize: "1.25em", padding: ".5em 0" }} variant="h2">{topBarTitle}</Typography>
                </Grid>}
                <div className={classes.scrollableArea}>
                    {children}
                </div>
            </div>
        </Modal>
    )

};


export default PopOverV2;