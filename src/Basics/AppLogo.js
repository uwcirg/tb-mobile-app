import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'

const AppLogo = (props) => {
    const { t, i18n } = useTranslation('translation');
    return(
    <Title className={props.className}>
    <img src="icon.svg"></img>
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
    margin-top: 1em;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 23px;
    letter-spacing: 0.15px;
}
`

export default AppLogo;