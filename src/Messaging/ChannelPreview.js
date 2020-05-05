import React from 'react';
import styled from 'styled-components'
import Colors from '../Basics/Colors'
import { useTranslation } from 'react-i18next'

const ChannelPreview = (props) => {

    const { t, i18n } = useTranslation('translation');

    return (
        <Container onClick={props.onClick} altColor={props.private}>
            <div className="display"><span>{props.title[0]}</span></div>
            <BorderedPart>
                <div className="text">
                    <h2>{props.private ? `${t("userTypes.coordinator")}` : props.title}</h2>
                    <p>{props.private ? `${t("messaging.privateExplained")}` : props.subtitle}</p>
                </div>
                <div className="rightSideContainer">
                    <span id="time" >{props.time}</span>
                    {props.unread > 0 && <div id="unread"><p>{props.unread}</p></div>}
                </div>
            </BorderedPart>
        </Container>
    )
}

const BorderedPart = styled.div`
    border-bottom: solid 1px lightgray;
    display: flex;
    flex-grow: 1;
    padding: .5em;


.rightSideContainer{
    margin-left: auto;
    margin-right: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
} 

#time{
        display: block;
        font-size: .75em;
        color: gray;
        margin-bottom: 8px;
    }

.text{

    p, h2{
        margin: 0;
        padding: 0;

    }

    h2{
        
        font-size: 1em;
        padding-bottom: .25em;
    }

    p{
        font-size: .75em;
        color: gray;
        font-weight: normal;
    }
}

#unread{
    padding: 2px;
    p{
      color: white;  
    }
    font-size: .75em;
    background-color: ${Colors.buttonBlue};
    border-radius: 15px;
    min-height: 20px;
    min-width: 20px;
    max-height: 20px;
    max-width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
`

const Container = styled.div`

    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 10vh;
    border: none;
    margin-top: 1em;

    .display{
        padding: 0;
        margin: 0em .5em 0em .5em;
        min-height: 50px;
        min-width: 50px;
        max-height: 50px;
        max-width: 50px;
        border-radius: 50px;
        background-color: ${props => props.altColor ? Colors.green : Colors.babyBlue};
        display: flex;
        justify-content: center;
        align-items: center;


        span{
            padding: 0;
            margin: 0;
            font-family: 'Roboto', sans-serif;
            text-transform: uppercase;
            font-size: 1.5em;
            color: white; 
            display: block;
        }
        
        
    }



`


export default ChannelPreview;