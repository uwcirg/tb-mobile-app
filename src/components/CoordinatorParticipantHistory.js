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
                        exportAllDataToCSV(assembly.participant_history.information)
                        e.stopPropagation()
                      }}>
            Here
          </Button>
        </Information>

        <Label>
          Download Medication Data
        </Label>
        <Information>
          <Button onClick={(e) => {
                        console.log("CLICKED", assembly.participant_history)
                        exportMedicationDataToCSV(assembly.participant_history.information.medication_reports)
                        e.stopPropagation()
                      }}>
            Here
          </Button>
        </Information>

        <Label>
          Download Symptom Data
        </Label>
        <Information>
          <Button onClick={(e) => {
                        console.log("CLICKED", assembly.participant_history)
                        exportSideEffectDataToCSV(assembly.participant_history.information.symptom_reports)
                        e.stopPropagation()
                      }}>
            Here
          </Button>
        </Information>

        <Label>
          Download Strip Report Data
        </Label>
        <Information>
          <Button onClick={(e) => {
                        console.log("CLICKED", assembly.participant_history)
                        exportStripReportDataToCSV(assembly.participant_history.information.strip_reports)
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

// Help from: https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
function exportAllDataToCSV(participant_information) {
  let all_data = [];
  // get the medication reports
  let medication_csv = exportMedicationDataToCSV(participant_information.medication_reports)

  // get the symptom_reports
  let symptom_csv = exportSideEffectDataToCSV(participant_information.symptom_reports);
  
  // TODO: Strip report information
  // strip_reports = participant_information.strip_reports;

  // TODO: Resolution information
  
  // need to think about out of bounds errors in the future
  for (let i = 0; i < medication_csv.length; i++) {
    all_data[i] = medication_csv[i] + "," + symptom_csv[i];
  }

  // Download CSV file
  downloadCSV(all_data.join("\n"), "all_patient_data.csv");
}


// Returns a CSV with medication data to a CSV
function exportMedicationDataToCSV(medication_reports) {
  var csv = [];
  csv.push("Timestamp_Medication,Took_Medication,Not_Taking_Reason");
  
  for (var i = 0; i < medication_reports.length; i++) {
    var row = medication_reports[i];
    csv.push(row.timestamp + "," + row.took_medication + "," + row.not_taking_medication_reason);
  }
  return csv;
  // debugger


  // Download CSV file
  // downloadCSV(csv.join("\n"), "medication_data.csv");
}

// Returns a CSV with side effect data to a CSV
// TODO: see if it works with multiple side effects, does patient history work with multiple side effects?
// 27: "2019-05-09T12:41:00.000Z,fever,appetite_loss,0,Other symptoms too" for a multiple report, let's see how it looks
function exportSideEffectDataToCSV(symptom_reports) {
  var csv = [];
  csv.push("Timestamp_Side_Effect,Reported_Symptoms,Nausea_Rating,Other_Symptoms");
  
  for (var i = 0; i < symptom_reports.length; i++) {
    var row = symptom_reports[i];
    // for the case when they have multiple symptoms to report
    // this is not an elegant solution, we should consider seperating these differently
    var reported_symptoms = row.reported_symptoms.join(" ");
    csv.push(row.timestamp + "," + reported_symptoms + "," + row.nausea_rating + "," + row.other);
  }
  return csv;
  // debugger

  // Download CSV file
  // downloadCSV(csv.join("\n"), "side_effect_data.csv");
}

// Returns a CSV with side effect data to a CSV
function exportStripReportDataToCSV(strip_reports) {
  var csv = [];
  csv.push("Created_At_Strip_Report,Status,Photo");
  
  for (var i = 0; i < strip_reports.length; i++) {
    var row = strip_reports[i];
    csv.push(row.created_at + "," + row.status + ",Photo_Here");
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), "strip_report_data.csv");
}



// This function is working just fine
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