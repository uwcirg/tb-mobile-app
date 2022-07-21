import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import isIndonesiaPilot from '../Utility/check-indonesia-flag';

const AppLogo = (props) => {
  const { t } = useTranslation('translation');
  const BASE_URL = (window && window._env) ? window._env.URL_CLIENT : ""

  return (
    <Title className={props.className}>
      {isIndonesiaPilot() ? <img src="/logo/id/main.png" /> : <img src={`${BASE_URL}/${props.white ? "logo-white.png" : "logo.png"}`}></img>}
      <h1>{t("title")}</h1>
    </Title>
  )
}

const Title = styled.div`

display: flex;
justify-content: center;
flex-direction: column;
align-content: center;
align-items: center;

img{
  height: 12vh;
}

h1{
    color: white;
    margin: 0;
    padding: 0;
    margin-top: .5em;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 23px;
    letter-spacing: 0.15px;
}
`

export default AppLogo;