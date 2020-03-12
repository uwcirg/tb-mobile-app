import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import PopUp from '../Navigation/PopUp';
import NewButton from '../../Basics/NewButton'
import Camera from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles/'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    basicButton: {
        textTransform: "capitalize",
        color: Colors.buttonBlue
    },
    title:{
        margin: 0,
    }
})

const ReportConfirmation = observer(() => {

    const { patientStore } = useStores();
    const [showPopup, setPopup] = useState(true);
    const classes = useStyles();

    const handleClick = () => {

    }

    const handleExit = () => {
        setPopup(false);
        patientStore.onTreatmentFlow = false;
    }

    return (
        showPopup && <PopUp handleClickAway={handleExit}>
            <img src="/img/list.svg" />
            <h1 className={classes.title}>Good Job Julio!</h1>
            <p>You also need to upload a photo of your test strip today</p>
            <NewButton onClick={handleClick} icon={<Camera />} text="Test Strip Photo" />
            <Button className={classes.basicButton}>Do Later today</Button>
        </PopUp>
    )
});


export default ReportConfirmation;