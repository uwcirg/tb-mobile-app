import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import {observer} from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Colors from '../../Basics/Colors'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    archived: {
        width: "100%",
        backgroundColor: Colors.warningRed,
        color: "white",
        padding: "1em",
        "& > p": {
            marginLeft: ".5em"
        }

    }
})

const ArchivedOptions = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const {patientProfileStore} = useStores();

    return (
        <>
        {patientProfileStore.isArchived && <Grid container alignItems="center" justify="center" className={classes.archived}>
            <ErrorOutlineIcon />
            <Typography variant="body1">{t('archive.warningShort')}</Typography>
        </Grid>}
        </>
        )
})


export default ArchivedOptions;