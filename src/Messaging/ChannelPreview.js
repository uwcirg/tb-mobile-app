import React from 'react';
import styled from 'styled-components'
import Colors from '../Basics/Colors'
import {useTranslation} from 'react-i18next'

const ChannelPreview = (props) => {

    const {t, i18n} = useTranslation('translation');

    return (
        <Container onClick={props.onClick} altColor={props.private}>
            <div className="display"><span>{props.title[0]}</span></div>
            <BorderedPart>
                <div className="text">
                <h1>{props.isPersonalChannel ? `Su ${t("userTypes.coordinator")}` : props.title }</h1>
                    <h2> {props.subtitle} {/*<span id="unread">{props.number}</span>*/}</h2>
                </div>
                <span id="time" >{props.time}</span>
            </BorderedPart>
        </Container>
    )
}

const BorderedPart = styled.div`
    border-bottom: solid 1px lightgray;
    display: flex;
    flex-grow: 1;
    padding: 1.5em;

#time{
        display: block;
        font-size: .5em;
        margin-left: auto;
        margin-right: 2em;
    }

.text{

    h2, h1{
        margin: 0;
        padding: 0;

    }

    h1{
        font-size: 1em;
        padding-bottom: .25em;
    }

    h2{
        font-size: .75em;
        color: gray;
        font-weight: normal;
    }
}

#unread{
    background-color: red;
    padding: 2px;
    color: white;
}
`

const Container = styled.div`

    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 10vh;
    border: none;
    margin-top: 1em;

    .display{
        padding: 0;
        margin: 0em .5em 0em .5em;
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background-color: ${props => props.altColor ? Colors.green : Colors.babyBlue};
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;


        span{
            padding: 0;
            margin: 0;
            font-family: 'Roboto', sans-serif;
            text-transform: uppercase;
            font-size: 1.5em;
            color: white; 
        }
        
        
    }



`


export default ChannelPreview;