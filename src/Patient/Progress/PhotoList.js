import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'
import { Box, ButtonBase, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AspectRatioIcon from '@material-ui/icons/ZoomOutMap';
import PhotoStatus from '../../Components/PhotoStatus';
import { DateTime } from 'luxon';


const useStyles = makeStyles({
    container: {
        padding: "0 .5em"
    },
    photo: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: ".5em",
        backgroundColor: Colors.lightgray,
        height: "75px",
        width: "75px",
        backgroundSize: "fill",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        border: "none",
        borderRadius: "4px",
        flexShrink: 0,
    },
    item: {
        padding: ".5em",
        backgroundColor: Colors.lighterGray,
        boxSizing: "border-box",
        borderRadius: "4px",
    },
    title: {
        fontSize: "1.25em",
        padding: ".5em 0"
    },
    expandIcon: {
        fontSize: "1.25em",
        color: "white"
    },
    date: {
        display: "block",
        fontSize: ".75em",
        fontWeight: "bold",
        color: Colors.textDarkGray
    },
    tag: {
        display: "block",
        fontSize: ".75em",
        width: "fit-content",
        padding: "2px 8px",
        marginTop: "auto"
    }
})

const PhotoList = observer(({ photos }) => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>
        <Typography className={classes.title} variant="h2">{t('dashboard.photoReports')}</Typography>
        {patientStore.photoReports.map(photoReport => {
            const displayDate = DateTime.fromISO(photoReport.date).toLocaleString(DateTime.DATE_MED);
            return (
                <div key={`photo-list-${photoReport.id}`}>
                    <Grid alignItems="stretch" wrap="nowrap" className={classes.item} container>
                        <div style={{flexGrow: "1", display: "flex", flexDirection: "column"}}>
                            <Typography className={classes.date}>{displayDate}</Typography>
                            <PhotoStatus className={classes.tag} conclusive={photoReport.approved} />
                        </div>
                        <ButtonBase style={{ backgroundImage: `url(${photoReport.url})` }} className={classes.photo}>
                            <AspectRatioIcon className={classes.expandIcon} />
                        </ButtonBase>
                    </Grid>
                    <Box height=".5em" />
                </div>
            )
        })}
    </div>)

})

export default PhotoList;