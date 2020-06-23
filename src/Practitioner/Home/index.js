import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import HomePageCard from '../Shared/HomePageCard'
import Basicsidebar from '../Shared/BasicSidebar'
import AlertIcon from '@material-ui/icons/Error';
import ListIcon from '@material-ui/icons/PlaylistAddCheck';
import PillIcon from '../../Basics/Icons/Pill.js'
import PhotoSidebar from './PhotoSideBar'
import SymptomSidebar from './SymptomSideBar'
import MedicationSideBar from './MedicationSideBar'
import { DateTime } from 'luxon';
import RecentReports from './RecentReports';

const useStyles = makeStyles({
    left: {
        height: "100vh",
        overflow: "scroll",
        flexGrow: "1",
        "& > h1":{
            fontSize: "2em",
            fontStyle: "normal",
            fontWeight: "medium",
            textAlign: "left",
            width: "90%"
        },
        "& > div":{
            marginTop: "1.5em",
            "&:last-of-type": {marginBottom: "2em"}
        },
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
        
    },
    container: {
        width: "100%",
        height: "100vh",
        display: "flex",
    },
    photoPreview: {
        width: "100%"
    }

})

const Home = observer(() => {

    const { practitionerStore } = useStores();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        practitionerStore.getSeverePatients();
        practitionerStore.getPhotoReports();
        practitionerStore.getMissingPatients();
    }

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.left}>
            <h1>My Tasks</h1>
                <Card
                    icon={<AlertIcon />}
                    title="Patients with Symptoms"
                    patientList={practitionerStore.filteredPatients.symptoms}
                    type="symptom"
                />
                <Card
                    icon={<ListIcon />}
                    title="Photos to Review"
                    patientList={practitionerStore.photoReports.slice().sort((a,b) =>{ return (DateTime.fromISO(b.date).diff(DateTime.fromISO(a.date))) })}
                    type="photo"
                />
                <Card
                    icon={<PillIcon />}
                    title="Missed Report Since Last Resolution"
                    patientList={practitionerStore.filteredPatients.missed}
                    type="missedMedication"
                />
            </div>
           <SideBarRouter />
        </div>)

});

const SideBarRouter = observer((props) => {
    const { practitionerStore } = useStores();

    if (practitionerStore.selectedRow.type === "photo") {
        return <PhotoSidebar />
    } else if(practitionerStore.selectedRow.type === "symptom") {
        return <SymptomSidebar />
    }else if(practitionerStore.selectedRow.type === "missedMedication"){
        return <MedicationSideBar />
    }
    return <RecentReports />
});


const Card = observer((props) => {

    const { practitionerStore } = useStores();

    const setSidebar = (id, type, patientId) => {
        practitionerStore.selectedRow.visible = true;
        practitionerStore.selectedRow.id = id;
        practitionerStore.selectedRow.type = type;
        practitionerStore.selectedRow.patientId = patientId;

    }

    const handleClick = (id, type) => {
        console.log(" " + id + " " + type)
    }

    return (
        <HomePageCard
            selectedId={practitionerStore.selectedRow.id}
            selectedType={practitionerStore.selectedRow.type}
            setSidebar={setSidebar}
            onComplete={handleClick}
            {...props} />
    )
});

export default Home;