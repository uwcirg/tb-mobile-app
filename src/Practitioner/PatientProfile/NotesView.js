import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import ReportCard from "./ReportCard";
import useStores from "../../Basics/UseStores";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import ReportItem from "./ReportCardItem";
import Card from "./MobileView/Card";
import { Grid } from "@material-ui/core";

const Notes = observer(() => {
  const notes = useStores().patientProfileStore.selectedPatient.notes;
  const { t } = useTranslation("translation");

  return (
    <div>
      <Card title={t("coordinator.patientProfile.addNote.note")}>
        <Grid container>
          {notes.length > 0 ? (
            notes.map((note) => {
              return (
                <ReportCard
                  tagText={t("note")}
                  tagColor={Colors.noteBlue}
                  date={note.createdAt}
                >
                  <ReportItem
                    title={t("coordinator.patientProfile.notes.title")}
                    content={note.title}
                  />
                  <ReportItem
                    title={t("coordinator.patientProfile.notes.detail")}
                    content={note.note}
                  />
                </ReportCard>
              );
            })
          ) : (
            <p>{t("coordinator.patientProfile.notes.noneFound")}</p>
          )}
        </Grid>
      </Card>
    </div>
  );
});

export default Notes;
