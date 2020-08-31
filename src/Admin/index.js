import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import AddOrganization from './AddOrganization';

const useStyles = makeStyles({
    organization:{
        display: "flex",
        marginTop: "1em",
        padding: "1em"
    },
    cardContainer:{
        width: "30%",
        marginLeft: "1em"
    },
    title:{
        fontSize: "1.25em"
    }
})

const AdminHome = observer(() => {

    const {adminStore, loginStore} = useStores();
    const classes = useStyles();

    useEffect(()=>{
        adminStore.getSites();
    },[])

    return(
    <div>
        <h1>Admin Page</h1>
        <Button onClick={()=>{adminStore.logout()
        loginStore.logout() }}> Logout</Button>

        <div className={classes.cardContainer}>
        {adminStore.sites && adminStore.sites.map( each => {
            return <Card className={classes.organization}>
                <Typography className={classes.title} variant="h2">{each.title}</Typography>
                <p>{each.id}</p>
                </Card>
        })}

        <AddOrganization />
        </div>
    </div>)

});

export default AdminHome;