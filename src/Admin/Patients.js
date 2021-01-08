import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../Basics/UseStores'
import { observer } from 'mobx-react'
import { DateTime } from 'luxon'
import { Button } from '@material-ui/core'
import Colors from '../Basics/Colors'

const useStyles = makeStyles({
    weekTitle: {
        backgroundColor: Colors.calendarGreen
    },
    currentWeek:{
        backgroundColor: Colors.red
    }
})

const Patients = observer(() => {

    const { adminStore } = useStores();

    useEffect(adminStore.getPatients, []);

    return (<div>
        {adminStore.patients && adminStore.patients.data && adminStore.patients.data.map(each => {
            return (
                <div key={`admin-patient-${each.id}`}>
                    <p>Patient #{each.id}</p>
                    <p>{each.adherence}</p>
                    <Weeks photoDays={each.photoDays} />
                </div>
            )
        })}
    </div>)

})

const Weeks = (props) => {
    
    const [show, setShow] = useState(false);
    let week;
    const classes = useStyles();
    let number = 0;

    return (
        <>
            <Button onClick={() => { setShow(!show) }}>Show / Hide Photo Days</Button>
            {show ?
                <div>
                    {props.photoDays && props.photoDays.map(each => {
                        let parsedDate = DateTime.fromISO(each.date)
                        let newWeek = false

                        if (parsedDate.startOf("week").toISO() !== week) {
                            newWeek = true;
                            week = parsedDate.startOf("week").toISO();
                            number = 0;
                        }
                        number++;

                        return (
                            <div className={classes.week}>
                                <p className={`${classes.weekTitle} ${DateTime.fromISO(week).equals(DateTime.local().startOf("week")) && classes.currentWeek}`}>{newWeek && <>Week of {DateTime.fromISO(week).toLocaleString(DateTime.DATE_SHORT)} </>}</p>
                                <p>{parsedDate.toLocaleString(DateTime.DATE_SHORT)} : {each.id}</p>
                            </div>
                        )
                    })}
                </div> : <div>

                </div>}
        </>
    )
}

export default Patients;