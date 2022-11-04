import React, { useContext, useState } from "react";
import { Grid, Box, IconButton, TextField } from "@material-ui/core";
import { Add, SearchOutlined, Close } from "@material-ui/icons";
import ReviewPatientTabs from "./Tabs";
import StickyTopBar from "../../Components/Shared/StickyTopBar";
import Colors from "../../Basics/Colors";
import PractitionerContext from "../PractitionerContext";
import ReviewPhoto from "./ReviewPhoto";
import ListOfPatients from "./ListOfPatients";
import MessagePatient from "./MessagePatient";
import { useLocation, useHistory } from "react-router-dom";
import { Route, Switch, useParams, Link } from "react-router-dom";
import AllPatientsList from "./AllPatientsList";
import ReportingPopover from "../Shared/ReportingPopOver";
import { PageLabelTitle } from "../../Components/Shared/PageLabel";
import { useTranslation } from "react-i18next";

const PractitionerHome = () => {
  const [searchResult, setSearchResult] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isFocused, setFocus] = useState("");
  const location = useLocation();

  const getTabLocation = () => {
    if (isFocused === "focus" && toggleSearch === true) return 2;
    if (location.pathname === "/home/needs-review") return 0;
    if (location.pathname === "/home/reviewed") return 1;
    if (location.pathname === "/home/all") return 2;
    return 0;
  };
  const tabValue = getTabLocation();

  if (tabValue === 2) {
    location.pathname = "/home/all";
  }

  const handleFocus = (e) => {
    setFocus(e.type);
  };

  return (
    <div style={{ maxHeight: "100vh", overflowY: "scroll" }}>
      <Route path="*/:patientId/reports">
        <WrappedReportingPopover />
      </Route>
      <ReviewPhoto />
      <MessagePatient />
      <StickyTopBar>
        <TopBar setToggleSearch={setToggleSearch} toggleSearch={toggleSearch} />
        {toggleSearch && (
          <SearchBar
            handleFocus={handleFocus}
            setSearchResult={setSearchResult}
            setToggleSearch={setToggleSearch}
          />
        )}
        <ReviewPatientTabs value={tabValue} />
      </StickyTopBar>
      <Switch>
        <Route path="/home/all">
          <AllPatientsList searchName={searchResult} />
        </Route>
        <Route path={"/"}>
          <ListOfPatients tabValue={tabValue} />
        </Route>
      </Switch>
    </div>
  );
};

const TopBar = ({ setToggleSearch, toggleSearch }) => {
  const { t } = useTranslation("translation");

  return (
    <Box bgcolor="white" padding="1em 1em">
      <Grid alignItems="center" container>
        <PageLabelTitle title={`${t("coordinator.cardTitles.allPatients")}`} />
        <Box flexGrow="1" />
        <IconButton
          style={{
            backgroundColor: Colors.lighterGray,
            color: Colors.textGray,
            padding: "5px",
            marginRight: ".5em",
            border: toggleSearch
              ? `2px solid ${Colors.actionBlue}`
              : `2px solid ${Colors.lighterGray}`,
          }}
          onClick={() => setToggleSearch((prev) => !prev)}
        >
          {<SearchOutlined />}
        </IconButton>
        <IconButton
          style={{
            backgroundColor: Colors.buttonBlue,
            color: "white",
            padding: "5px",
          }}
          component={Link}
          to={"/patients/add-patient"}
        >
          {<Add />}
        </IconButton>
      </Grid>
    </Box>
  );
};

const SearchBar = ({ setSearchResult, handleFocus, setToggleSearch }) => {
  const { t } = useTranslation("translation");
  function handleExitSearch() {
    setToggleSearch(false);
    setSearchResult("");
  }
  return (

    <Box
      id="search-bar-container"
      width="auto"
      bgcolor="white"
      display="flex"
      justifyContent="flex-end"
      paddingY="1em"
    >
      <Box maxWidth="60ch" paddingX=".5em" bgcolor="white" flexGrow="1">
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          variant="outlined"
          label={t("messaging.search")}
          type="text"
          onChange={(e) => {
            setSearchResult(e.target.value.toLowerCase());
          }}
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleFocus(e)}
          InputProps={{
            "aria-label": "search",
            endAdornment: (
              <IconButton onClick={handleExitSearch}>
                <Close />
              </IconButton>
            ),
          }}
        />
      </Box>
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
        history.push("/home/needs-review");
      }}
      patient={patient}
    />
  );
};

export default PractitionerHome;
