import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { DateTime } from "luxon"

import {
  darkgrey,
  grey,
  white,
  red,
} from "../colors"

import { Input, Table } from "reakit";
import Button from "../primitives/Button"
import Selection from "../primitives/Selection"
import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"

const CoordinatorParticipantHistory = observer(({ assembly }) => (
  <Layout>
    <Heading>{assembly.translate("coordinator_participant_history.heading")}</Heading>

    <Split>
      <Info>
        <dt>Participant ID</dt>
        <dd>TODO not yet saved in database</dd>

        <dt>{assembly.translate("coordinator_participant_history.first_name")}</dt>
        <dd>{assembly.participant_history.information.name}</dd>

        <dt>{assembly.translate("coordinator_participant_history.start_date")}</dt>
        <dd>{
          DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale("es")
            .toLocaleString(DateTime.DATE_SIMPLE)
        }</dd>

        <dt>{assembly.translate("coordinator_participant_history.start_date")}</dt>
        <dd>{
          DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale("es")
            .plus({ months: 6 })
            .toLocaleString(DateTime.DATE_SIMPLE)
        }</dd>

      </Info>

      <DataTable>
        <thead>
          <tr>
            <th>{assembly.translate("coordinator_participant_history.medication")}</th>
            <th>{assembly.translate("coordinator_participant_history.side_effects")}</th>
            <th>{assembly.translate("coordinator_participant_history.photo")}</th>

            <th>{assembly.translate("coordinator_participant_history.test_result")}</th>
            <th>{assembly.translate("coordinator_participant_history.action")}</th>
          </tr>
        </thead>

        <tbody>
          {
            [{medication_reports: [], strip_reports: [], symptom_reports: [], notes: []}, {medication_reports: [], strip_reports: [], symptom_reports: [], notes: []}].map(day =>
            <tr key={day.uuid} >
              <td>
                { day.medication_reports.length > 0
                  ? DateTime
                    .fromISO(day.medication_reports[0].timestamp)
                    .toLocaleString(DateTime.TIME_SIMPLE)
                  : null
                }
              </td>

              <td>
                {day.symptom_reports.map(symptom_report =>
                  <div>
                    { DateTime
                        .fromISO(symptom_report.created_at)
                        .toLocaleString(DateTime.TIME_SIMPLE)
                    }
                    { symptom_report.reported_symptoms.map(symptom =>
                      <Symptom key={symptom}>{symptom}</Symptom>
                    )}
                  </div>
                )}
              </td>

              <td>
                { day.strip_reports.map(strip_report =>
                    <PhotoPopout src={strip_report.photo} >
                      <Selection
                        options={["positive", "negative"]}
                        update={() => strip_report.status}
                        onChange={value => assembly.setPhotoStatus(strip_report.id, value)}
                      />
                    </PhotoPopout>
                  )
                }
              </td>

              <td>
                <a href={'https://wa.me/' + day.phone_number} target="_blank">
                  {day.phone_number}
                </a>
              </td>

              <td>
                <CoordinatorNote>
                  <TextField use="textarea" />
                  <InlineButton>Save Note</InlineButton>
                </CoordinatorNote>
              </td>
            </tr>
          )}
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
  grid-template-columns: auto auto;
`

const Name = styled.span`
`

const Info = styled.dl`
  border: 1px solid ${darkgrey};
`

const Symptom = styled.div`
  color: ${red};
`

const CoordinatorNote = styled.div`
  display: grid;
  grid-row-gap: 0.5rem;
`

const TextField = styled(Input)`
  border: 1px solid ${grey};
  padding: 0.5rem 0;
`

const InlineButton = styled(Button)`
  padding: 0.2rem;
`

const DataTable = styled(Table)`
  th { border: 1px solid darkgrey; }
  td { border: 1px solid darkgrey; }
`

const participant_adherence = (participant) => {
  let start = DateTime.fromISO(participant.treatment_start)
  let end = DateTime.local()
  let full_days = parseInt(end.diff(start, 'days').toObject().days, 10)
  if(full_days === 0) full_days = 1

  let report_dates = participant.medication_reports.map(report =>
    DateTime.fromISO(report.timestamp).toISODate()
  )

  let unique_report_dates = Array.from(new Set(report_dates))
  return unique_report_dates.length / full_days
}

CoordinatorParticipantHistory.route = "/coordinator_participant_history"
export default CoordinatorParticipantHistory
