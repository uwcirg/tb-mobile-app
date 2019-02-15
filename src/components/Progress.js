import React from "react"
import { observer } from "mobx-react"

import { Button, Link, List, InlineBlock, Heading, Provider, Divider } from "reakit";
import theme from "reakit-theme-default";
//import { blue } from "../colors"

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components"
import Layout from "../layouts/Text"


// Need to make changes here
const percentage = 25;

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

// bring back the grid system

Progress.route = "/progress"
export default Progress;
