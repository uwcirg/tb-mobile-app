import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Hidden, Input, Popover, Provider } from "reakit"
import { darkgrey, white } from "../colors"
import { DateTime } from "luxon"
import field from "../util/field"
import hives from "../images/hives.jpg"
import rash from "../images/rash.jpg"
import { grey } from "../colors"
import theme from "reakit-theme-default";

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

const ReportSymptoms = observer(({ assembly, survey }) => (
  <Layout>

    <Heading>
      {assembly.translate("survey.symptoms.title")}
      {assembly.survey.date === DateTime.local().setLocale(assembly.locale).toLocaleString()
        ? assembly.translate("survey.symptoms.today")
        : assembly.translate("survey.symptoms.on") + assembly.survey.date + "?"}
    </Heading>

    <Selection
      update={() => assembly.translate(
        `primitives.yes_no.${translation_keys[assembly.survey.any_symptoms]}`
      ) }
      options={
        Object.values(translation_keys).map((v) =>
          assembly.translate(`primitives.yes_no.${v}`)
        )
      }
      onChange={(selection) => assembly.survey.any_symptoms = (
        selection ===
        assembly.translate(`primitives.yes_no.${translation_keys[true]}`)
      )}
    />

    <Hidden visible={assembly.survey.any_symptoms} >
      <strong><p>{assembly.translate("survey.symptoms.prompt")}</p></strong>

      <Label>
        <Checkbox
          checked={assembly.symptoms.nausea}
          onChange={(e) => {
            assembly.symptoms.nausea = e.target.checked
            assembly.symptoms.nausea_rating = 0
          }}
        />

        <span>{assembly.translate("survey.symptoms.nausea")}</span>

        <Hidden visible={assembly.symptoms.nausea} >
          {assembly.symptoms.nausea_rating} / 10
        </Hidden>

        <Callout visible={assembly.symptoms.nausea && !assembly.symptoms.nausea_rating}>
          <ImageLineup
            assembly={assembly}
            images={{
              0: nausea_0,
              2: nausea_2,
              4: nausea_4,
              6: nausea_6,
              8: nausea_8,
              10: nausea_10,
            }}
            alts={{
              0: assembly.translate("survey.symptoms.nausea_ratings.0"),
              2: assembly.translate("survey.symptoms.nausea_ratings.2"),
              4: assembly.translate("survey.symptoms.nausea_ratings.4"),
              6: assembly.translate("survey.symptoms.nausea_ratings.6"),
              8: assembly.translate("survey.symptoms.nausea_ratings.8"),
              10: assembly.translate("survey.symptoms.nausea_ratings.10"),
            }}
            onSelect={(selection) => {
              assembly.symptoms.nausea_rating = selection
            }}
          />
        </Callout>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.redness}
          onChange={(e) => assembly.symptoms.redness = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.redness")}</span>

        <Help>
          <Image
            src={rash}
            alt="Rash: Speckled red areas on the skin, spreading over a larger area and not grouped into patches."
          />
        </Help>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.hives}
          onChange={(e) => assembly.symptoms.hives = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.hives")}</span>

        <Help>
          <Image
            src={hives}
            alt="Hives: raised red patches on the skin, the size of coins or larger."
          />
        </Help>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.fever}
          onChange={(e) => assembly.symptoms.fever = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.fever")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.appetite_loss}
          onChange={(e) => assembly.symptoms.appetite_loss = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.appetite_loss")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.blurred_vision}
          onChange={(e) => assembly.symptoms.blurred_vision = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.blurred_vision")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.sore_belly}
          onChange={(e) => assembly.symptoms.sore_belly = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.sore_belly")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.yellow_coloration}
          onChange={(e) => assembly.symptoms.yellow_coloration = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.yellow_coloration")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.difficulty_breathing}
          onChange={(e) => assembly.symptoms.difficulty_breathing = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.difficulty_breathing")}</span>
      </Label>

      <Label>
        <Checkbox
          checked={assembly.symptoms.facial_swelling}
          onChange={(e) => assembly.symptoms.facial_swelling = e.target.checked}
        />
        <span>{assembly.translate("survey.symptoms.facial_swelling")}</span>
      </Label>

      <Provider theme={theme}>
        <TextFieldLabel>
          {assembly.translate("survey.symptoms.other")}

          <TextInput
            value={assembly.symptoms.other || ""}
            onChange={e => assembly.symptoms.other = e.target.value}
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

const Callout = observer(({ children, ...props }) => (
  <CalloutLayout
    fade
    placement="bottom"
    hideOnClickOutside
    {...props}
  >
    { children }
  </CalloutLayout>
))

const CalloutLayout = styled(Popover)`
  background-color: ${white};
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`


export default ReportSymptoms
