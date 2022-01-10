import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AspectRatioIcon from '@material-ui/icons/ZoomOutMap';

const useStyles = makeStyles({
    container: {
        padding: "0 .5em"
    },
    photo: {
        backgroundColor: Colors.lightgray,
        height: "75px",
        width: "75px",
        backgroundSize: "fill",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        borderRadius: "4px"
    },
    item: {
        padding: ".5em",
        backgroundColor: Colors.lighterGray
    },
    title: {
        fontSize: "1.5em",
        padding: ".5em 0"
    },
    expand:{
        fontSize: "1em",
        color: "white"
    }
})

const PhotoList = observer(({ photos }) => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {patientStore.photoReports.map(photoReport => {
            return (
                <div key={`photo-list-${photoReport.id}`}>
                    <Grid className={classes.item} container>
                        <Box flexGrow="1">
                            <Typography>{photoReport.date}</Typography>
                        </Box>
                        <div style={{ backgroundImage: `url(${photoReport.url})` }} className={classes.photo}>
                            <AspectRatioIcon className={classes.expand} />
                        </div>
                        <Box width=".5em" />
                    </Grid>
                    <Box height=".5em" />
                </div>
            )
        })}
    </div>)

})

export default PhotoList;