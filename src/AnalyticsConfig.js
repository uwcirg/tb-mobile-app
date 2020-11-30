import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import React from 'react'

const isProduction = window && window._env && window._env.MATOMO_URL != "not_set" && window._env.MATOMO_ID != "not_set"

const MatomoConfig = (props) => {

    if (isProduction) {

        const instance = isProduction ? createInstance({
            urlBase: isProduction ? window._env.MATOMO_URL : "",
            siteId: isProduction ? window._env.MATOMO_ID : ""
        }) : {};
        
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