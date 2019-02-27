import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import ReactTable from "react-table"
import "react-table/react-table.css"

import {
  darkgrey,
  grey,
  white,

  green,
  red,
  yellow,
} from "../colors"

import { Input } from "reakit";
import Button from "../primitives/Button"
import Selection from "../primitives/Selection"

import strip_report from "../images/strip_report.jpg"

import Heading from "../primitives/Heading"
import PhotoPopout from "../primitives/PhotoPopout"

import moment from "moment"
import { DateTime } from "luxon"

const CoordinatorHome = observer(({ store }) => {
  let reports = store.medication_reports.records
  let last_medication_report = reports[reports.length - 1]

  let last_report_date = DateTime.fromISO(last_medication_report.timestamp)
  let now = DateTime.local()

  let today = (
    last_report_date.hasSame(now, "year") &&
    last_report_date.hasSame(now, "month") &&
    last_report_date.hasSame(now, "day")
  )

  let today_reports_for_patient = {
    medication: today ? last_medication_report : { timestamp: "" }
  }

  const tableColumns= [
    {
      Header: "Participant Info",
      columns: [
        {
          Header: "First Name",
          accessor: "firstname",
          width: 100,
          Cell: row => <RightAlign>{row.value}</RightAlign>
        },

        {
          Header: "L.I.",
          id: "last_initial",
          accessor: (r) => r.lastname[0],
          width: 40,
        }

      ]
    },

    {
      Header: "Today",
      columns: [
        {
          Header: "Medication",
          id: "med_report_status",

          accessor: (r) =>
          DateTime.fromISO(today_reports_for_patient.medication.timestamp),

          Cell: observer(row => (
              <Indicator status={ today ? "reported" : "notreported" }>
                &#x25cf;
                {row.value && row.value.toLocaleString(DateTime.TIME_SIMPLE)}
              </Indicator>
          ))
        },

        {
          // TODO: put side effects into a line break list
          Header: "Side Effects",
          accessor: "side_effects",
          Cell: r => (
            <div>
              {r.value.map(symptom => <Symptom key={symptom}>{symptom}</Symptom>)}
            </div>
          )
        },

        {
          Header: "Photo",
          accessor: "photo",
          Cell: e=>
          <PhotoPopout
            src={strip_report}
          >
            <Selection
              options={["positive", "negative"]}
              update={() => null}
              onChange={value => store.setPhotoStatus(value)}
            />
          </PhotoPopout>
        },
      ]
    },

    {
      Header: "Coordinator Actions",
      columns: [
        {
          Header: "Contact",
          accessor: "phone",
          // Add's a What's App Link to the table
          // TODO: make sure phone number is properly formatted in DB
          Cell: e =><a href={'https://wa.me/' + e.value} target="_blank"> {e.value} </a>
        },

        {
          Header: "My Notes",
          accessor: "coordinator_note",
          width: 175,
          Cell: e=>
          <CoordinatorNote>
            <TextField use="textarea" />
            <InlineButton>Save Note</InlineButton>
          </CoordinatorNote>
          // TODO: Add an action to connect to the DB after
          // the Save Note button is clicked
        },
      ]
    },

    {
      Header: "Treatment",
      columns: [

        {
          Header: "% Adherence",
          accessor: "percent_since_start"
        },

        {
          Header: "Start Date",
          accessor: "treatment_start"
        },

      ]
    }
  ];

  return (
    <Layout>
      <span>{moment().format("YYYY-MM-DD")}</span>
      <Heading>Manage Patient Progress</Heading>

      <ReactTable
        data={store.coordinator.patients}
        columns={ tableColumns}
        defaultPageSize={store.coordinator.patients.length}
        showPagination={ false }
        className="-striped -highlight"

        getTdProps={(state, rowInfo, column, instance) => ({
          onClick: (e) => {
            console.log(`Routing to the profile page for ${rowInfo.row.id}`)
          },
        })}
      />
    </Layout>
  )})

const Layout = styled.div`
  background-color: ${white};
  border-radius: 2px;
  border: 1px solid ${darkgrey};
  display: grid;
  grid-row-gap: 1rem;
  padding: 1rem;
`

const Indicator = styled.span`
  color: ${p => ({
    notreported: red,
    reported: yellow,
    confirmed: green,
  }[p.status])};

  transition: all .3s ease;
`

const Symptom = styled.div`
  color: ${red};
`

const RightAlign = styled.div`
  text-align: right;
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

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome
