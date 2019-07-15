import React from "react"
import styled from "styled-components"
import { Button } from "reakit"
import { green } from "../colors"
import theme from "reakit-theme-default";
import { DateTime } from "luxon"

function postMessage(user, message) {
    let messageJSON = {body: message, userName:user.name };
    return new Promise(resolve => {

        fetch(`http://localhost:5002/v1/channels/0`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": user.id,
            },
            body: JSON.stringify(messageJSON),
        }).then(resolve)

    }).then((result) => {

        return result.json();
    })
}

function getMessages(user) {
    console.log("guser "+ user)
    return new Promise(resolve => {

        fetch(`http://localhost:5002/v1/channels/0`, {
            method: "GET",
            headers: {
                "X-User": user
            },
        }).then(resolve)

    }).then((result) => {
        return result.json();
    })
}

function getUserNumber(assembly) {
    return assembly.fetch("menu.phone_number").replace("-", "").trim();
}

function getUserName(assembly) {
    return assembly.fetch("menu.name");
}

class Discuss extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    updateMessages = (userID) => {
        getMessages(userID).then(stuff => {
            this.setState({
                messages: stuff
            })
        })
    }

    componentDidMount() {
        this.updateMessages(getUserNumber(this.props.assembly));
    }

    render() {

        let messageList = this.state.messages.sort((a,b)=>{
            return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt)
        }).map(item => {
            return <Message>
                <MessageBody>{item.body}</MessageBody>
                <MessageCreator>{item.creatorName}</MessageCreator>
            </Message>
        })

        let userID = getUserNumber(this.props.assembly);
        let userName = getUserName(this.props.assembly);

        return (
            <Layout>
                <h1>{this.props.assembly.translate("discussion_board.title")}</h1>
                {messageList}
                <NewMessage user={{name: userName,id: userID}} updateMessages={this.updateMessages} />
            </Layout>
        )
    }
}

class NewMessage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            newMessage: ""
        }
    }

    messageChange = (event) => {
        this.setState({ newMessage: event.target.value });
    }

    sendMessage = () => {
        postMessage(this.props.user, this.state.newMessage).then(res => {
            this.props.updateMessages(this.props.userID);
        });
        
    }



    render() {
        return <MessageForm>
            <label htmlFor="msg"><b>Message</b></label>
            <textarea placeholder="Type message.." name="msg" onChange={this.messageChange}></textarea>

            <Button onClick={this.sendMessage} theme={theme} backgroundColor={green}>Submit
          </Button>
        </MessageForm>
    }
}

const Layout = styled.div`
padding: 1em;
`

const MessageBody = styled.div`
    padding: .5em;

`

const MessageCreator = styled.div`
    color: white;
    padding-left: .5em;

`

const MessageForm = styled.div`

    width: 80%;

    textarea{
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #f1f1f1;
        resize: none;
        min-height: 50px;
        font-size: 1.25em;
    }

`


const Message = styled.div`
color: black;
padding: 1em;
margin: 1em;
background-color: darkgrey;
border-radius: 5px;

`

export default Discuss;
