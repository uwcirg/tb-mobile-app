import React from "react"
import styled from "styled-components"
import { Button } from "reakit"
import { green} from "../../colors"
import theme from "reakit-theme-default";
import { DateTime } from "luxon"
import { observer } from "mobx-react"

import Channel from './Channel';

import Icon from "@mdi/react"
import {
    mdiPlus,
    mdiMinus
} from "@mdi/js"

import DiscussStore from './DiscussStore'

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
        this.props.assembly.notificationStore.userID = getUserNumber(this.props.assembly);
        this.props.assembly.notificationStore.getChannelNotifications();
        localStorage.setItem('visitedDiscussion',"true");
    }

    render() {
        if (store.onSpecificChannel) {
            return <Channel store={store} assembly={this.props.assembly} ></Channel>
        }
        return <DiscussionList assembly={this.props.assembly} ></DiscussionList>
    }
}

@observer
class DiscussionList extends React.Component {


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

    render(){
        let channelList = store.channels.slice().sort((a, b) => {
            return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
        }).map(item => {
            return <ChannelCard key={item.id} data-key={item.id} onClick={this.handleChannelClick}>
                <h1 data-key={item.id} onClick={this.handleChannelClick}>{item.name}</h1>
                <p data-key={item.id} onClick={this.handleChannelClick}>{item.description}</p>
                {this.props.assembly.notificationStore.fetching || this.props.assembly.notificationStore.channelNotifications[`${item.id}`] == 0 ? "" : <NewMessages data-key={item.id}> <p data-key={item.id}>{this.props.assembly.notificationStore.channelNotifications[`${item.id}`]}</p></NewMessages>}
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

const NewMessages = styled.div`
color: white;
background-color: ${green};
position: absolute;
right: 1em;
top: 1em;
height: 1.5em;
line-height: 1.5em;

width: 1.5em;
padding: .5em;

border-radius: 5px;
text-align: center;

p{
    padding: 0;
    margin: 0;
}
`


const Layout = styled.div`
h1{
    font-size: 1.5em;
}
`

const ChannelCard = styled.div`
background-color: white;
border: soild 5px;
padding: .5em 1em .5em 1em;
margin-bottom: .5em;
border-radius: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);
position: relative;

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

export default Discuss;
