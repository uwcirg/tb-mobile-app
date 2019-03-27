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
    <Heading>
      {assembly.translate("coordinator_participant_history.heading")}
    </Heading>

    <Split>
      <Info>
        <dt>
          {assembly.translate("coordinator_participant_history.participant_id")}
        </dt>
        <dd>
          TODO not yet saved in database
        </dd>

        <dt>
          {assembly.translate("coordinator_participant_history.first_name")}
        </dt>
        <dd>
          {assembly.participant_history.information.name}
        </dd>

        <dt>
          {assembly.translate("coordinator_participant_history.start_date")}
        </dt>
        <dd>
          { DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale("es")
            .toLocaleString(DateTime.DATE_SIMPLE)
          }
        </dd>

        <dt>
          {assembly.translate("coordinator_participant_history.start_date")}
        </dt>
        <dd>
          { DateTime
            .fromISO(assembly.participant_history.information.treatment_start)
            .setLocale("es")
            .plus({ months: 6 })
            .toLocaleString(DateTime.DATE_SIMPLE)
          }
        </dd>
      </Info>

      <DataTable>
        <thead>
          <tr>
            <th>
              {assembly.translate("coordinator_participant_history.medication")}
            </th>
            <th>
              {assembly.translate("coordinator_participant_history.side_effects")}
            </th>
            <th>
              {assembly.translate("coordinator_participant_history.photo")}
            </th>
            <th>
              {assembly.translate("coordinator_participant_history.test_result")}
            </th>
            <th>
              {assembly.translate("coordinator_participant_history.action")}
            </th>
          </tr>
        </thead>

        <tbody>
          { assembly
            .participant_history
            .information
            .medication_reports
            .map(mr =>
              <tr key={mr.timestamp}>
                <td>
                  <Padding>
                    { DateTime
                      .fromISO(mr.timestamp)
                      .setLocale(assembly.locale)
                      .toLocaleString(DateTime.DATE_SIMPLE)
                    }
                  </Padding>

                  <Padding>
                    { DateTime
                      .fromISO(mr.timestamp)
                      .setLocale(assembly.locale)
                      .toLocaleString(DateTime.TIME_SIMPLE)
                    }
                  </Padding>
                </td>

                <td>
                  { assembly
                    .participant_history
                    .information
                    .symptom_reports
                    .filter(sr => sr.timestamp === mr.timestamp)
                    .map(sr => (
                      sr.reported_symptoms.map(symptom => (
                        <div key={symptom} >
                          {assembly.translate(`survey.symptoms.${symptom}`)}
                        </div>
                      ))
                    ))
                  }
                </td>

                <td>
                  { assembly
                    .participant_history
                    .information
                    .strip_reports
                    .filter(sr => sr.timestamp === mr.timestamp)
                    .map(sr => (
                      <PhotoPopout src={sr.photo} key={sr.id} />
                    ))
                  }
                </td>

                <td>
                  { assembly
                    .participant_history
                    .information
                    .strip_reports
                    .filter(sr => sr.timestamp === mr.timestamp)
                    .map(sr => (
                      <Padding>
                        <Selection
                          options={["positive", "negative"]}
                          update={() => sr.status}
                          onChange={value => assembly.setPhotoStatus(sr.id, value)}
                        />
                      </Padding>
                    ))
                  }
                </td>

                <td>
                  TODO not implemented yet.
                </td>
              </tr>
            )
          }
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

const Name = styled.span`
`

const Info = styled.dl`
  border: 1px solid ${darkgrey};
  margin: 0;
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

const DataTable = styled(Table)`
  th { border: 1px solid darkgrey; }
  td { border: 1px solid darkgrey; }
`

const Padding = styled.span`
  padding: 0.5rem;
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
