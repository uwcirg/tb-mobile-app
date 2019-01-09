import React from "react"
import Fold from "../primitives/Fold"
import Layout from "../layouts/Text"
import styled from "styled-components"
import { observer } from "mobx-react"
import {
  Paragraph,
  List,
} from "reakit"

const SymptomOverview = observer(({ store }) => (
  <Layout>
    <Title>
      {store.translate("symptom_overview.title")}
    </Title>

    <P>{store.translate("symptom_overview.intro_1")}</P>
    <P>{store.translate("symptom_overview.intro_2")}</P>
    <P>{store.translate("symptom_overview.intro_3")}</P>

    <Fold>
      <Heading>
        {store.translate("symptom_overview.call_your_doctor_if")}
      </Heading>

      <Bullets>
        <Bullet>{store.translate("survey.symptoms.difficulty_breathing")}</Bullet>
        <Bullet>{store.translate("survey.symptoms.facial_swelling")}</Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        {store.translate("symptom_overview.grave_symptoms")}
      </Heading>

      <Bullets>
        <Bullet>{store.translate("symptom_overview.grave.failing_appetite")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.nausea")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.vomiting")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.yellow_coloration")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.fever_3_or_more_days")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.abdominal_pain")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_1")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_2")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_3")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_4")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_5")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_6")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_7")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_8")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.joint_pain")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_9")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_10")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.changes_in_vision")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.placeholder_11")}</Bullet>
        <Bullet>{store.translate("symptom_overview.grave.loss_of_hearing")}</Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        {store.translate("symptom_overview.q2.heading")}
      </Heading>

      <P>
        {store.translate("symptom_overview.q2.take_medication")}
      </P>

      <P>
        {store.translate("symptom_overview.q2.rifampicina")}
      </P>

      <Bullets>
        <Bullet>
          {store.translate("symptom_overview.q2.bullet_1")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q2.bullet_2")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q2.bullet_3")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q2.bullet_4")}
        </Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        {store.translate("symptom_overview.q3.heading")}
      </Heading>

      <Bullets>
        <Bullet>
          {store.translate("symptom_overview.q3.bullet_1")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q3.bullet_2")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q3.bullet_3")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q3.bullet_4")}
        </Bullet>

        <Bullet>
          {store.translate("symptom_overview.q3.bullet_5")}
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
