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

const useStyles = makeStyles({

    photoContainer: {
        width: "100%",
        ...Styles.flexColumn,
        alignItems: "center",
        "& > img": {
            width: "100%"
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

    let rowID = practitionerStore.selectedRow.id;
    const item = practitionerStore.photoReports[rowID];

    return (
        <Basicsidebar>
            <div className={classes.photoContainer} >
                <h2>Photo Submission</h2>
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