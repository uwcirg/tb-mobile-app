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

const CoordinatorHome = observer(({ assembly }) => (
  <Layout>
    <span>
      { DateTime
        .local()
        .setLocale(assembly.locale)
        .toLocaleString(DateTime.DATE_SIMPLE)
      }
    </span>
    <Heading>{assembly.translate("coordinator.heading")}</Heading>

    <DailyReviewTable>
      <thead>
        <tr>
          <th colSpan={1}>{assembly.translate("coordinator.participant_info")}</th>
          <th colSpan={3}>{assembly.translate("coordinator.today")}</th>
          <th colSpan={2}>{assembly.translate("coordinator.actions")}</th>
          <th colSpan={2}>{assembly.translate("coordinator.treatment")}</th>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>{assembly.translate("coordinator.name")}</th>

          <th>{assembly.translate("coordinator.medication")}</th>
          <th>{assembly.translate("coordinator.side_effects")}</th>
          <th>{assembly.translate("coordinator.photo")}</th>

          <th>{assembly.translate("coordinator.contact")}</th>
          <th>{assembly.translate("coordinator.notes")}</th>

          <th>{assembly.translate("coordinator.adherence")}</th>
          <th>{assembly.translate("coordinator.start_date")}</th>
        </tr>
      </thead>

      <tbody>
        {assembly.coordinator_account.information.participants.map(participant =>
          <tr key={participant.uuid} onClick={() => assembly.participant_history.watch(participant.uuid)} >
            <td>{participant.name}</td>

            <td>
              { participant.today.medication_reports.length > 0
                ? DateTime
                  .fromISO(participant.today.medication_reports[0].timestamp)
                  .toLocaleString(DateTime.TIME_SIMPLE)
                : null
              }
            </td>

            <td>
              {participant.today.symptom_reports.map(symptom_report =>
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
              { participant.today.strip_reports.map((strip_report, index) =>
                  <PhotoPopout src={strip_report.photo} key={strip_report.id} >
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
              <a href={'https://wa.me/' + participant.phone_number} target="_blank">
                {participant.phone_number}
              </a>
            </td>

            <td>
              <CoordinatorNote>
                <TextField use="textarea" />
                <InlineButton>Save Note</InlineButton>
              </CoordinatorNote>
            </td>

            <td>
              {parseInt(participant_adherence(participant) * 100, 10) + "%"}
            </td>

            <td>
              { DateTime
                .fromISO(participant.treatment_start)
                .setLocale(assembly.locale)
                .toLocaleString(DateTime.DATE_SIMPLE)
              }
            </td>
          </tr>
        )}
      </tbody>
    </DailyReviewTable>
  </Layout>
))

const Layout = styled.div`
  background-color: ${white};
  border-radius: 2px;
  border: 1px solid ${darkgrey};
  display: grid;
  grid-row-gap: 1rem;
  padding: 1rem;
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

const DailyReviewTable = styled(Table)`
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

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome
