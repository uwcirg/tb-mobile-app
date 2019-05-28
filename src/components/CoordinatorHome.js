import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import { DateTime } from "luxon"
import field from "../util/field"

import {
  darkgrey,
  lightgrey,
  green,
  red,
  white,
} from "../colors"

import CoordinatorParticipantHistory from "../components/CoordinatorParticipantHistory"
import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"
import Selection from "../primitives/Selection"
import { Popover, InlineBlock } from "reakit";

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
      {assembly.translate("coordinator.last_updated")}&nbsp;
      { DateTime
        .local()
        .setLocale(assembly.locale)
        .toLocaleString(DateTime.DATETIME_SHORT)
      }
    </span>
    <Heading>{assembly.translate("coordinator.heading")}</Heading>

    <InformationTable>
      <Row>
        <Cell>{assembly.translate("coordinator.status_")}</Cell>
        <Cell>{assembly.translate("coordinator.last_resolution")}</Cell>
        <Cell>{assembly.translate("coordinator.name")}</Cell>

        <Cell>{assembly.translate("coordinator.medication")}</Cell>
        <Cell>{assembly.translate("coordinator.side_effects")}</Cell>
        <Cell>{assembly.translate("coordinator.photo")}</Cell>

        <Cell>{assembly.translate("coordinator.contact")}</Cell>
        <Cell>{assembly.translate("coordinator.adherence")}</Cell>
      </Row>

      { (
        assembly
          .coordinator_account
          .information
          .participants
        || []
        )
        .slice()
        .sort((a,b) => DateTime.fromISO(b.treatment_start) - DateTime.fromISO(a.treatment_start))
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
                      : resolved_in_last_day(
                          assembly.coordinator_account.information.resolutions,
                          participant
                        )
                        ? last_resolution(
                            assembly.coordinator_account.information.resolutions,
                            participant
                          ).status === "reviewed"
                          ? Icons.reviewed
                          : Icons.overdue
                        : Icons.no_response
                    }
                  </Popover.Toggle>

                  <Popover hideOnClickOutside {...popover} >
                    <Card onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} >
                      <CoordinatorNote>
                        {field(assembly, `coordinator_note.${participant.uuid}`, "textarea").field}
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

          <Cell>
            {
              last_resolution(
                assembly.coordinator_account.information.resolutions,
                participant
              ) &&
              DateTime.fromISO(
                last_resolution(
                  assembly.coordinator_account.information.resolutions,
                  participant
                ).timestamp
              )
              .setLocale(assembly.locale)
              .toLocaleString(DateTime.DATETIME_SHORT)
            }
          </Cell>

          <NameLinkCell
            className="NameLinkCell"
            onClick={(e) => {
              assembly.participant_history.watch(
                participant.uuid,
                () => assembly.currentPage = CoordinatorParticipantHistory
              )
              }
            }>
            {participant.name}
          </NameLinkCell>

          {/* Medication Reports */}
          <Cell>
            { participant
              .medication_reports
              .filter(report => report.resolution_uuid === null)
              .map(report =>
                <div key={report.timestamp} >
                  { DateTime
                    .fromISO(report.timestamp, { zone: "utc" })
                    .setLocale(assembly.locale)
                    .toLocaleString(DateTime.DATETIME_SHORT)
                  }

                  <br></br>
                  <br></br>
                  Submission:
                  { DateTime
                    .fromISO(report.created_at)
                    .setZone('UTC-3')
                    .setLocale(assembly.locale)
                    .toLocaleString(DateTime.DATETIME_SHORT)
                  }

                  <br></br>
                  <br></br>

                  { report.took_medication
                      ? assembly.translate("progress.took_medication_yes")
                      : assembly.translate("progress.took_medication_no") +
                        report.not_taking_medication_reason
                  }
                </div>
              )
            }
          </Cell>

          {/* Symptom Reports */}
          <Cell>
            {participant
              .symptom_reports
              .filter(report => report.resolution_uuid === null)
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
                  { symptom_report.nausea_rating ? symptom_report.nausea_rating + " " : null }
                  { symptom_report.other ? assembly.translate("survey.symptoms.other") + symptom_report.other : null}

                </div>
            )}
          </Cell>

          {/* Strip Reports */}
          <Cell>
            { participant
              .strip_reports
              .filter(report => report.resolution_uuid === null)
              .map((strip_report, index) =>
              <span>
                { DateTime
                    .fromISO(strip_report.created_at)
                    .setZone('UTC-3')
                    .setLocale(assembly.locale)
                    .toLocaleString(DateTime.DATETIME_SHORT)
                }
                <PhotoPopout src={strip_report.photo} key={strip_report.id} >
                  <Selection
                    options={["positive", "negative"]}
                    update={() => strip_report.status}
                    onChange={value => assembly.setPhotoStatus(strip_report.id, value)}
                  />
                </PhotoPopout>
              </span>
            ) }
          </Cell>

          <Cell>
            <a href={'https://wa.me/' + participant.phone_number.replace(/-/g, "")} target="_blank">
              {participant.phone_number}
            </a>
          </Cell>

          <Cell>
            {parseInt(participant.adherence * 100, 10) + "%"}
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
  cursor: pointer;
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

const last_resolution = (resolutions, participant) => {
  let ordered_resolutions = resolutions
    .filter(resolution => resolution.participant_uuid === participant.uuid)
    .sort((a,b) => DateTime.fromISO(b.created_at) - DateTime.fromISO(a.created_at))

  if(ordered_resolutions.length > 0)
    return ordered_resolutions[0]
  else
    return null
}

const resolved_in_last_day = (resolutions, participant) => {
  let resolution = last_resolution(resolutions, participant)

  return (
    resolution &&
    DateTime.fromISO(resolution.timestamp) > DateTime.local().minus({ days: 1 })
  )
}

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome
