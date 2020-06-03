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

const useStyles = makeStyles({
    left: {
        width: "60%",
        "& > h1":{
            fontSize: "2em",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        "& > div":{
            marginTop: "1.5em"
        }
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

    console.log(practitionerStore.photoReports)

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
                    patientList={practitionerStore.photoReports}
                    type="photo"
                />
                <Card
                    icon={<PillIcon />}
                    title="Missed Report Since Last Resolution"
                    patientList={practitionerStore.filteredPatients.missed}
                    type="missed"
                />
            </div>
            {practitionerStore.selectedRow.visible != "" && <SideBarRouter />}
        </div>)

});

const SideBarRouter = observer((props) => {
    const { practitionerStore } = useStores();

    if (practitionerStore.selectedRow.type === "photo") {
        return <PhotoSidebar />
    } else if(practitionerStore.selectedRow.type === "symptom") {
        return <SymptomSidebar />
    }
    return ""
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