import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton, Modal, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

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
    exitButton: {
        paddingLeft: "0"
    },
    scrollableArea: {
        flexGrow: 1,
        overflow: "scroll"
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
                    <Box padding="1em">
                        <Typography>{topBarTitle}</Typography>
                    </Box>
                    <Box flexGrow="1" />
                    <IconButton className={classes.exitButton} onClick={handleExit}>
                        <Clear />
                    </IconButton>
                </Grid>}
                <div className={classes.scrollableArea}>
                    {children}
                </div>
            </div>
        </Modal>
    )

};


export default PopOverV2;