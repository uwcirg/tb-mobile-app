import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { DateTime } from "luxon"

import { darkgrey, white } from "../colors"

import { Table } from "reakit";
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