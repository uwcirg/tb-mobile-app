import React from 'react'
import Basicsidebar from '../Shared/BasicSidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import SharedButton from '../Shared/SharedButton'
import QIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({

    photoContainer: {
        width: "100%",
        ...Styles.flexColumn,
        alignItems: "center",
        "& > img": {
            height: "300px",
            width: "90%",
            objectFit: "contain"
        },
        "& > h2":{
            fontSize: "1em",
            alignSelf: "flex-start"
        }
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    }
})

const PhotoSidebar = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();

    const { t, i18n } = useTranslation('translation');

    const item = practitionerStore.photoReports[practitionerStore.selectedRow.index];

    return (
        <Basicsidebar>
            <div className={classes.photoContainer} >
                <h2>{t("coordinator.sideBar.photoSub")}:</h2>
                <img className={classes.photoPreview} src={item.url} />
            </div>
            <div className={classes.buttonContainer}>
                <SharedButton text={"Positive"} onClick={() => {practitionerStore.processPhoto(item.photoId,true)}} />
                <SharedButton text={"Inconclusive"} onClick={() => {practitionerStore.processPhoto(item.photoId,false)}} color={Colors.yellow} icon={<QIcon />} />
            </div>
        </Basicsidebar>
    )
});


export default PhotoSidebar;