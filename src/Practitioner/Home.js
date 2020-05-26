import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores'
import {observer} from 'mobx-react'
import HomePageCard from './Shared/HomePageCard'

const useStyles = makeStyles({

})

const Home = observer(() => {

    const { practitionerStore } = useStores();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        practitionerStore.getSeverePatients();
    }

    const handleClick = () => {
        console.log("Handle the archive of patientc")
    }

    const classes = useStyles();

    return (
        <div>
            <button onClick={fetchData}>(dev) re-fetch data</button>
            <HomePageCard patientList={practitionerStore.filteredPatients.severe} onComplete={handleClick} />
        </div>)

});



export default Home;