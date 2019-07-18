import React from "react"
import styled from "styled-components"
import { Button } from "reakit"
import { green, red} from "../colors"
import theme from "reakit-theme-default";
import { DateTime } from "luxon"
import { observable, runInAction, action, computed } from "mobx";
import { observer } from "mobx-react"

import Icon from "@mdi/react"
import {
    mdiPlus,
    mdiMinus,
    mdiArrowLeftBold,
    mdiArrowRightBold
} from "@mdi/js"



class DiscussStore {

    //Overview info
    @observable onSpecificChannel = false;
    @observable specificChannel = 0;
    @observable userID = "";
    @observable userName = "";

    //Channel Info
    @observable channels = [];
    @observable newChannelName = ""
    @observable newChannelDescription = ""
    @observable isAddingNewChannel = false;

    //Specific Discussion
    @observable specificChannelMessages = [];
    @observable newMessageBody = "";


    constructor(){
        this.url = process.env.REACT_APP_MESSAGE_API;
    }

    @computed get currentChannelObject(){
        return this.channels.find( channel =>{
            return channel.id == this.specificChannel;
        })
    }
   

    @action
    getChannels = () => {

        fetch(`${this.url}/v1/channels`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => resolve.json())
            .then(json =>
                    this.channels = json
            )
    }

    postChannel = () => {
        let channelJSON = { description: this.newChannelDescription, name: this.newChannelName };
        fetch(`${this.url}/v1/channels`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": this.userID
            },
            body: JSON.stringify(channelJSON),
        }).then(resolve => resolve.json())
            .then(json => { this.getChannels() });
    }

    @action
    getDiscussion = () => {

        fetch(`${this.url}/v1/channels/${this.specificChannel}`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => {
                return resolve.json()})
        .then(json =>{
                    this.specificChannelMessages = json
            }
        ).catch( err => console.log(err))

    }

    postMessage = () => {
        let messageJSON = { body: this.newMessageBody, userName: this.userName };
        fetch(`${this.url}/v1/channels/${this.specificChannel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": this.userID
            },
            body: JSON.stringify(messageJSON),
        }).then(resolve => resolve.json())
        .then(json => { this.getDiscussion() });
    }


}


function getUserNumber(assembly) {
    return assembly.fetch("menu.phone_number").replace("-", "").trim();
}

function getUserName(assembly) {
    return assembly.fetch("menu.name");
}

const store = new DiscussStore();


@observer
class Discuss extends React.Component {

    componentDidMount(){
        store.userID = getUserNumber(this.props.assembly);
        store.userName = getUserName(this.props.assembly);
    }

    render() {

        if (store.onSpecificChannel) {
            return <Channel assembly={this.props.assembly} ></Channel>
        }
        return <DiscussTest assembly={this.props.assembly} ></DiscussTest>
    }

}

@observer
class DiscussTest extends React.Component {


    updateChannels = (userID) => {
        store.getChannels(userID);
    }

    componentDidMount() {
        this.updateChannels();
    }

    handleChannelClick = (event) => {
        store.onSpecificChannel = true;
        store.specificChannel = event.target.getAttribute('data-key');
    }

    render() {
        let channelList = store.channels.slice().sort((a, b) => {
            return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
        }).map(item => {
            return <ChannelCard key={item.id} data-key={item.id} onClick={this.handleChannelClick}>
                <h1 data-key={item.id} onClick={this.handleChannelClick}>{item.name}</h1>
                <p data-key={item.id} onClick={this.handleChannelClick}>{item.description}</p>
            </ChannelCard>
        })

        return (
            <Layout>
                <h1>{this.props.assembly.translate("discussion_board.title")}</h1>
                {channelList}
                <NewChannel assembly={this.props.assembly} />
            </Layout>
        )
    }
}

@observer
class Channel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    updateMessages = () => {
        store.getDiscussion()
    }

    handleBack = () => {
        store.onSpecificChannel = false;
        store.specificChannelMessages = []
    }

    componentDidMount() {
        this.updateMessages();
    }

    render() {

        let messageList = store
        .specificChannelMessages.slice()
        .sort((a, b) => {
            return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
        }).map(item => {
            return <Message>
                <MessageBody>{item.body}</MessageBody>
                <MessageCreator>{item.creatorName} at {DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED)} </MessageCreator>
            </Message>
        })

        let userID = getUserNumber(this.props.assembly);
        let userName = getUserName(this.props.assembly);

        return (
            <SpecificChannel>
               <Icon id="back" onClick={this.handleBack} path={mdiArrowLeftBold} color={green} size="50px" />
                
                <ChannelHeader>
                <h1> 
                {store.currentChannelObject.name}
                </h1>
                <p>{store.currentChannelObject.description}</p>
                </ChannelHeader>

                {messageList}
                <NewMessage user={{ name: userName, id: userID }} updateMessages={this.updateMessages} />
            </SpecificChannel>
        )
    }
}

class NewMessage extends React.Component {


    messageChange = (event) => {
        store.newMessageBody = event.target.value;
    }

    sendMessage = () => {
        store.postMessage();

    }

    render() {
        return <MessageForm>
            <label htmlFor="msg"><b>Message</b></label>
            <MessageGroup>
            <textarea placeholder="Type message.." name="msg" onChange={this.messageChange}></textarea>
            <Send onClick={this.sendMessage} theme={theme} backgroundColor={green}>
            <Icon path={mdiArrowRightBold} color={"white"} size="2em" />
                </Send>
            </MessageGroup>
        </MessageForm>
    }
}

@observer
class NewChannel extends React.Component {

    handlePlus = () => {
        store.isAddingNewChannel = true;
        setTimeout( () => {
            this.scrollToBottom();
        }, 100)
    }

    handleMinus = () => {
        store.isAddingNewChannel = false;
        store.newChannelDescription = "";
        store.newChannelName = "";
    }

    nameChange = (event) => {
        store.newChannelName = event.target.value;
    }

    descriptionChange = (event) => {
        store.newChannelDescription = event.target.value;
    }

    sendNewChannel = () => {
        store.postChannel()
        this.handleMinus();
    }

    scrollToBottom() {
        this.newTitle.scrollIntoView({ behavior: 'smooth' });
      }

    render() {

        let plusIcon = <Icon onClick={this.handlePlus} path={mdiPlus} color={"white"} size="1.5em" />
        let minusIcon = <Icon onClick={this.handleMinus} path={mdiMinus} color={"white"} size="1.5em" />
    
        let title = this.props.assembly.translate("discussion_board.channel_title");
        let description = this.props.assembly.translate("discussion_board.channel_description");
        let type = this.props.assembly.translate("discussion_board.type");

        let controls = (<div ref={newTitle => { this.newTitle = newTitle; }} className="input-group">
        <label htmlFor="msg">{title}</label>
        <br></br>
        <input placeholder={`${type} ${title}... `} name="msg" onChange={this.nameChange}></input>
        <br></br>
        <label htmlFor="msg">{description}</label>
        <br></br>
        <textarea placeholder={`${type} ${description}... `} name="msg" onChange={this.descriptionChange}></textarea>
        <br></br>
        </div>)


        return <ChannelForm>
 
            <h1 onClick={store.isAddingNewChannel ? this.handleMinus : this.handlePlus}>{this.props.assembly.translate("discussion_board.new_channel")} 
            {store.isAddingNewChannel ? minusIcon : plusIcon} 
            </h1>
            {store.isAddingNewChannel ? controls : ""}
            {store.isAddingNewChannel && (store.newChannelName && store.newChannelDescription) ? <Button  onClick={this.sendNewChannel} theme={theme}>{this.props.assembly.translate("discussion_board.add")}</Button> : ""}
        </ChannelForm>
    }
}

const Layout = styled.div`
h1{
    font-size: 1.5em;
}
`
const MessageForm = styled.div`
position: absolute;
bottom: 5px;

label{
    display: none;
}

`

const Send = styled.div` 

    //position: absolute;
    //right: 0px;
    //bottom: 5px;
    height: 75px;
    margin: 5px;
    width: 20%
    background-color: ${green};
    float: left;

    svg{
        display: block;
        margin: auto;
        margin-top: 33%;
    }

`
const MessageGroup = styled.div`
    bottom: 0px;
    width: 95vw;

    textarea{
        float: left;
        width: 65%;
        padding: 15px;
        margin: 5px 0 0px 0;
        border: none;
        background: #f1f1f1;
        resize: none;
        min-height: 25px;
        font-size: 1.25em;
    }

`

const ChannelCard = styled.div`
background-color: white;
border: soild 5px;
padding: .5em 1em .5em 1em;
margin-bottom: .5em;
border-radius: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);

h1{
    font-size: 1.5em;
}
`

const SpecificChannel = styled.div`
position: relative;
#back{
    position: absolute;
    top 10px;
    left: -10px;
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

const ChannelForm = styled(ChannelCard)`

position: relative;

button{
    background-color: white;
    color: green;
    position: absolute;
    bottom: 1em;
    right: 1em;
}

.input-group{

    label{
        font-size: 1.5em;
        font-weight: bold;
        display: inline-block;
        margin-top: 1em;
        margin-bottom: .5em
    }

    input{
        padding: 1em;
        width: 70%
        border: none;
        border-radius: 2px;
    }

    textarea{
        width: 70%;
        height: 50px;
        resize: none;
        margin-bottom: 100px;
        padding: 1em;
        border: none;
        border-radius: 2px;

    }
}


h1{
    display: inline-block;
    position: relative;
    width: 100%;
}

h1 svg{
    display: inline-block;
    position: absolute;
    top: -2px;
    right: 0;
}

background-color: ${green}

`


const Message = styled.div`
color: black;
padding: .5em;
margin: .5em;
background-color: white;
border-radius: 5px;

`

const MessageBody = styled.div`


`

const MessageCreator = styled.div`
    color: gray;
    font-size: .5em;
    padding-top: .5em;

`

export default Discuss;
