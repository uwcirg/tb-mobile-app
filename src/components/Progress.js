import React from "react"
import { observer } from "mobx-react"
import { blue, beige } from "../colors"

import { Provider, Divider, Paragraph } from "reakit";
import theme from "reakit-theme-default";

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Fold from "../primitives/Fold"
import CustomContentProgressBar from "../primitives/CustomContentProgressBar"

import styled from "styled-components"

const total_treatment_days = 112;
const smaller_text = 'Days of Treatment'
const percentage = Math.round((total_treatment_days / 180) * 100);

const Progress = observer(({store}) => (
  <Layout className="Progress">
      <Provider theme={theme}>
        <div>
          {/* <Row> */}
            {/* TODO: Translations for this whole page */}
            <h3>Mi Progreso</h3>
            <ProgressBarContainer>
              <CustomContentProgressBar>
                <Percentage>{total_treatment_days}</Percentage>
                <div>
                  <strong>Days of Treatment</strong>
                </div>
              </CustomContentProgressBar>
            </ProgressBarContainer>

          {/* </Row> */}
          {/* TODO: Link the data to this number */}
          {/* <HighlightBox>25</HighlightBox> Days Reported in a Row */}
        <Divider />
          <Fold>
            <Question>
              Medication History
            </Question>

            <Answer>
              {/* TODO: Figure out how to have treatment date
              and other data imported here */}
              <P>2019/02/20 - Yes</P>
              <P>2019/02/19 - Yes</P>
              <P>2019/02/18 - Yes</P>
              <P>2019/02/17 - No</P>
            </Answer>
          </Fold>

          <Fold>
            <Question>
              Side Effect History
            </Question>

            <Answer>
              {/* TODO: Figure out how to have treatment date
              and other data imported here */}
              <P>2019/02/20 - Nausea</P>
              <P>2019/02/19 - Redness, Nausea, Appetite loss</P>
              <P>2019/02/18 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim et alias nam obcaecati molestias expedita? Eos asperiores illum tempore, repudiandae, maiores molestiae natus aut accusantium voluptate quaerat eaque reiciendis quia?</P>
              <P>2019/02/17 - Null</P>
            </Answer>
          </Fold>

          <Fold>
            <Question>
              Test Result History
            </Question>

            <Answer>
              {/* TODO: Figure out how to have treatment date
              and other data imported here */}
              <P>2019/02/20 - Unclear / Not Yet Confirmed</P>
              <P>2019/02/19 - Confirmed</P>
              <P>2019/02/18 - Confirmed</P>
              <P>2019/02/17 - No Photo Submitted</P>
            </Answer>
          </Fold>
        </div>
      </Provider>
  </Layout>
))

const Layout = styled.div`
  background: ${beige};
`

const TreatmentDays = styled.div`
  text-align: center;
`

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
`

const Percentage = styled.div`
  font-size: 40px;
  font-weight: 400;
`

const HighlightBox = styled.p`
  border: 2px solid black;
  width: fit-content;
  padding: 0.5rem;
  display: inline-block;
`

const Row = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 6rem;
`

const Question = styled.h3`
  font-weight: 100;
  margin: 0;
`

const Answer = styled.div`
`

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

Progress.route = "/progress"
export default Progress;


{/* <ProgressBarContainer className="ProgressBarContainer">
<CircularProgressbar
  percentage={percentage}
  text = {<h1>Testing</h1>}
  // text={`${smaller_text} Random Text`}
  background
  backgroundPadding={6}
  styles={{
    background: {
      fill: "#fff",
    },
    text: {
      // fill: blue,
      fontSize: '7px',
    },
    // path: {
    //   // stroke: '#fff',
    // },
    // trail: { stroke: 'transparent' },
  }}
/>
{/* <TreatmentDays>Days of Treatment </TreatmentDays> */}
// </ProgressBarContainer>