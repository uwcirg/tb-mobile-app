import React from "react";
import styled from "styled-components"
import Layout from "../layouts/Text"

import { Button, Link, List, Heading, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
import { blue } from "../colors"

import { observer } from "mobx-react"

// Need to make changes here
const Contact = observer(({store}) => (
  <Layout>
    
    {
        <Provider theme={theme}>
          <div>
            
            <Heading use="h4">
              {store.translate("contact.title")}
            </Heading>

            <List>
              <li>{store.translate("contact.first")}</li>
              <li>{store.translate("contact.second")}</li>
            </List>
            <Divider />
            <Link href="https://github.com/uwcirg/tb-mobile-app" target="_blank">
              <Button backgroundColor={blue}>Link to WhatsApp</Button>
            </Link>
        </div>

        </Provider>
    }

  </Layout>
))

Contact.route = "/contact"
export default Contact;
