import { observer } from "mobx-react"
import React from "react"
import styled from "styled-components"
import { green } from "../../colors"
import theme from "reakit-theme-default";
import { DateTime } from "luxon"

import Icon from "@mdi/react"
import {
    mdiArrowLeftBoldCircle,
    mdiArrowRightBold
} from "@mdi/js"


@observer
export default class Channel extends React.Component {

    constructor(props){
        super(props);
        this.bottom = React.createRef();
    }

    updateMessages = () => {
        this.props.store.getDiscussion()
    }

    handleBack = () => {
        this.props.store.onSpecificChannel = false;
        this.props.store.specificChannelMessages = []
        this.props.assembly.refreshNotifications();
    }

    componentDidMount() {
        this.updateMessages();
    }

    scroll = () => {
        setTimeout( () => {
            this.bottom.current.scrollIntoView({ behavior: "smooth" });
        }, 500)
        
    }


    render(){

        let messageList = this.props.store
            .specificChannelMessages.slice()
            .sort((a, b) => {
                return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
            }).map(item => {
                console.log("here")
                return <Message key={item.createdAt}>
                    <MessageBody>{item.body}</MessageBody>
                    <MessageCreator>{item.creatorName} at {DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED)} </MessageCreator>
                </Message>
            })


        let userID = this.props.store.userID;
        let userName = this.props.store.userName;

        return (
            <SpecificChannel>
                <Icon id="back" onClick={this.handleBack} path={mdiArrowLeftBoldCircle} color={"gray"} size="2em" />

                <ChannelHeader onClick={this.scroll}>
                    <h1>
                        {this.props.store.currentChannelObject.name}
                    </h1>
                    <p>{this.props.store.currentChannelObject.description}</p>
                </ChannelHeader>

                <Messages>
                {messageList}
                <div ref={this.bottom}></div>
                </Messages>
                

                <NewMessage assembly={this.props.assembly} scroll={this.scroll} store={this.props.store} user={{ name: userName, id: userID }} updateMessages={this.updateMessages} />
            </SpecificChannel>
        )
    }
}

const Messages = styled.div`
margin-bottom: 100px;

`

const SpecificChannel = styled.div`
position: relative;
#back{
    position: absolute;
    top 20px;
    left: 0px;
}

height: 100%;
`
const ChannelHeader = styled.div`
margin-left: 50px;
padding: .25em 1em 1em .25em;

h1{
    font-size: 1.5em;
}
`

class NewMessage extends React.Component {

    messageChange = (event) => {
        this.props.store.newMessageBody = event.target.value;
    }

    sendMessage = () => {
        this.props.store.postMessage();
        this.props.store.newMessageBody = "";
        this.textArea.value = "";
        this.props.scroll();
    }

    render() {
        return <MessageForm>
            <label htmlFor="msg"><b>Message</b></label>
            <MessageGroup>
                <textarea ref={textArea => { this.textArea = textArea; }} placeholder={`${this.props.assembly.translate("discussion_board.type_here")}...`} name="msg" onChange={this.messageChange}></textarea>
                <Send onClick={this.sendMessage} theme={theme} backgroundColor={green}>
                    <Icon path={mdiArrowRightBold} color={"white"} size="2em" />
                </Send>
            </MessageGroup>
        </MessageForm>
    }
}


const MessageForm = styled.div`
position: fixed;
bottom: 64px;
background-color: lightgray;

margin-left: -1rem;
padding-left: 1rem;

label{
    display: none;
}

`

const Send = styled.div` 
    height: 66px;
    margin: 5px;
    width: 20%
    background-color: ${green};
    float: left;
    display: flex;
    align-items: center;

    svg{
        display: block;
        margin: 0 auto;
    }

`
const MessageGroup = styled.div`
    bottom: 0px;
    width: 100vw;

    textarea{
        float: left;
        width: 65%;
        padding: 15px;
        margin: 5px 0 0px 0;
        border: none;
        background: #f1f1f1;
        resize: none;
        min-height: 25px;
        font-size: 1em;
        background-color: white;
    }

`

const Message = styled.div`
color: black;
padding: .5em;
margin: .5em;
background-color: white;
border-radius: 5px;

`

const MessageBody = styled.div``

const MessageCreator = styled.div`
    color: gray;
    font-size: .5em;
    padding-top: .5em;

`