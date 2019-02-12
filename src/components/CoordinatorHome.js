import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import ReactTable from "react-table"
import "react-table/react-table.css"
import { blue, darkblue } from "../colors"

import { Input } from "reakit";
import { Block, Button, Backdrop, Portal, Overlay } from "reakit";

// import Button from "../primitives/Button"

// src/primitives/Button.js


// For displayig image
import { Image } from "reakit"
import strip_report from "../images/strip_report.jpg"

import { green, red, white, darkgrey } from "../colors"

import Heading from "../primitives/Heading"
import Help from    "../primitives/Help"
import PhotoPopout from "../primitives/PhotoPopout"

// make my own "Photo" popup?
// import Photo from   "../pr"

import { Icon } from "@mdi/react"
import { mdiClose, mdiCheckCircle, mdiCheckCircleOutline } from "@mdi/js"

import moment from "moment"

// TODO: do we need these?
const Icons = {
  good: <Icon size={1} color={green} path={mdiCheckCircle} />,
  okay: <Icon size={1} color={green} path={mdiCheckCircleOutline} />,
  bad:  <Icon size={1} color={red}   path={mdiClose} />,
}

const CoordinatorHome = observer(({ store }) => {

  const tableColumns= [
    {
      Header: "Personal",
      columns: [
        {
          Header: 'Status',
          accessor: 'status',
          Cell: observer(e=> <div>
                  <label>
                    {/* onChange={e => store.setPhotoStatus('positive')} */}
                    {/* store.current_strip_report = 'negative' */}
                    <Input type="checkbox" name="photostatus" onChange={e => store.current_strip_report = 'positive'}
                           checked={store.current_strip_report === 'positive'} /> Positive
                    <br></br>
                    <Input type="checkbox" name="photostatus" onChange={e => store.current_strip_report = 'negative'} 
                          checked={store.current_strip_report === 'negative'} /> Negative / Unclear
                    <br></br>
                    {/* TODO: style like a button */}
                    <Input type="submit" name="photostatus" onClick={e => console.log("Target Value", store.current_strip_report)}/>
                  </label>
                </div>)
        },
        {
          Header: "Status",
          accessor: "medication_report_dates",
          Cell: row => (
            <span>
              <span style={{
                color: row.value === 'notreported' ? '#ff2e00'
                  : row.value === 'reported' ? '#ffbf00'
                  : '#57d500',
                transition: 'all .3s ease'
              }}>
                &#x25cf;
              </span> {
                row.value === 'notreported' ? 'Not Reported'
                : row.value === 'reported' ? `Reported`
                : 'Confirmed'
              }
            </span>
          )
        },
        {
          Header: "First",
          accessor: "firstname"
        },
        {
          Header: "Last",
          accessor: "lastname"
        }
      ]
    },
    {
      Header: 'Actions',
      columns: [
        {
          Header: "Photo",
          accessor: "photo",
          Cell: e=>
            <PhotoPopout>
              <Image
                    src={strip_report}
                    alt={"Strip report"}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
              />
            </PhotoPopout>
        },
  
        {
          Header: "Contact",
          accessor: "phone",
          // Add's a What's App Link to the table
          // TODO: make sure phone number is properly formatted in DB
          Cell: e =><a href={'https://wa.me/' + e.value} target="_blank"> {e.value} </a>
        },
        {
          Header: "Profile",
          accessor: "id",
          Cell: e=><a hrer={e.value} target="_black"> View </a>
        },
        {
          Header: "My Notes",
          accessor: "coordinator_note",
          Cell: e=>
          <div>
            <Input use="textarea" />
            <br></br>
            <br></br>
            <Button>Save Note</Button>
          </div>
          // TODO: Add a submit button
        },
      ]
    },
    {
      Header: "Treatment",
      columns: [
        {
          // TODO: put side effects into a line break list
          Header: "Side Effects",
          accessor: "side_effects"
        },
        {
          Header: "Last Reported Date",
          accessor: "last_repored_date"
        },
        {
          Header: "% Adherence",
          accessor: "percent_since_start"
        },      
        {
          Header: "Start Date",
          accessor: "treatment_start_date"
        },
      ]
    }
  ];

  return (
    <Layout>
      <span>{moment().format("YYYY-MM-DD")}</span>
      <br />
      <Heading>Manage Patient Progress</Heading>
      <br />

      <ReactTable
            data={store.coordinator.patients}
            columns={ tableColumns}
            defaultPageSize={10}
            showPagination={ false }
            className="-striped -highlight"
      />
    </Layout>
)})

// STYLING TODO:
// - get rid of the border
// - what is the heading style?
const Layout = styled.div`
  background-color: ${white};
  border: 1px solid ${darkgrey};
`

// Padding not working on this styled element
const Table = styled(ReactTable)`
  margin-top: 1rem;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
`

CoordinatorHome.route = "/coordinator"
export default CoordinatorHome