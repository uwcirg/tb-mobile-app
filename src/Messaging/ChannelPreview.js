import React from 'react';
import styled from 'styled-components'
import Colors from '../Basics/Colors'
import { useTranslation } from 'react-i18next'
import UnreadBadge from './UnreadBadge'
import {observer} from 'mobx-react'

const ChannelPreview = observer((props) => {

    const {t} = useTranslation('translation');

    const getSubtitle = () => {
        if(props.private) return t("messaging.privateExplained")
        if(props.isSiteChannel) return t("messaging.clinicChat")
        return props.subtitle
    }

    return (
        <Container {...props}>
            <div className="display"><span>{props.title ? props.title[0] : "C"}</span></div>
            <BorderedPart hideBorder={props.coordinator}>
                <div className="text">
                    <h2>{props.title === "tb-expert-chat" ?  t('messaging.expert') : props.title }</h2>
                    <p>{getSubtitle()}</p>
                </div>
                <div className="rightSideContainer">
                    <span id="time" >{props.time}</span>
                    {props.unread > 0 && <UnreadBadge value={props.unread} />}
                </div>
            </BorderedPart>
        </Container>
    )
});

const BorderedPart = styled.div`
    border-bottom: ${props => !props.hideBorder ? 'solid 1px lightgray' : 'unset'};
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

`

const Container = styled.div`

    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    margin: auto;
    min-height: 10vh;
    border: none;
    margin-top: ${props => props.coordinator ? 0 : '1em'};
    background-color: ${props => props.selected ? Colors.lightgray : 'unset'};
    border-radius: 5px;

    .display{
        padding: 0;
        margin: 0em .5em 0em .5em;
        min-height: 50px;
        min-width: 50px;
        max-height: 50px;
        max-width: 50px;
        border-radius: 50px;
        background-color: ${props => { 
            if(props.isSiteChannel) return Colors.blue
            return props.private ? Colors.green : Colors.babyBlue}};
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