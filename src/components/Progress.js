import React from "react"
import { observer } from "mobx-react"

import { Button, Link, List, InlineBlock, Heading, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components"
import Layout from "../layouts/Text"

const percentage = 25;

// TODO: Reference issue #42 to see what needs to be done here.
const Progress = observer(({store}) => (
  <Layout>
      <Provider theme={theme}>
        <div>
          <Heading use="h4">
              Progress
          </Heading>
          <CircularProgressbar
              percentage={percentage}
              text={`${percentage}%`} />
        </div>
      </Provider>
  </Layout>
))

Progress.route = "/progress"
export default Progress;
