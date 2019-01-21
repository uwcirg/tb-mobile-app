import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import Provider from "../sessions/Provider"

const ProviderHome = observer(({ store }) => (
  <Layout store={store.provider}>
    Assemble-powered provider layout.
  </Layout>
))

const Layout = styled.div`
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

export default ProviderHome
