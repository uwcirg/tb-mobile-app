import React from "react"

import { darkgrey } from "../colors"
import { observer, inject } from "mobx-react"
import { DateTime } from "luxon"
import Fold from "../primitives/Fold"

import { Icon } from "@mdi/react"
import { mdiCamera } from "@mdi/js"
import Heading from "../primitives/Heading"
import { Image } from "reakit";

import styled from "styled-components"



class StripPhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = { source: {} }
  }

  getImage = (url) => {

    url = url.replace("https://tb-foundation.cirg.washington.edu",window._env.URL_API)

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("user.token")
      },
    }).then(resolve => resolve.blob())
      .then((result) => {
        let image = URL.createObjectURL(result);
        this.setState({ source: image })
      })

  }

  componentDidMount() {
    this.getImage(this.props.src);
  }

  render() {

    return (
      <Image src={this.state.source}>
      </Image>
    )

  }
}

const StripReports = inject("participantStore")(observer(({ participantStore, assembly }) => (
  <div>
    <Fold>
      <Question>
        <Icon size="1.5rem" color={darkgrey} path={mdiCamera} />
        {assembly.translate("progress.test_result")}
      </Question>

      {(
        participantStore
          .information
          .strip_reports
        || []
      ).length === 0
        ? <Answer>
          <Info>{assembly.translate("progress.no_strip_reports")}</Info>
        </Answer>

        :
        participantStore
          .information.strip_reports
          .slice()
          .sort(function (a, b) {
            // NOTE: We are using created_at here, which is when rails captured the photo
            return DateTime.fromISO(b.created_at) - DateTime.fromISO(a.created_at);
          })
          .map(({ created_at, photo, status, url_photo }) => (
            <Answer>
              <Time key={created_at}>
                {DateTime
                  .fromISO(created_at)
                  .setLocale(assembly.locale)
                  .toLocaleString(DateTime.DATETIME_SHORT)}
              </Time>
              <Info>
                {status ? assembly.translate(`primitives.pos_inconclusive.${status}`) : assembly.translate("progress.not_reviewed")}
              </Info>
              <StripPhoto src={url_photo}>
              </StripPhoto>
            </Answer>
          ))}
    </Fold>
  </div>
)))

const Answer = styled.div`
`

const Question = styled(Heading)`
  font-weight: 100;
  margin: 0;
  display: flexbox;
  align-items: center;
`

const Time = styled.div`
  margin-top: 0.5rem;
`

const Info = styled.div`
  word-wrap: break-word;
`

export default StripReports;
