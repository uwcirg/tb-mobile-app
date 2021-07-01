import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'

const useStyles = makeStyles({
    container: {
        padding: "1em"
    },
    list: {
        padding: 0,
        margin: 0,
        "& > li > img": {
            width: "95%",
            margin: "auto",
            marginTop: "1em"
        }
    }
})

const NotificationInstructions = () => {

    const classes = useStyles();

    return (<div className={classes.container}>
        <ol className={classes.list}>
            <li>
                Go To settings
                <img src="img/es-Ar/notification-instructions/1.jpg" />
            </li>
            <li>
                Go To settings
                <img src="img/es-Ar/notification-instructions/2.jpg" />
            </li>
            <li>
                Go To settings
                <img src="img/es-Ar/notification-instructions/3.jpg" />
            </li>
            <li>
                Go To settings
                <img src="img/es-Ar/notification-instructions/4.jpg" />
            </li>
        </ol>

    </div>)
}
export default NotificationInstructions;