import React from "react";

import { Button, Link, List, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
import { blue, green, white } from "../colors"

import Icon from "@mdi/react"
import {
  mdiWhatsapp,
} from "@mdi/js"

import { observer } from "mobx-react"

const Contact = observer(({assembly}) => (
    <Provider theme={theme}>
      <div>
        <h3>
          {assembly.translate("contact.contact_title")}
        </h3>

        <List>
          <li>{assembly.translate("contact.first")}</li>
        </List>

        <Link href="https://github.com/uwcirg/tb-mobile-app" target="_blank">
          <Button backgroundColor={green}>{assembly.translate("contact.whatsapp")}
            <Icon
              path={mdiWhatsapp}
              color={white}
              size="1.5rem"
            />
          </Button>
        </Link>

        <Divider />

        <h3>
          {assembly.translate("contact.discussion_title")}
        </h3>

        <Link href="https://tb-discourse.cirg.washington.edu" target="_blank">
          <Button backgroundColor={blue}>{assembly.translate("contact.discussion")}</Button>
        </Link>
      </div>
    </Provider>
))

Contact.route = "/contact"
export default Contact;
