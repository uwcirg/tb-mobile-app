import React from "react"
import Fold from "../primitives/Fold"
import Layout from "../layouts/Text"
import styled from "styled-components"
import { observer } from "mobx-react"
import {
  Paragraph,
  List,
} from "reakit"

const SymptomOverview = observer(({ assembly }) => (
  <Layout>
    <Title>
      {assembly.translate("symptom_overview.title")}
    </Title>

    <P>{assembly.translate("symptom_overview.intro_1")}</P>
    <P>{assembly.translate("symptom_overview.intro_2")}</P>
    <P>{assembly.translate("symptom_overview.intro_3")}</P>

    <Fold>
      <Heading>
        {assembly.translate("symptom_overview.call_your_doctor_if")}
      </Heading>

      <Bullets>
        <Bullet>{assembly.translate("survey.symptoms.difficulty_breathing")}</Bullet>
        <Bullet>{assembly.translate("survey.symptoms.facial_swelling")}</Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        {assembly.translate("symptom_overview.grave_symptoms")}
      </Heading>

      <Bullets>
        <Bullet>{assembly.translate("symptom_overview.serio.failing_appetite")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.nausea")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.vomiting")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.yellow_coloration")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.fever_3_or_more_days")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.abdominal_pain")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_1")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_2")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_3")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_4")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_5")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_6")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_7")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_8")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.joint_pain")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_9")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_10")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.changes_in_vision")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.placeholder_11")}</Bullet>
        <Bullet>{assembly.translate("symptom_overview.serio.loss_of_hearing")}</Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        {assembly.translate("symptom_overview.q2.heading")}
      </Heading>

      <P>
        {assembly.translate("symptom_overview.q2.take_medication")}
      </P>

      <P>
        {assembly.translate("symptom_overview.q2.rifampicina")}
      </P>

      <Bullets>
        <Bullet>
          {assembly.translate("symptom_overview.q2.bullet_1")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q2.bullet_2")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q2.bullet_3")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q2.bullet_4")}
        </Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        {assembly.translate("symptom_overview.q3.heading")}
      </Heading>

      <Bullets>
        <Bullet>
          {assembly.translate("symptom_overview.q3.bullet_1")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q3.bullet_2")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q3.bullet_3")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q3.bullet_4")}
        </Bullet>

        <Bullet>
          {assembly.translate("symptom_overview.q3.bullet_5")}
        </Bullet>
      </Bullets>
    </Fold>
  </Layout>
))

const Bullet = styled.li`
  margin-top: 0.5rem;
`

const Bullets = styled(List)`
  list-style: inside;
`

const Heading = styled.h3`
  font-weight: 100;
  margin-top: 0;
  margin-bottom: 0;
`

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

const Title = styled.h1`
  margin-top: 0;
`

SymptomOverview.route = `/info/symptom-overview`
export default SymptomOverview
