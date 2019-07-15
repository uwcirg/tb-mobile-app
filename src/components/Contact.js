import React from "react";

import { Button, Link, List, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
import { blue, green, white } from "../colors"

import Discuss from './Discuss'

import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
  mdiWhatsapp,
  mdiChat
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

        <Link href="http://wa.me/5491127481963" target="_blank">
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
        <InternalLink to={Discuss} assembly={assembly} >
        <Button backgroundColor={green}>{assembly.translate("discussion_board.title")}
            <Icon
              path={mdiChat}
              color={white}
              size="1.5rem"
            />
          </Button>
    </InternalLink>
      </div>
    </Provider>
))

Contact.route = "/contact"
export default Contact;
