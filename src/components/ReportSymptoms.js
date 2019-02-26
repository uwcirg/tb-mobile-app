import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Hidden, Input, Provider } from "reakit"
import Callout from "../primitives/Callout"
import { grey, white } from "../colors"
import theme from "reakit-theme-default";

import hives from "../images/hives.jpg"
import rash from "../images/rash.jpg"

import Selection from "../primitives/Selection"
import Heading from "../primitives/Heading"
import Help from "../primitives/Help"

import ImageLineup from "./ImageLineup"

import nausea_0 from "../images/nausea_scale_0.png"
import nausea_2 from "../images/nausea_scale_2.png"
import nausea_4 from "../images/nausea_scale_4.png"
import nausea_6 from "../images/nausea_scale_6.png"
import nausea_8 from "../images/nausea_scale_8.png"
import nausea_10 from "../images/nausea_scale_10.png"

const translation_keys =  { true: "yes", false: "no" }

const ReportSymptoms = observer(({ store, survey }) => (
  <Layout>
    <Heading>{store.translate("survey.symptoms.title")}</Heading>

    <Selection
      update={() =>
          store.translate(
            `primitives.yes_no.${translation_keys[store.survey_anySymptoms]}`
          )
      }
      options={
        Object.values(translation_keys).map((v) =>
          store.translate(`primitives.yes_no.${v}`)
        )
      }
      onChange={(selection) => store.survey_anySymptoms = (
        selection ===
        store.translate(`primitives.yes_no.${translation_keys[true]}`)
      )}
    />

    <Hidden visible={store.survey_anySymptoms} >
      <strong><p>{store.translate("survey.symptoms.prompt")}</p></strong>

      <Label>
        <Checkbox
          checked={store.symptoms.nausea}
          onChange={(e) => {
            store.symptoms.nausea = e.target.checked
            store.symptoms.nausea_rating = 0
          }}
        />

        <span>{store.translate("survey.symptoms.nausea")}</span>

        <Hidden visible={store.symptoms.nausea} >
          {store.symptoms.nausea_rating} / 10
        </Hidden>

        <Callout visible={store.symptoms.nausea && !store.symptoms.nausea_rating}>
          <ImageLineup
            store={store}
            images={{
              0: nausea_0,
              2: nausea_2,
              4: nausea_4,
              6: nausea_6,
              8: nausea_8,
              10: nausea_10,
            }}
            alts={{
              0: store.translate("survey.symptoms.nausea_ratings.0"),
              2: store.translate("survey.symptoms.nausea_ratings.2"),
              4: store.translate("survey.symptoms.nausea_ratings.4"),
              6: store.translate("survey.symptoms.nausea_ratings.6"),
              8: store.translate("survey.symptoms.nausea_ratings.8"),
              10: store.translate("survey.symptoms.nausea_ratings.10"),
            }}
            onSelect={(selection) => {
              store.symptoms.nausea_rating = selection
            }}
          />
        </Callout>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.redness}
          onChange={(e) => store.symptoms.redness = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.redness")}</span>

        <Help>
          <Image
            src={rash}
            alt="Rash: Speckled red areas on the skin, spreading over a larger area and not grouped into patches."
          />
        </Help>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.hives}
          onChange={(e) => store.symptoms.hives = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.hives")}</span>

        <Help>
          <Image
            src={hives}
            alt="Hives: raised red patches on the skin, the size of coins or larger."
          />
        </Help>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.fever}
          onChange={(e) => store.symptoms.fever = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.fever")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.appetite_loss}
          onChange={(e) => store.symptoms.appetite_loss = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.appetite_loss")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.blurred_vision}
          onChange={(e) => store.symptoms.blurred_vision = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.blurred_vision")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.sore_belly}
          onChange={(e) => store.symptoms.sore_belly = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.upset_stomach")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.yellow_coloration}
          onChange={(e) => store.symptoms.yellow_coloration = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.yellow_coloration")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.difficulty_breathing}
          onChange={(e) => store.symptoms.difficulty_breathing = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.difficulty_breathing")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={store.symptoms.facial_swelling}
          onChange={(e) => store.symptoms.facial_swelling = e.target.checked}
        />
        <span>{store.translate("survey.symptoms.facial_swelling")}</span>
      </Label>

      <Provider theme={theme}>
        <TextFieldLabel>
          {store.translate("survey.symptoms.other")}

          <TextInput
            value={store.symptoms.other || ""}
            onChange={e => store.symptoms.other = e.target.value}
          />
        </TextFieldLabel>
      </Provider>
    </Hidden>
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const Label = styled.label`
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  padding-bottom: 0.5rem;
`

const TextFieldLabel = styled(Label)`
  grid-template-columns: 6rem auto;
  margin-top: 1rem;
  grid-column-gap: 1rem;
`

const TextInput = styled(Input)`
  background-color: ${white};
  border: 1px solid ${grey};
`

const Checkbox = styled(Input).attrs({ type: "checkbox" })`
  height: 1rem;
`

const Image = styled.img`
  width: 100%;
`

export default ReportSymptoms
