import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores'
import { observer } from 'mobx-react'
import HomePageCard from './Shared/HomePageCard'
import Basicsidebar from './Shared/BasicSidebar'
import {groupBy} from 'lodash';

const useStyles = makeStyles({
    left: {
        flexGrow: "1",
    },
    container: {
        width: "100%",
        height: "100vh",
        display: "flex",
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
    }

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <div className={classes.left}>
                <button onClick={fetchData}>(dev) re-fetch data</button>
                <Card
                    title="Patients with Symptoms"
                    patientList={practitionerStore.filteredPatients.symptoms}
                    type="symptom"
                />
                <Card
                    title="Photos to Review"
                    patientList={practitionerStore.photoReports}
                    type="photo"
                />
            </div>

            {practitionerStore.selectedRow.visible != "" && <SymptomSidebar />}


        </div>)

});

const SymptomSidebar = observer((props) => {
    const { practitionerStore } = useStores();
    const symptomGroups = groupBy(practitionerStore.filteredPatients.symptoms[practitionerStore.selectedRow.id].symptomSummary);
    return (
        <Basicsidebar>
            <h2>{practitionerStore.filteredPatients.symptoms[practitionerStore.selectedRow.id].fullName}</h2>
            <h2>In the past week:</h2>
            {Object.keys(symptomGroups).map(each => {
                return <p>{each}: {symptomGroups[each].length}</p>
            })}
        </Basicsidebar>
    )
});

const Card = (props) => {

    const { practitionerStore } = useStores();

    const setSidebar = (id, type) => {
        practitionerStore.selectedRow.visible = true;
        practitionerStore.selectedRow.id = id;
        practitionerStore.selectedRow.type = type;

    }

    const handleClick = (id, type) => {
        console.log(" " + id + " " + type)
    }

    return (
        <HomePageCard
            setSidebar={setSidebar}
            onComplete={handleClick}
            {...props} />
    )
};



export default Home;