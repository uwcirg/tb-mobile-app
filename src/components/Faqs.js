import React from "react"
import { observer } from "mobx-react"
import Layout from "../layouts/Text"
import styled from "styled-components"
import Fold from "../primitives/Fold"

import {
  Paragraph,
  List,
} from "reakit"

const FAQs = observer(({ assembly }) => (
  <Layout>
    <Title>{assembly.translate("faqs.title")}</Title>

    <P>{assembly.translate("faqs.intro_1")}</P>
    <P>{assembly.translate("faqs.intro_2")}</P>

    {/* Iframe for embeded Video1Embed */}
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/KizqF_HmI2w" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    {/* Iframe for embeded Video2Embed */}
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/vaXrKW0ZGtg" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    <Fold>
      <Question>
        {assembly.translate("faqs.q1.question")}
      </Question>

      <Answer>
        <P>{assembly.translate("faqs.q1.answer.1")}</P>
        <P>{assembly.translate("faqs.q1.answer.3")}</P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        {assembly.translate("faqs.q2.question")}
      </Question>

      <Answer>
        <P>{assembly.translate("faqs.q2.answer.1")}</P>
        <P>{assembly.translate("faqs.q2.answer.2")}</P>
        <P>{assembly.translate("faqs.q2.answer.3")}</P>

        <Bullets>
          <Bullet>{assembly.translate("faqs.q2.answer.6-bullets.1")}</Bullet>
          <Bullet>{assembly.translate("faqs.q2.answer.6-bullets.2")}</Bullet>
          <Bullet>{assembly.translate("faqs.q2.answer.6-bullets.3")}</Bullet>
          <Bullet>{assembly.translate("faqs.q2.answer.6-bullets.4")}</Bullet>
        </Bullets>
      </Answer>
    </Fold>

    <Fold>
      <Question>{assembly.translate("faqs.q3.question")}</Question>

      <Answer>
        <P>{assembly.translate("faqs.q3.answer")}</P>
      </Answer>
    </Fold>

    <Fold>
      <Question>{assembly.translate("faqs.q4.question")}</Question>

      <Answer>
        <P>{assembly.translate("faqs.q4.answer.1")}</P>
        <P>{assembly.translate("faqs.q4.answer.2")}</P>
        <P>{assembly.translate("faqs.q4.answer.3")}</P>
        <P>{assembly.translate("faqs.q4.answer.4")}</P>
        <P>{assembly.translate("faqs.q4.answer.5")}</P>
        <P>{assembly.translate("faqs.q4.answer.6")}</P>
      </Answer>
    </Fold>

    <Fold>
      <Question>{assembly.translate("faqs.q5.question")}</Question>

      <Answer>
        <P>{assembly.translate("faqs.q5.answer.1")}</P>
        <P>{assembly.translate("faqs.q5.answer.2")}</P>

        <P><Underline>{assembly.translate("faqs.q5.answer.3")}</Underline></P>

        <Bullets>
          <Bullet>{assembly.translate("faqs.q5.answer.4.1")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.4.1")}</Bullet>
        </Bullets>

        <P>
          <Underline>{assembly.translate("faqs.q5.answer.5.1")}</Underline>
          {assembly.translate("faqs.q5.answer.5.2")}
        </P>

        <Bullets>
          <Bullet>{assembly.translate("faqs.q5.answer.6.1")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.2")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.3")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.4")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.5")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.6")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.7")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.8")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.9")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.10")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.11")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.12")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.13")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.14")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.15")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.16")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.17")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.18")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.19")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.6.20")}</Bullet>
        </Bullets>

        <P>
          <Underline>{assembly.translate("faqs.q5.answer.7.1")}</Underline>
          {assembly.translate("faqs.q5.answer.7.2")}
        </P>

        {assembly.translate("faqs.q5.answer.rifampicin")}

        <Bullets>
          <Bullet>{assembly.translate("faqs.q5.answer.rifampicin-bullets.1")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.rifampicin-bullets.2")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.rifampicin-bullets.3")}</Bullet>
          <Bullet>{assembly.translate("faqs.q5.answer.rifampicin-bullets.4")}</Bullet>
        </Bullets>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        {assembly.translate("faqs.q6.question")}
      </Question>

      <Answer>
        <P>{assembly.translate("faqs.q6.answer.1")}</P>
        <P>{assembly.translate("faqs.q6.answer.2")}</P>
        <P>{assembly.translate("faqs.q6.answer.3")}</P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        {assembly.translate("faqs.q7.question")}
      </Question>

      <Answer>
        <P>{assembly.translate("faqs.q7.answer.1")}</P>

        <Bullets>
          <Bullet>{assembly.translate("faqs.q7.answer.2.1")}</Bullet>
          <Bullet>{assembly.translate("faqs.q7.answer.2.2")}</Bullet>
          <Bullet>{assembly.translate("faqs.q7.answer.2.3")}</Bullet>
          <Bullet>{assembly.translate("faqs.q7.answer.2.4")}</Bullet>
        </Bullets>

        <Note>{assembly.translate("faqs.q7.answer.3-note")}</Note>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        {assembly.translate("faqs.q8.question")}
      </Question>

      <Answer>
        <P>{assembly.translate("faqs.q8.answer.1")}</P>

        <P>{assembly.translate("faqs.q8.answer.2")}</P>

        <Bullets>
          <Bullet>{assembly.translate("faqs.q8.answer.3.1")}</Bullet>
          <Bullet>{assembly.translate("faqs.q8.answer.3.2")}</Bullet>
          <Bullet>{assembly.translate("faqs.q8.answer.3.3")}</Bullet>
          <Bullet>{assembly.translate("faqs.q8.answer.3.4")}</Bullet>
          <Bullet>{assembly.translate("faqs.q8.answer.3.5")}</Bullet>
        </Bullets>

        <P>{assembly.translate("faqs.q8.answer.4")}</P>
        <P>{assembly.translate("faqs.q8.answer.5")}</P>
        <P>{assembly.translate("faqs.q8.answer.6")}</P>
      </Answer>
    </Fold>
  </Layout>
))

const Answer = styled.div`
`

const Bullet = styled.li`
  margin-top: 0.5rem;
`

const Bullets = styled(List)`
  list-style: inside;
`

const Note = styled(Paragraph)`
`

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

const Question = styled.h3`
  font-weight: 100;
  margin: 0;
`

const Title = styled.h2`
  margin-top: 0;
`

const Underline = styled.span`
  text-decoration: underline;
`

FAQs.route = `/info/faqs`
export default FAQs;
