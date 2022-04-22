import React from 'react';
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Routes from './Routes';
import Drawer from './Navigation'
import MobileNav from './MobileNav'
import useResize from '../Hooks/Resize'
import useStores from '../Basics/UseStores';

const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex"
    },
    body: {
        width: "100%",
        overFlowX: "hidden"
    }
})

const PractitionerHome = observer(() => {

    const classes = useStyles();
    const { isMobile } = useResize();
    const { practitionerUIStore } = useStores();

    return (
        <div className={classes.container}>
            {isMobile ? <MobileNav /> : <Drawer />}
            <div className={classes.body}>
                <Routes />
            </div>
            {practitionerUIStore.alert && <Alert onClose={() => { practitionerUIStore.alert = "" }} text={practitionerUIStore.alert} />}
        </div>
    )

});

export default PractitionerHome;
