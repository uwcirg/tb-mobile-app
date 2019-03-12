import React from "react";

import { Button, Link, List, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
import { blue } from "../colors"

import { observer } from "mobx-react"

const Contact = observer(({assembly}) => (
    <Provider theme={theme}>
      <div>
        <h2>
          {assembly.translate("contact.title")}
        </h2>

        <List>
          <li>{assembly.translate("contact.first")}</li>
          <li>{assembly.translate("contact.second")}</li>
        </List>

        <Divider />

        <Link href="https://github.com/uwcirg/tb-mobile-app" target="_blank">
          <Button backgroundColor={blue}>Link to WhatsApp</Button>
        </Link>
      </div>
    </Provider>
))

Contact.route = "/contact"
export default Contact;
