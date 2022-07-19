import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import ChangeLog from "../../Basics/Changelog";
import Colors from "../../Basics/Colors";
import useLogout from "../../Basics/Logout";
import FlatButton from "../../Components/FlatButton";
import { PageLabel } from "../../Components/Shared/PageLabel";
import {
  practitionerContent,
  patientContent,
  idPatientContent,
} from "../../Content/information";
import InformationLink from "./InformationLink";
import VersionNumber from "./VersionNumber";
import isIndonesiaPilot from "../../Utility/check-indonesia-flag";

const useStyles = makeStyles({
  logout: {
    width: "100%",
    justifyContent: "center",
    fontSize: "1rem",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "16px",
    maxWidth: "400px",
  },
  sectionTitle: {
    fontSize: "1.15rem",
    fontWeight: "500",
    color: Colors.textDarkGray,
  },
});

const contentToUse = isIndonesiaPilot() ? idPatientContent : patientContent;

const Translate = ({ children }) => {
  const { t } = useTranslation();
  return <>{t(children)}</>;
};

const InfoRoute = (props) => {
  const { title, children } = props;

  return (
    <Route {...props} to={`*/${props.to}`}>
      <Box width="100%" bgcolor="white" zIndex={10} position="fixed" top={0}>
        <PageLabel title={<Translate>{title}</Translate>} />
      </Box>
      {children}
    </Route>
  );
};

export default function InformationPage() {
  const { t } = useTranslation("translation");

  const { pathname } = useLocation();

  useEffect(() => {
    const element = document.getElementById("main-patient-app-content");
    if (element) {
      element.scrollTop = 0;
    }
  }, [pathname]);

  const classes = useStyles();
  const logout = useLogout();

  const buttons = [];

  contentToUse.forEach((d) => {
    buttons.push(...d.items);
  });

  return (
    <Switch>
      {buttons
        .filter((item) => {
          return !!item.to;
        })
        .map((_each) => {
          const { to, translationKey, page } = _each;
          return (
            <InfoRoute
              key={`route-${translationKey}`}
              title={translationKey}
              path={to}
            >
              {page || (
                <>
                  <p>{t("commonWords.error")}</p>
                  <Link to="/">{t("patient.report.photo.back")}</Link>
                </>
              )}
            </InfoRoute>
          );
        })}
      <InfoRoute
        path="/information/change-log"
        title={"patient.information.changeLog"}
      >
        <ChangeLog />
      </InfoRoute>
      <Route>
        <Buttons />
        <Box padding="1rem">
          <FlatButton className={classes.logout} onClick={logout}>
            <span>{t("patient.profile.logout")}</span>
            <Box width=".5rem" />
            <ExitToApp />
          </FlatButton>
        </Box>
        <Box padding="0 1rem 1rem 1rem">
          <VersionNumber />
        </Box>
      </Route>
    </Switch>
  );
}

const SectionTitle = ({ children }) => {
  const classes = useStyles();

  return <h2 className={classes.sectionTitle}>{children}</h2>;
};

const Buttons = () => {
  const classes = useStyles();

  return (
    <Box padding="0 16px">
      {contentToUse.map((each) => {
        return (
          <div key={`information-section-${each.sectionTitle}}`}>
            <SectionTitle>
              <Translate>{each.sectionTitle}</Translate>
            </SectionTitle>
            <div className={classes.grid}>
              {each.items.map((_each) => (
                <InformationLink {..._each} key={_each.translationKey} />
              ))}
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export function PractitionerView() {
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <Switch>
      {practitionerContent.map((_each) => {
        const { to, translationKey, page } = _each;
        return (
          <InfoRoute
            key={`route-${translationKey}`}
            title={translationKey}
            path={to}
          >
            {page || (
              <>
                <p>{t("commonWords.error")}</p>
                <Link to="/">{t("patient.report.photo.back")}</Link>
              </>
            )}
          </InfoRoute>
        );
      })}

      <Route>
        <Box padding="1rem">
          <div className={classes.grid}>
            {practitionerContent.map((_each) => (
              <InformationLink {..._each} key={_each.translationKey} />
            ))}
          </div>
        </Box>
      </Route>
    </Switch>
  );
}
