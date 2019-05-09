import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { DateTime } from "luxon"

import { darkgrey, white } from "../colors"

import { Table, Button } from "reakit";
import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"
import InternalLink from "../primitives/InternalLink"
import CoordinatorHome from "../components/CoordinatorHome"
import days_of_treatment from "../util/days_of_treatment"

const CoordinatorParticipantHistory = observer(({ assembly }) => (
  <Layout>
    <InternalLink
      assembly={assembly}
      to={CoordinatorHome}
    >
      {assembly.translate("coordinator_participant_history.link.home")}
    </InternalLink>

    <Heading>
      {assembly.translate("coordinator_participant_history.heading")}
    </Heading>

    <Split>
      <Info>
        <Label>
          {assembly.translate("coordinator_participant_history.first_name")}
        </Label>
        <Information>
          {assembly.participant_history.information.name}
        </Information>

        <Label>
          {assembly.translate("coordinator_participant_history.start_date")}
        </Label>
        {/* Start Date */}
        <Information>
          { DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale(assembly.locale)
            .toLocaleString(DateTime.DATETIME_SHORT)
          }
        </Information>

        <Label>
          {assembly.translate("coordinator_participant_history.end_date")}
        </Label>
        <Information>
          { DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale(assembly.locale)
            .plus({ months: 6 })
            .toLocaleString(DateTime.DATETIME_SHORT)
          }
        </Information>

        <Label>
          {assembly.translate("progress.days")}
        </Label>
        <Information>
          {days_of_treatment(assembly.participant_history.information)}
        </Information>

        <Label>
          Download All Patient Data
        </Label>
        <Information>
          <Button onClick={(e) => {
                        console.log("CLICKED", assembly.participant_history.information)
                        exportAllDataToCSV(assembly.participant_history.information, assembly.coordinator_account)
                        e.stopPropagation()
                      }}>
            Here
          </Button>
        </Information>
      </Info>

      <DataTable>
        <thead>
          <tr>
            <th>{assembly.translate("coordinator_participant_history.resolution")}</th>
            <th>{assembly.translate("coordinator_participant_history.medication")}</th>
            <th>{assembly.translate("coordinator_participant_history.side_effects")}</th>
            <th>{assembly.translate("coordinator_participant_history.photo")}</th>
            <th>{assembly.translate("coordinator_participant_history.action")}</th>
          </tr>
        </thead>

        <tbody>
          { assembly
            .coordinator_account
            .information
            .resolutions
            .filter(resolution =>
              resolution.participant_uuid ===
              assembly.participant_history.information.uuid
            )
            .sort((a,b) => DateTime.fromISO(b.created_at) - DateTime.fromISO(a.created_at))
            .map(resolution =>
              <tr key={resolution.uuid} >
                <td>
                  { DateTime
                    .fromISO(resolution.timestamp)
                    .setLocale(assembly.locale)
                    .toLocaleString(DateTime.DATETIME_SHORT)
                  }
                </td>

                <td>
                  { assembly
                    .participant_history
                    .information
                    .medication_reports
                    .filter(report => report.resolution_uuid === resolution.uuid)
                    .map(report =>
                      <Padding key={report.timestamp} >
                        { DateTime
                          .fromISO(report.timestamp, { zone: "utc" })
                          .setLocale(assembly.locale)
                          .toLocaleString(DateTime.DATETIME_SHORT)
                        }

                        { report.took_medication
                        ? assembly.translate("progress.took_medication_yes")
                        : assembly.translate("progress.took_medication_no") +
                          report.not_taking_medication_reason
                        }
                      </Padding>
                  ) }
                </td>

                <td>
                  { assembly
                    .participant_history
                    .information
                    .symptom_reports
                    .filter(report => report.resolution_uuid === resolution.uuid)
                    .map(symptom_report =>
                      <div key={symptom_report.created_at} >

                      { DateTime
                        .fromISO(symptom_report.timestamp, { zone: "utc" })
                        .setLocale(assembly.locale)
                        .toLocaleString(DateTime.DATETIME_SHORT) + ": "
                      }
    
                      {symptom_report
                        .reported_symptoms
                        .map(symptom_key => (
                          <span>
                            {assembly.translate(`survey.symptoms.${symptom_key}`)}
                          </span>
                        ))
                      }
                      
                      { symptom_report.nausea_rating ? symptom_report.nausea_rating + ", " : null }
                      { symptom_report.other ? assembly.translate("survey.symptoms.other") + symptom_report.other : null}
                      </div>
                    )
                  }
                </td>

                <td>
                  { assembly
                    .participant_history
                    .information
                    .strip_reports
                    .filter(report => report.resolution_uuid === resolution.uuid)
                    .map(report =>
                      <div key={report.timestamp} >
                        <PhotoPopout src={report.photo} key={report.id} />

                        <Padding>
                          { DateTime
                              .fromISO(report.created_at)
                              .setLocale(assembly.locale)
                              .toLocaleString(DateTime.DATETIME_SHORT)
                          }
                          <br></br>
                          {report.status}
                        </Padding>
                      </div>
                    )
                  }
                </td>

                <td>
                  {resolution.status}: {resolution.note}
                </td>
              </tr>
          ) }
        </tbody>
      </DataTable>
    </Split>
  </Layout>
))

function exportAllDataToCSV(participant_information, coordinator_account) {
  
  let resolution_data = coordinator_account
            .information
            .resolutions
            .filter(resolution =>
              resolution.participant_uuid ===
              participant_information.uuid
            )
  
  let all_data = [];
  
  // Format patient data in CSV formatting
  let medication_data = formatMedicationData(participant_information.medication_reports)
  let symptom_data = formatSideEffectData(participant_information.symptom_reports);
  let notes = formatNotesData(participant_information.notes);
  let resolutions = formatResolutionsData(resolution_data);
  // let strip_reports = formatStripReportData(participant_information.strip_reports);

  // Setting the headers
  all_data[0] = "Name,Start_Date," + medication_data[0] + symptom_data[0] + notes[0] + resolutions[0];
  
  // HERE: figure out how long to do the for loop

  // We are starting at 1 here because we set the columns above
  for (let i = 1; i < symptom_data.length; i++) {
    // Checking for out of bounds for our field. If it is undefinded then we want
    // an empty cell for each column, thus we have the amount of commas equal to the
    // data that would normally be present
    if (medication_data[i] === undefined) {
      medication_data[i] = ",,";
    }

    if (symptom_data[i] === undefined) {
      symptom_data[i] = ",,,";
    }

    if (notes[i] === undefined) {
      notes[i] = ",,";
    }

    if (resolutions[i] === undefined) {
      resolutions[i] = ",,";
    }
    
    all_data[i] =    participant_information.name + ","
                   + participant_information.treatment_start + ","
                   + medication_data[i] + ","
                   + symptom_data[i] + ","
                   + notes[i] + ","
                   + resolutions[i] + ",";
  }

  // Download CSV file, TODO add date and name to the CSV file
  downloadCSV(all_data.join("\n"), "all_patient_data.csv");
}

// Returns medication data in a format close to CSV
// The set up is adjustable, look at the medication_reports data model
// to add more fields
function formatMedicationData(medication_reports) {
  let data = [];
  data.push("Timestamp_Medication,Took_Medication,Not_Taking_Reason,");
  
  for (let i = 0; i < medication_reports.length; i++) {
    let row = medication_reports[i];
    data.push(row.timestamp + "," + row.took_medication + "," + row.not_taking_medication_reason);
  }
  return data;
}

// Returns symptom report data in a format close to CSV
// The set up is adjustable, look at the medication_reports data model
// to add more fields
function formatSideEffectData(symptom_reports) {
  let data = [];
  data.push("Timestamp_Side_Effect,Reported_Symptoms,Nausea_Rating,Other_Symptoms,");
  
  for (let i = 0; i < symptom_reports.length; i++) {
    let row = symptom_reports[i];
    // NOT elegant: for the case when they have multiple symptoms to report
    // we should consider seperating these differently. Right now we can't seperate because it is a list
    let reported_symptoms = row.reported_symptoms.join(" ");
    data.push(row.timestamp + "," + reported_symptoms + "," + row.nausea_rating + "," + row.other);
  }
  return data;
}

// Returns note data in a format close to CSV
// This setup is adjustable visit the notes schema to add or remove fields
function formatNotesData(notes) {
  let data = []
  data.push("Notes_Created_At,Notes_Title,Notes_Text,");

  for (let i = 0; i < notes.length; i++) {
    let row = notes[i];
    // trim needed for return characters
    data.push(row.created_at + "," + row.title + "," + row.text.trim());
  }
  return data;
}

function formatResolutionsData(resolutions) {
  let data = []
  data.push("Resolutions_Created_At,Resolution_Status,Resolution_Reviewed");

  for (let i = 0; i < resolutions.length; i++) {
    let row = resolutions[i];
    data.push(row.created_at + "," + row.status + "," + row.reviewed);
  }
  return data;
}

// This function is NOT working. The image is not viewable inside of the
// CSV, it is data:pngXXXXXXXX formatting right now
function formatStripReportData(strip_reports) {
  var data = [];
  data.push("Created_At_Strip_Report,Status,Photo");
  
  for (var i = 0; i < strip_reports.length; i++) {
    var row = strip_reports[i];
    data.push(row.created_at + "," + row.status + ",Photo_Here");
  }

  // Download CSV file
  downloadCSV(data.join("\n"), "strip_report_data.csv");
}

// Help from: https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], {type: "text/csv"});

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

const Layout = styled.div`
  background-color: ${white};
  border-radius: 2px;
  border: 1px solid ${darkgrey};
  padding: 1rem;
  display: grid;
  grid-row-gap: 1rem;
`

const Split = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`

const Info = styled.dl`
  border: 1px solid ${darkgrey};
  margin: 0;
  padding: 1rem;
`

const DataTable = styled(Table)`
  th { border-bottom: 1px solid darkgrey; }
  td { border-bottom: 1px solid darkgrey; }
`

const Padding = styled.div`
  padding: 0.5rem;
`

const Label = styled.dt`
  font-weight: 700;
`

const Information = styled.dd`
  padding: 0.5rem;
`

CoordinatorParticipantHistory.route = "/coordinator_participant_history"
export default CoordinatorParticipantHistory