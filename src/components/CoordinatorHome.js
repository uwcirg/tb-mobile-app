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

import CoordinatorParticipantHistory from "../components/CoordinatorParticipantHistory"
import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"
import Selection from "../primitives/Selection"
import participant_adherence from "../util/participant_adherence"
import { Popover, Input, InlineBlock } from "reakit";
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
          <div onClick={(e) => { e.stopPropagation(); e.preventDefault() }}>
            <Popover.Container>
              { popover => (
                <Cell>
                  <Popover.Toggle use={Status} {...popover}>
                    { // Any unresolved reports?
                      (
                        participant.medication_reports.filter(report => report.resolution_uuid === null) +
                        participant.symptom_reports.filter(report => report.resolution_uuid === null) +
                        participant.strip_reports.filter(report => report.resolution_uuid === null)
                      ).length > 0

                      ? Icons.pending_review
                      : Icons.no_response
                    }
                  </Popover.Toggle>

                  <Popover hideOnClickOutside {...popover} >
                    <Card onClick={(e) => { e.stopPropagation(); e.preventDefault() }} >
                      <CoordinatorNote>
                        <TextField
                          use="textarea"
                          onChange={(e) =>
                            assembly.coordinator_note[participant.uuid] = e.target.value
                          }
                        />
                      </CoordinatorNote>

                      <span onClick={(e) => {
                        assembly.resolve_participant_records(participant, "reviewed")
                        e.stopPropagation()
                      }} >
                        {Icons.reviewed}
                      </span>

                      <span onClick={(e) => {
                        assembly.resolve_participant_records(participant, "overdue")
                        e.stopPropagation()
                      }} >
                        {Icons.overdue}
                      </span>
                    </Card>
                  </Popover>
                </Cell>
              ) }
            </Popover.Container>
          </div>

          <NameLinkCell
            onClick={() =>
              assembly.participant_history.watch(
                participant.uuid,
                () => assembly.currentPage = CoordinatorParticipantHistory
              )
            }>
            {participant.name}
          </NameLinkCell>

          <Cell>
            { participant
                .medication_reports
                .filter(report => report.resolution_uuid === null)
                .map(report =>
                  DateTime
                    .fromISO(report.timestamp)
                    .toLocaleString(DateTime.TIME_SIMPLE)
                )
            }
          </Cell>

          <Cell>
            {participant
              .symptom_reports
              .filter(report => report.resolution_uuid === null)
              .map(symptom_report =>
                <div key={symptom_report.created_at} >
                  { DateTime
                      .fromISO(symptom_report.created_at)
                      .toLocaleString(DateTime.TIME_SIMPLE)
                  }
                  { symptom_report.reported_symptoms.map(symptom =>
                    <Symptom key={symptom}>{symptom}</Symptom>
                  )}
                </div>
            )}
          </Cell>

          <Cell>
            { participant
              .strip_reports
              .filter(report => report.resolution_uuid === null)
              .map((strip_report, index) =>
              <PhotoPopout src={strip_report.photo} key={strip_report.id} >
                <Selection
                  options={["positive", "negative"]}
                  update={() => strip_report.status}
                  onChange={value => assembly.setPhotoStatus(strip_report.id, value)}
                />
              </PhotoPopout>
            ) }
          </Cell>

          <Cell>
            <a href={'https://wa.me/' + participant.phone_number.replace(/-/g, "")} target="_blank">
              {participant.phone_number}
            </a>
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

const InformationTable = styled.div`
  display: grid;
  grid-template-rows: auto;
`

const Row = styled.div`
  &:first-child {
    border-bottom: 1px solid ${darkgrey};
  }

  display: grid;
  grid-template-columns: repeat(8, 1fr);
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

const Status = styled(InlineBlock)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Card = styled.div`
  background-color: white;
  padding: 0.5rem;
  border: 1px solid ${lightgrey};
`

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome
