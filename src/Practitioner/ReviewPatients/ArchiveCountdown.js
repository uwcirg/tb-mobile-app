import { Box, styled, Typography } from "@material-ui/core";
import React from "react";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Restore } from "@material-ui/icons";

const ArchiveCountdown = ({ weeksInTreatment, id }) => {
  const { t } = useTranslation("translation");
  const isReadyForArchive = weeksInTreatment > 26;
  const Container = styled(Box)({
    height: "fit-content",
    backgroundColor: isReadyForArchive ? Colors.warningRed : Colors.lightgray,
    "&:hover": {
      backgroundColor: Colors.reportBlue,
    },
    color: isReadyForArchive ? "white" : Colors.textDarkGray,
    borderRadius: "4px",
    padding: "2px 5px",
    margin: "2px 5px",
    minWidth: "3 0px",
    textAlign: "center",
    "& p": { fontSize: ".85em" },
    textTransform: "capitalize",
    textDecoration: "none",
    fontWeight: isReadyForArchive ? "bold" : "normal",
    // make bold
  });
  return (
    <>
      <Container>
        {isReadyForArchive ? (
          <Link
            to={`/patients/${id}/archive`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: ".95rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              <Restore fontSize="small" />{" "}
              {t("coordinator.patientProfile.options.archive")}
            </Typography>
          </Link>
        ) : (
          <Typography>
            {t("time.week")} {weeksInTreatment}
          </Typography>
        )}
      </Container>
    </>
  );
};

export default ArchiveCountdown;
