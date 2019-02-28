import React from "react";
import Layout from "../layouts/Text"

import { Button, Link, List, Heading, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
import { blue } from "../colors"

import { observer } from "mobx-react"

const Contact = observer(({store}) => (
  // <Layout>
    <Provider theme={theme}>
      <div>
        <h2>
          {store.translate("contact.title")}
        </h2>

        <List>
          <li>{store.translate("contact.first")}</li>
          <li>{store.translate("contact.second")}</li>
          <li>{store.translate("contact.third")}</li>
        </List>

        <Divider />

        <Link href="https://github.com/uwcirg/tb-mobile-app" target="_blank">
          <Button backgroundColor={blue}>Link to WhatsApp</Button>
        </Link>
      </div>
    </Provider>
  // </Layout>
))

Contact.route = "/contact"
export default Contact;
