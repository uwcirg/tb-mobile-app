import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import ReactTable from "react-table"
import "react-table/react-table.css"

import { green, red, white, darkgrey } from "../colors"

import Heading from "../primitives/Heading"

import { Icon } from "@mdi/react"
import { mdiClose, mdiCheckCircle, mdiCheckCircleOutline } from "@mdi/js"

import moment from "moment"

const Icons = {
  good: <Icon size={1} color={green} path={mdiCheckCircle} />,
  okay: <Icon size={1} color={green} path={mdiCheckCircleOutline} />,
  bad:  <Icon size={1} color={red}   path={mdiClose} />,
}

const CoordinatorHome = observer(({ store }) => (
  <Layout>
    <span>{moment().format("YYYY-MM-DD")}</span>
    <Heading>Manage Patient Progress</Heading>

    <Table
      data={store.provider.patients}
      columns={[
        {
          Header: "medication_report_dates",
          accessor: "medication_report_dates",

          Cell: patient => {
            // TODO placeholder,
            // until we get the data hooked up for this.
            let random = Math.random()
            let randomHealth =
              random > 0.3 ?  ( random > 0.6 ?  "good" : "okay") : "bad"
            let healthBadge = Icons[randomHealth]

            return (
              healthBadge
            )
          }
        },

        { Header: "id", accessor: "id" },
        { Header: "name", accessor: "name" },
        { Header: "treatment_start_date", accessor: "treatment_start_date" },
        { Header: "side_effects", accessor: "side_effects" },
        { Header: "percent_reported", accessor: "percent_reported" },
        { Header: "photo", accessor: "photo" },
        { Header: "note", accessor: "note" },
        { Header: "coordinator_note", accessor: "coordinator_note" },
      ]}
      defaultPageSize={5}
    />
  </Layout>
))

const Layout = styled.div`
  background-color: ${white};
  border: 1px solid ${darkgrey};
  padding: 0.5rem;
`

const Table = styled(ReactTable)`
  margin-top: 1rem;
`

  /*
  def index
    search_term = params[:search].to_s.strip
    resources = Administrate::Search.new(scoped_resource,
                                         dashboard_class,
                                         search_term).run
    resources = apply_collection_includes(resources)
    resources = order.apply(resources)
    resources = resources.page(params[:page]).per(records_per_page)
    page = Administrate::Page::Collection.new(dashboard, order: order)

    render locals: {
      resources: resources,
      search_term: search_term,
      page: page,
      show_search_bar: show_search_bar?,
    }
  end

  def show
    render locals: {
      page: Administrate::Page::Show.new(dashboard, requested_resource),
    }
  end

  def new
    resource = resource_class.new
    authorize_resource(resource)
    render locals: {
      page: Administrate::Page::Form.new(dashboard, resource),
    }
  end

  def edit
    render locals: {
      page: Administrate::Page::Form.new(dashboard, requested_resource),
    }
  end

  def create
    resource = resource_class.new(resource_params)
    authorize_resource(resource)

    if resource.save
      redirect_to(
        [namespace, resource],
        notice: translate_with_resource("create.success"),
      )
    else
      render :new, locals: {
        page: Administrate::Page::Form.new(dashboard, resource),
      }
    end
  end

  def update
    if requested_resource.update(resource_params)
      redirect_to(
        [namespace, requested_resource],
        notice: translate_with_resource("update.success"),
      )
    else
      render :edit, locals: {
        page: Administrate::Page::Form.new(dashboard, requested_resource),
      }
    end
  end

  def destroy
    if requested_resource.destroy
      flash[:notice] = translate_with_resource("destroy.success")
    else
      flash[:error] = requested_resource.errors.full_messages.join("<br/>")
    end
    redirect_to action: :index
  end
  */

export default CoordinatorHome
