import React from 'react'
import styled from 'styled-components'

const AppLogo = (props) => {
    return(
    <Title className={props.className}>
    <img src="icon.svg"></img>
    <h1> Asistiante <span>de</span> <br /> Tratamiento</h1>
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
  height: 10vh;
}

h1{
  font-size: 1.5em;
  color: white;
  margin: 0;
  padding: 0;
  margin-top: 1em;

  span{
    font-size: .8em;
  }
}
`

export default AppLogo;