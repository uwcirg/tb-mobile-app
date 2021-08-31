import React, {useState} from 'react'
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
import ImagePopUp from '../Shared/ImagePopUp';
import ClickableText from '../../Basics/ClickableText';
import ExpandIcon from '@material-ui/icons/AspectRatio';

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
        "& > h2": {
            fontSize: "1em",
            width: "90%"
        }
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    },
    expand:{
        width: "100%",
        display: "flex",
        paddingLeft: "10%"
    },
    expandIcon:{
        marginRight: "5px"
    }
})

const PhotoSidebar = observer(() => {
    const [expand,setExpand] = useState(false);

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const {t} = useTranslation('translation');
    const item = practitionerStore.filteredPatients.photo[practitionerStore.selectedRow.index];

    const toggleExpanded = () => { setExpand(!expand)}

    return (
        <Basicsidebar buttons={
            <>
                <SharedButton text={t('report.inconclusive')} onClick={() => { practitionerStore.processPhoto(item.photoId, false) }} color={Colors.yellow} icon={<QIcon />} />
                <SharedButton text={t('report.conclusive')} onClick={() => { practitionerStore.processPhoto(item.photoId, true) }} />
            </>}>
            <div className={classes.photoContainer} >
                <h2>{t("coordinator.sideBar.photoSub")}:</h2>
                <img className={classes.photoPreview} src={item.url} />
                <div className={classes.expand}>
                    <ClickableText onClick={toggleExpanded} hideIcon text={<><ExpandIcon className={classes.expandIcon} />{t('coordinator.sideBar.expandPhoto')}</>} />
                </div>
                {expand && <ImagePopUp close={toggleExpanded} imageSrc={item.url} />}
            </div>
        </Basicsidebar>
    )
});


export default PhotoSidebar;