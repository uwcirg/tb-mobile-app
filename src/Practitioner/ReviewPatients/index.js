import React, { useContext, useState } from 'react';
import { Grid, Box, IconButton, TextField } from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import ReviewPatientTabs from './Tabs';
import StickyTopBar from '../../Components/Shared/StickyTopBar';
import Colors from '../../Basics/Colors';
import PractitionerContext from '../PractitionerContext';
import ReviewPhoto from './ReviewPhoto';
import ListOfPatients from './ListOfPatients';
import MessagePatient from './MessagePatient';
import { useLocation, useHistory } from 'react-router-dom';
import { Route, Switch, useParams, Link } from 'react-router-dom';
import AllPatientsList from './AllPatientsList';
import ReportingPopover from '../Shared/ReportingPopOver';
import { PageLabelTitle } from '../../Components/Shared/PageLabel';
import { useTranslation } from 'react-i18next';

const PractitionerHome = () => {
  const [searchResult, setSearchResult] = useState('');
  const [isFocused, setFocus] = useState('');
  const location = useLocation();

  const getTabValue = () => {
    if (isFocused === 'focus') return 2;
    if (location.pathname === '/home/needs-review') return 0;
    if (location.pathname === '/home/reviewed') return 1;
    if (location.pathname === '/home/all') return 2;
    return 0;
  };

  const tabValue = getTabValue();

  if (tabValue === 2) {
    location.pathname = '/home/all';
  }

  return (
    <div style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
      <Route path="*/:patientId/reports">
        <WrappedReportingPopover />
      </Route>
      <ReviewPhoto />
      <MessagePatient />
      <StickyTopBar>
        <TopBar setSearchResult={setSearchResult} setFocus={setFocus} />
        <ReviewPatientTabs value={tabValue} />
      </StickyTopBar>
      <Switch>
        <Route path="/home/all">
          <AllPatientsList searchName={searchResult} />
        </Route>
        <Route path={'/'}>
          <ListOfPatients tabValue={tabValue} />
        </Route>
      </Switch>
    </div>
  );
};

const TopBar = ({ setSearchResult, setFocus }) => {
  const { t } = useTranslation('translation');

  const handleFocus = (e) => {
    setFocus(e.type);
  };

  return (
    <Box bgcolor="white" borderBottom="solid 1px lightgray" padding="1em 1em">
      <Grid alignItems="center" container>
        <PageLabelTitle title={`${t('coordinator.cardTitles.allPatients')}`} />
        <Box flexGrow="1" />
        <Box maxWidth="50%" paddingRight=".5em">
          <TextField
            id="outlined-search"
            variant="outlined"
            label={t('messaging.search')}
            type="search"
            onChange={(e) => {
              setSearchResult(e.target.value.toLowerCase());
            }}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleFocus(e)}
            InputProps={{
              'aria-label': 'search',
              endAdornment: (
                <IconButton component={Link} to={'/home/all'}>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>
        <IconButton
          style={{
            backgroundColor: Colors.buttonBlue,
            color: 'white',
            padding: '5px',
          }}
          component={Link}
          to={'/patients/add-patient'}
        >
          {<Add />}
        </IconButton>
      </Grid>
    </Box>
  );
};

const WrappedReportingPopover = () => {
  const { patientId } = useParams();
  const patient =
    useContext(PractitionerContext).patientIssues?.value?.find((each) => {
      return each.id === parseInt(patientId);
    }) || null;
  const history = useHistory();

  return (
    <ReportingPopover
      handleExit={() => {
        history.push('/home/needs-review');
      }}
      patient={patient}
    />
  );
};

export default PractitionerHome;
