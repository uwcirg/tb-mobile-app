import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import HomePageCard from '../Shared/HomePageCard'
import AlertIcon from '@material-ui/icons/Error'
import ListIcon from '@material-ui/icons/PlaylistAddCheck'
import PillIcon from '../../Basics/Icons/Pill.js'
import PhotoSidebar from './PhotoSideBar'
import SymptomSidebar from './SymptomSideBar'
import MedicationSideBar from './MedicationSideBar'
import { useTranslation } from 'react-i18next'
import TaskSideBar from './TaskSidebar'
import SupportSidebar from './SupportSidebar'
import useResize from '../../Hooks/Resize'
import MissedPhotoSideBar from './MissedPhotoSideBar'
import CohortSummary from './CohortSummary'
import SectionTitle from '../../Components/Practitioner/SectionTitle'
import { Grid, IconButton } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

const useStyles = makeStyles({
    left: {
        height: "100vh",
        overflow: "scroll",
        flexGrow: "1",
        "& > h1": {
            alignSelf: "flex-start",
            marginTop: "2em"

        },
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
    },
    container: {
        width: "100%",
        overflowX: "hidden",
        display: "flex"
    },
    photoPreview: {
        width: "100%"
    },
    sidebar: {
        width: "400px",
        boxSizing: "border-box"
    },
    cardContainer: {
        width: "100%"
    },
    mobile: {
        padding: "0 1em 0 1em"
    },
    tasks: {
        padding: "2em",
        "& > div": {
            marginTop: "1.5em",
            "&:last-of-type": { marginBottom: "2em" }
        }
    }
})

const Home = observer(() => {

    const { isMobile } = useResize();

    const { practitionerStore } = useStores();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        practitionerStore.updateTaskPageData();
    }

    const classes = useStyles();

    const { t } = useTranslation('translation');

    return (<>
        <div className={classes.container}>
            <div className={classes.left}>
                <CohortSummary />
                <div className={classes.tasks}>
                    <Grid alignItems='center' container>
                      <SectionTitle>{t("coordinator.titles.myTasks")}</SectionTitle>   
                      <IconButton onClick={fetchData}>
                            <Refresh />
                      </IconButton>
                    </Grid>
                   
                    {isMobile && <p className={classes.mobile}>{t("coordinator.mobileWarning")}</p>}
                    <Card
                        key={'missed-photo'}
                        icon={<AlertIcon />}
                        title={t("coordinator.cardTitles.missedPhoto")}
                        patientList={practitionerStore.filteredPatients.missedPhoto}
                        type="missedPhoto"
                    />
                    <Card
                        key={'symptoms-review'}
                        icon={<AlertIcon />}
                        title={t("coordinator.cardTitles.patientsWithSymptoms")}
                        patientList={practitionerStore.filteredPatients.symptom}
                        type="symptom"
                    />
                    <Card
                        key={'requested-support-review'}
                        icon={<AlertIcon />}
                        title={t("coordinator.cardTitles.requestedSupport")}
                        patientList={practitionerStore.filteredPatients.support}
                        type="support"
                    />

                    <Card
                        key={'photo-review'}
                        icon={<ListIcon />}
                        title={t("coordinator.cardTitles.photosToReview")}
                        patientList={practitionerStore.filteredPatients.photo}
                        type="photo"
                    />
                    <Card
                        key={'missed-review'}
                        icon={<PillIcon />}
                        title={t("coordinator.cardTitles.missedReport")}
                        patientList={practitionerStore.filteredPatients.missed}
                        type="missed"
                    />
                </div>
            </div>
            {!isMobile && <SideBarRouter />}
        </div>
    </>)

});

const SideBarRouter = observer((props) => {
    const { practitionerStore } = useStores();
    const classes = useStyles();

    let component = <TaskSideBar />

    if (practitionerStore.selectedRow.type === "photo") {
        component = <PhotoSidebar />
    } else if (practitionerStore.selectedRow.type === "symptom") {
        component = <SymptomSidebar />
    } else if (practitionerStore.selectedRow.type === "missed") {
        component = <MedicationSideBar />
    } else if (practitionerStore.selectedRow.type === "support") {
        component = <SupportSidebar />
    } else if (practitionerStore.selectedRow.type === "missedPhoto") {
        component = <MissedPhotoSideBar />
    }

    return (
        <div className={classes.sidebar}>
            {component}
        </div>
    )
});


const Card = observer((props) => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    const setSidebar = (type, index) => {
        practitionerStore.selectedRow.type = type;
        practitionerStore.selectedRow.index = index;

    }

    return (
        <HomePageCard
            selectedId={practitionerStore.selectedRow.index}
            selectedType={practitionerStore.selectedRow.type}
            badgeContent={props.patientList.length > 0 && props.patientList.length}
            setSidebar={setSidebar}
            {...props} />

    )
});

export default Home;