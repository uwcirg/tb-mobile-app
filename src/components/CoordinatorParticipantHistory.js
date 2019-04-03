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
            <th>
              {assembly.translate("coordinator_participant_history.medication")}
            </th>
            <th>
              {assembly.translate("coordinator_participant_history.medication_taken")}
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
          { (
            assembly
              .participant_history
              .information
              .medication_reports
            || []
            )
            .slice()
            .sort(function(a,b){
              return DateTime.fromISO(b.timestamp) - DateTime.fromISO(a.timestamp);
            })
            .map(mr =>
              <tr key={mr.timestamp}>
                <td>
                  <Padding>
                    { DateTime
                      .fromISO(mr.timestamp, {zone: 'utc'})
                      .setLocale(assembly.locale)
                      .toLocaleString(DateTime.DATE_SIMPLE)
                    }
                  </Padding>

                  <Padding>
                    { DateTime
                      .fromISO(mr.timestamp, {zone: 'utc'})
                      .setLocale(assembly.locale)
                      .toLocaleString(DateTime.TIME_SIMPLE)
                    }
                  </Padding>
                </td>
                
                <td>
                  <Padding>
                    { mr.took_medication
                    ? assembly.translate("progress.took_medication_yes")
                    : assembly.translate("progress.took_medication_no") +
                      mr.not_taking_medication_reason
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
                        {sr.status}
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

const InlineButton = styled(Button)`
  padding: 0.2rem;
`

const DataTable = styled(Table)`
  th { border-bottom: 1px solid darkgrey; }
  td { border-bottom: 1px solid darkgrey; }
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

const Label = styled.dt`
  font-weight: 700;
`

const Information = styled.dd`
  padding: 0.5rem;
`

CoordinatorParticipantHistory.route = "/coordinator_participant_history"
export default CoordinatorParticipantHistory
