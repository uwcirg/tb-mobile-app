import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useTranslation } from 'react-i18next';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles({
    container: {
        boxSizing: "border-box",
        width: "100%",
        borderTop: `1px solid ${Colors.lightgray}`,
        paddingTop: "1em",
        "& a:visited , & a":{
            color: "black",
            textDecoration: "none"
        }
    },
   linkIcon: {backgroundColor: Colors.buttonBlue, color: "white", marginRight: ".5em", padding: "10px", borderRadius: "4px 0 0 4px"},
   btn:{backgroundColor: Colors.lighterGray, borderRadius: "0 4px 4px 0", color: Colors.textDarkGray}
})


const ReviewPhotos = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.container}>
             <Link to="/progress">
                <Grid wrap='nowrap' className={classes.btn} alignItems='center' container>
                    <DateRangeIcon className={classes.linkIcon} />
                    <Box width=".5em" />
                    <Typography>{t('patient.progress.calendar')}</Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRightIcon style={{color: Colors.textGray}} />
                    <Box width=".5em" />
                </Grid>
            </Link>
            <Box height=".5em" />
            <Link to="/progress/photos">
                <Grid wrap='nowrap' className={classes.btn} alignItems='center' container>
                    <PhotoLibraryIcon className={classes.linkIcon} />
                    <Box width=".5em" />
                    <Typography >{t('redoPhoto.viewMyPhotos')}</Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRightIcon style={{color: Colors.textGray}} />
                    <Box width=".5em" />
                </Grid>
            </Link>
            <Box height=".5em" />
            <Link to="/home">
                <Grid wrap='nowrap' className={classes.btn} alignItems='center' container>
                    <Edit className={classes.linkIcon} />
                    <Box width=".5em" />
                    <Typography >{t('patient.reportConfirmation.viewOrEdit')}</Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRightIcon style={{color: Colors.textGray}} />
                    <Box width=".5em" />
                </Grid>
            </Link>
        </div>
    )

}



export default ReviewPhotos;