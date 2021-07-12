import React from 'react';
import styled from 'styled-components';
import Colors from '../Basics/Colors';
import { useTranslation } from 'react-i18next';
import UnreadBadge from './UnreadBadge';
import { observer } from 'mobx-react';
import Label from '../Components/Label';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    noMargin: {
        margin: 0,
        padding: 0
    },
    title:{
        fontSize: "1em",
        paddingBottom: ".25em"
    },
    subTitle:{
        fontSize: ".75em",
        color: "gray",
        fontWeight: "normal"
    }
})

const Title = ({children}) => {
    const classes = useStyles();
    return(<h2 className={`${classes.noMargin} ${classes.title}`}>{children}</h2>)
}

const Subtitle = ({children}) => {
    const classes = useStyles();
    return(<p className={`${classes.noMargin} ${classes.subTitle}`}>{children}</p>)
}

const ChannelPreview = observer((props) => {

    const { t } = useTranslation('translation');


    const getSubtitle = () => {
        if (props.private) return <Subtitle>{t("messaging.privateExplained")}</Subtitle>
        if (props.isSiteChannel) return <Subtitle>{t("messaging.clinicChat")}</Subtitle>
        return props.subtitle
    }

    return (
        <Container {...props}>
            <div className="display"><span>{props.title ? props.title[0] : "C"}</span></div>
            <BorderedPart hideBorder={props.coordinator}>
                <div>
                    <Title>{props.title === "tb-expert-chat" ? t('messaging.expert') : props.title}</Title>
                    {getSubtitle()}
                </div>
                <div className="rightSideContainer">
                    <span id="time" >{props.time}</span>
                    {props.creatorIsArchived && <Label text={t('commonWords.archived')}backgroundColor={Colors.warningRed} />}
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
        if (props.isSiteChannel) return Colors.blue
        return props.private ? Colors.green : Colors.babyBlue
    }};
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