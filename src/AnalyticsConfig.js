import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import React from 'react'

const isProduction = window && window._env && window._env.DOCKER_TAG === "master"

const instance = isProduction ? createInstance({
    urlBase: isProduction ? window._env.MATOMO_URL : "",
    siteId: isProduction ? window._env.MATOMO_ID : "",
    userId: isProduction ? window._env.MATOMO_ID : ""
}) : {};

const MatomoConfig = (props) => {

    if (isProduction) {
        return (
            <MatomoProvider value={instance}>
                {props.children}
            </MatomoProvider>
        )
    }

    return (<>
        {props.children}
    </>)

}

export default MatomoConfig;