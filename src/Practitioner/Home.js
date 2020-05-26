import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores'
import {observer} from 'mobx-react'
import HomePageCard from './Shared/HomePageCard'

const useStyles = makeStyles({
    left:{
        flexGrow: "1",
    },
    container: {
        width: "100%",
        height: "100vh",
        display: "flex"
    },
    right:{
        width: "20%",
        backgroundColor: "orange"
    }
    
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
        <div className={classes.container}>

            <div className={classes.left}>
                <button onClick={fetchData}>(dev) re-fetch data</button>
                <HomePageCard patientList={practitionerStore.filteredPatients.severe} onComplete={handleClick} />
            </div>

            <div className={classes.right}>

            </div>

        </div>)

});



export default Home;