import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { DateTime } from "luxon"

import {
  darkgrey,
  lightgrey,
  green,
  grey,
  red,
  white,
} from "../colors"

import Button from "../primitives/Button"
import CoordinatorParticipantHistory from "../components/CoordinatorParticipantHistory"
import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"
import Selection from "../primitives/Selection"
import participant_adherence from "../util/participant_adherence"
import { Popover, Input, Table } from "reakit";
import days_of_treatment from "../util/days_of_treatment"

import { Icon } from "@mdi/react"
import {
  mdiCloseCircle,
  mdiCloseCircleOutline,
  mdiCheckCircle,
  mdiCircleOutline,
} from "@mdi/js"

const Icons = {
  reviewed:       <Icon size={1.5} color={green} path={mdiCheckCircle} />,
  pending_review: <Icon size={1.5} color={green} path={mdiCircleOutline} />,
  no_response:    <Icon size={1.5} color={lightgrey}   path={mdiCloseCircleOutline} />,
  overdue:        <Icon size={1.5} color={red}   path={mdiCloseCircle} />,
}

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

    <InformationTable>
      <Row>
        <Cell>{assembly.translate("coordinator.status_")}</Cell>
        <Cell>{assembly.translate("coordinator.name")}</Cell>

        <Cell>{assembly.translate("coordinator.medication")}</Cell>
        <Cell>{assembly.translate("coordinator.side_effects")}</Cell>
        <Cell>{assembly.translate("coordinator.photo")}</Cell>

        <Cell>{assembly.translate("coordinator.contact")}</Cell>
        <Cell>{assembly.translate("coordinator.notes")}</Cell>

        <Cell>{assembly.translate("coordinator.adherence")}</Cell>
        <Cell>{assembly.translate("progress.days")}</Cell>
      </Row>

      { (
        assembly
          .coordinator_account
          .information
          .participants
        || []
        )
        .map(participant =>
        <Row
          key={participant.uuid}
        >
          <Cell>
            { participant_has_reports_that_have_not_been_resolved(participant)
            ? <Popover.Container onClick={e => { e.stopPropagation(); e.preventDefault() } } >
                {popover => (
                  <Status style={{ color: lightgrey }} >
                    {Icons.no_response}

                    <Popover {...popover}>
                      Hello?
                    </Popover>
                  </Status>
                ) }
                </Popover.Container>
            : <Popover.Container onClick={e => { e.stopPropagation(); e.preventDefault() } } >
                {popover => (
                  <Status style={{ color: green }} >
                    {Icons.pending_review}

                    <Popover {...popover}>
                      Hello?
                    </Popover>
                  </Status>
                )}
              </Popover.Container>
            }
          </Cell>

          <NameLinkCell onClick={() => assembly.participant_history.watch(participant.uuid, () => assembly.currentPage = CoordinatorParticipantHistory)}>
            {participant.name}
          </NameLinkCell>

          <Cell>
            { participant.today.medication_reports.length > 0
              ? DateTime
                  .fromISO(participant.today.medication_reports[0].timestamp, {zone: 'utc'})
                  .setLocale(assembly.locale)
                  .toLocaleString(DateTime.TIME_SIMPLE)
              : null
            }
          </Cell>

          <Cell>
            {participant.today.symptom_reports.map(symptom_report =>
              <div key={symptom_report.created_at} >
                { DateTime
                    .fromISO(symptom_report.timestamp, {zone: 'utc'})
                    .setLocale(assembly.locale)
                    .toLocaleString(DateTime.TIME_SIMPLE)
                }
                { symptom_report.reported_symptoms.map(symptom =>
                  <Symptom key={symptom}>{symptom}</Symptom>
                )}
              </div>
            )}
          </Cell>

          <Cell>
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
          </Cell>

          <Cell>
            <a href={'https://wa.me/' + participant.phone_number.replace(/-/g, "")} target="_blank">
              {participant.phone_number}
            </a>
          </Cell>

          <Cell>
            <CoordinatorNote>
              <TextField use="textarea" />
              <InlineButton>Save Note</InlineButton>
            </CoordinatorNote>
          </Cell>

          <Cell>
            {parseInt(participant_adherence(participant) * 100, 10) + "%"}
          </Cell>

          <Cell>
            {days_of_treatment(participant)}
          </Cell>
        </Row>
      )}
    </InformationTable>
  </Layout>
))

const Layout = styled.div`
  margin-top: 2rem;
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

const InformationTable = styled.div`
  display: grid;
  grid-template-rows: repeat(9, 1fr);
`

const Row = styled.div`
  &:first-child {
    border-bottom: 1px solid ${darkgrey};
  }

  display: grid;
  grid-template-columns: repeat(9, 1fr);
  border-bottom: 1px solid ${lightgrey};
  margin-bottom: 1rem;
`

const Cell = styled.div`
  padding: 0.5rem;
`

const NameLinkCell = styled.div`
  padding: 0.5rem;
  text-decoration: underline;
`

// Need a thorough review of this logic;
// it seems to work for now,
// but won't hold up in the live site.
const participant_has_reports_that_have_not_been_resolved = (participant) => (
  (
    participant.medication_reports +
    participant.symptom_reports +
    participant.strip_reports
  ).length === 0
)

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome
