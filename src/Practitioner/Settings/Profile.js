import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Avatar from '../../Basics/PatientIcon'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    name: {
        fontSize: "1.5em"
    },
    sectionHeader:{
        display: "flex",
        alignItems: "center",
        "& > div:first-of-type":{
            display: "flex",
            alignItems: 'center',
            marginRight: ".5em"
        }
    },
    container: {
        paddingTop: "1em"
    },
    details:{
        marginTop: "1em"
    }
})

const Profile = observer(() => {

    const classes = useStyles();
    const { practitionerStore } = useStores();

    return (<div className={classes.container}>
        <div className={classes.sectionHeader}>
            <Avatar name={practitionerStore.fullName || "C"} />
            <Typography className={classes.name} variant="h2">{practitionerStore.fullName || "C"}</Typography>
        </div>

        <div className={classes.details}>
        <Typography variant="body1"> Organization: </Typography>
            <Typography variant="body1"> Email: {practitionerStore.email} </Typography>
        </div>
    </div>)

});

export default Profile;