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
          {assembly.translate("coordinator_participant_history.participant_id")}
        </Label>
        <Information>
          TODO not yet saved in database
        </Information>

        <Label>
          {assembly.translate("coordinator_participant_history.first_name")}
        </Label>
        <Information>
          {assembly.participant_history.information.name}
        </Information>

        <Label>
          {assembly.translate("coordinator_participant_history.start_date")}
        </Label>
        <Information>
          { DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale("es")
            .toLocaleString(DateTime.DATE_SIMPLE)
          }
        </Information>

        <Label>
          {assembly.translate("coordinator_participant_history.end_date")}
        </Label>
        <Information>
          { DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale("es")
            .plus({ months: 6 })
            .toLocaleString(DateTime.DATE_SIMPLE)
          }
        </Information>
      </Info>

      <DataTable>
        <thead>
          <tr>
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
                resolution.particpant_uuid ===
                assembly.participant_history.information.uuid
              )
              .map(resolution =>
              <tr key={resolution.uuid}>
                <td>
                  { assembly
                    .participant_history
                    .information
                    .medication_reports
                    .filter(report => report.resolution_uuid === resolution.uuid)
                    .map(report =>
                      <Padding>
                        { DateTime
                          .fromISO(report.timestamp, { zone: "utc" })
                          .setLocale(assembly.locale)
                          .toLocaleString(DateTime.DATE_SIMPLE)
                        }
                        -
                        { DateTime
                          .fromISO(report.timestamp, { zone: "utc" })
                          .setLocale(assembly.locale)
                          .toLocaleString(DateTime.TIME_SIMPLE)
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
                    .map(report =>
                      report.reported_symptoms.map(symptom => (
                        <div key={symptom} >
                          {assembly.translate(`survey.symptoms.${symptom}`)}
                        </div>
                      ))
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
                      <div>
                        <PhotoPopout src={report.photo} key={report.id} />

                        <Padding>
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

const Padding = styled.span`
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
