import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { computed } from "mobx"
import Button from "../primitives/Button"
import { darkgrey, lightgrey, green, white } from "../colors"
import { Block, Tabs } from "reakit";

const Survey = observer(({ store }) => (
  <div>
    <Tabs.Container>
      {tabs => (
        <Block>
          <Tabs>
            {store.survey.pages.map((page, index) => (
              <Tab
                active={index === tabs.current}
                key={page.title}
                tab={page.title}
                {...tabs}
              >
                {index + 1}: {page.title}
              </Tab>
            ))}
          </Tabs>

          {store.survey.pages.map(page => (
            <Tabs.Panel
              key={page.title}
              tab={page.title}
              {...tabs}
            >
              {React.createElement(page, { store: store })}
            </Tabs.Panel>
          ))}

          <Buttons>
            <Button as={Tabs.Next} color={darkgrey} backgroundColor={lightgrey} {...tabs} >
              Omitir
            </Button>

            <Button as={Tabs.Next} {...tabs} >
              Continuar
            </Button>
          </Buttons>
        </Block>
      )}
    </Tabs.Container>
  </div>
))

const Buttons = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
  width: 100%;
`

const Tab = styled(Tabs.Tab)`
  border: 1px solid white;
  margin-top: 0.1rem;
  padding: 0.5rem;
  color: ${(tabs) => tabs.active ? green : white };
  background-color: ${(tabs) => tabs.active ? white : green };
`

Survey.route = "/survey"
export default Survey
