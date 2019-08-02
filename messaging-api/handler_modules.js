"use strict"

const Channel = require("./channel")
const Message = require("./message")
const User = require('./user');


const amqp = require('amqplib/callback_api');

function initalizeGeneralChannel() {

    //Make a general channel if there is not one
    Channel.find({ name: "Discusión General" }, function (err, channels) {
        if (err) throw err;

        // object of all the users
        if (channels.length == 0) {
            var gen = Channel({
                id: 0,
                name: "Discusión General",
                description: "Un lugar para discusión general.",
                private: false,
                createdAt: Date.now()
            })

            gen.save(function (err) {
                if (err) throw err;

                console.log('General Chanel created!');
            });
        } else {
            console.log("General already in the DB")
        }
    });

}

function channels(req, res) {

    if (req.method == "POST") {

        Channel.findOne({}).sort('-id').exec(function (err, response) {
            if (err) {
                let error = new Error("Error finding last id in database")
                error.status = 505
                sendError(res, error)
            }
            if (response == null) {
                postNewChannel(req, res, 0)
            } else {
                postNewChannel(req, res, response.id + 1)
            }
        });

    } else if (req.method == "GET") {
        getChannels(res)
    } else {
        let error = new Error("Method not allowed");
        error.status = 405;
        sendError(res, error)
        return
    }
}

function getChannels(res) {
    Channel.find({}, function (err, response) {
        if (err) {
            err = new Error("Error getting channels from database")
            err.status = 505
            sendError(res, err)

        }
        res.json(response)
    });
}


function postNewChannel(req, res, id) {

    /* POST: Create a new channel using the channel model JSON in the request body. The name property is required, but description is optional. 
    Respond with a 201 status code, a Content-Type set to application/json, and a copy of the new channel model (including its new ID) encoded as a JSON object. */
    let name = req.body.name
    let description = req.body.description
    let chanPrivate = req.body.private

    if (name == undefined) {
        let err = new Error("Request body not formatted correctly. You need a name and an optional description")
        err.status = 400
        sendError(res, err)
        return
    }

    var newChannel = Channel({
        id: id,
        name: name,
        description: description,
        private: chanPrivate,
        members: [req.get('X-User')],
        createdAt: Date.now(),
        creator: req.get('X-User')
    })

    newChannel.save(function (err) {
        if (err) {
            res.send("Error saving new channel to database ")
        }

        //mqSender("channel-new", newChannel, "channel", newChannel.id);
        res.json(newChannel)
    });

}

function specificChannel(req, res, isMemberRequest) {

    let parsedURL = req.originalUrl.split("?before=")

    let channelID = getId(parsedURL[0], isMemberRequest)
    let user = req.get('X-User')

    //Get the list of users from the channel
    Channel.find({ id: channelID }, function (err, response) {
        if (err) {
            res.send("Bad request, channel must be a number")
            return
        }

        //The channel exists
        let returnedChannel = response[0]
        if (returnedChannel) {

            if (!isMemberRequest && (req.method == "POST" || req.method == "GET")) {

                //User is a member of the channel
                if (!returnedChannel.private || returnedChannel.members.indexOf(user) >= 0) {
                    if (req.method == "POST") {
                        postNewMessage(req, res, channelID)
                    } else {
                        if (parsedURL[1]) {
                            getMessagesAfterID(res, channelID, parsedURL[1]);
                        } else {
                            getMessages(req, res, channelID);
                        }
                    }

                } else {
                    let error = new Error("Channel " + channelID + " is Private and you are not a member")
                    error.status = 403
                    sendError(res, error)
                    return
                }
            } else if ((isMemberRequest && ((req.method == "POST") || (req.method == "DELETE"))) || (!isMemberRequest && (req.method == "PATCH" || req.method == "DELETE"))) {

                //Must be creator of channel
                if (returnedChannel.creator == user) {

                    if (!isMemberRequest && req.method == "PATCH") {
                        updateChannel(req, res, channelID)
                    } else if (!isMemberRequest && req.method == "DELETE") {
                        deleteChannel(req, res, channelID)
                    } else if (isMemberRequest && req.method == "POST") {
                        postChannelMember(req, res, channelID)
                    } else if (isMemberRequest && req.method == "DELETE") {
                        deleteChannelMember(req, res, channelID)
                    }
                } else {
                    let error = new Error("Channel " + channelID + " does not belong to you")
                    error.status = 403
                    sendError(res, error)
                    return

                }
            } else {
                let error = new Error("Method not allowed");
                error.status = 405;
                sendError(res, error)
                return
            }

        } else {
            let error = new Error("Channel " + channelID + " does not exist")
            error.status = 404
            sendError(res, error)
            return
        }
    });
}

function postNewMessage(req, res, channelID) {

    if (req.body.body == undefined) {
        let err = new Error("Request body not formatted correctly. You need a message body")
        err.status = 400
        sendError(res, err)
        return
    }

    Message.findOne({}).sort('-id').exec(function (err, response) {
        if (err) {
            console.log(err);
            let error = new Error("Database error")
            error.status = 500
            sendError(res, error)
            return
        }

        var newID;
        if (response == null) {
            newID = 0;
        } else {
            newID = response.id + 1
        }

        var newMessage = Message({
            id: newID,
            channelID: channelID,
            body: req.body.body,
            createdAt: Date.now(),
            creatorID: req.get('X-User'),
            creatorName: req.body.userName
        });

        newMessage.save(function (err) {
            if (err) {
                console.log(err);
                let error = new Error("Database error")
                error.status = 500
                sendError(res, error)
                return
            }

            //mqSender("message-new", newMessage, "message", channelID)
            updateAllUserNotifications(channelID);
            res.json(newMessage)
        });
    });
}

function getMessages(req, res, channelID) {

    Message.find({ channelID: channelID })
        .sort({ createdAt: -1 })
        .exec(function (err, response) {
            if (err) throw err;

            let userID = req.get('X-User');
            clearUserNotifications(userID, channelID)
            res.json(response)

        });

}



function getMessagesAfterID(res, channelID, messageID) {

    Message.find({ channelID: channelID, id: { $lt: messageID } })
        .sort({ createdAt: -1 })
        .limit(100)
        .exec(function (err, response) {
            if (err) throw err;
            res.json(response)

        });

}

function updateChannel(req, res, channelID) {
    var updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.description) updates.description = req.body.description;

    Channel.findOneAndUpdate({ id: channelID }, { $set: updates }, { new: true }, function (err, response) {
        if (err) {
            res.send("Error updating channel");
            return;
        }

        //mqSender("channel-update", response, "channel", channelID)
        res.json(response);
    });

}

function deleteChannel(req, res, channelID) {
    Channel.findOneAndDelete({ id: channelID }, function (err, response) {

        let tempUsers = response.members
        if (err) {
            res.send("Error deleting channel");
            return;
        }

        Message.deleteMany({ channelID: channelID }, function (err, response) {
            if (err) {
                res.send("Error deleting messages from channel");
                return;
            }
            //mqSender("channel-delete", channelID, "channelID", channelID, tempUsers )
            res.send("Channel successfully deleted");
        });

    });


}

function postChannelMember(req, res, channelID) {

    if (req.body.id) {
        let newUser = req.body.id;

        Channel.findOneAndUpdate({ id: channelID }, { $push: { members: newUser } }, { new: true }, function (err, response) {
            if (err) {
                res.send("Error updating channel members");
                return;
            }
            res.json(response)
        });
    } else {
        var error = new Error("Invalid Request Body");
        error.status = 400;
        sendError(res, error);
        return
    }


}

function deleteChannelMember(req, res, channelID) {

    if (req.body.id) {
        let deleteUser = req.body.id;

        Channel.findOneAndUpdate({ id: channelID }, { $pull: { members: deleteUser } }, { new: true }, function (err, response) {
            if (err) {
                res.send("Error updating channel members " + err);
                return;
            }
            res.json(response);
        });
    } else {
        var error = new Error("Invalid Request Body");
        error.status = 400;
        sendError(res, error);
        return
    }

}


function editMessage(req, res) {

    let messageID = getId(req.originalUrl, false);
    let user = req.get('X-User');

    Message.findOne({ id: messageID }, function (err, response) {

        if (err) {
            let error = new Error("Error getting message from database")
            error.status = 500
            sendError(res, error)
            return
        }

        if (response == null) {
            res.send("No message associated with that id");
            return;
        }

        if (user == response.creator) {

            if (req.method == "DELETE") {
                deleteMessage(res, messageID);
            } else if (req.method == "PATCH") {
                patchMessage(req, res, messageID);
            } else {
                let error = new Error("Method not allowed");
                error.status = 403;
                sendError(res, error);
                return;
            }

        } else {
            let error = new Error("Must be creator of message to edit message");
            error.status = 403;
            sendError(res, error);
            return;
        }
    });
}


function deleteMessage(res, messageID) {
    Message.findOneAndDelete({ id: messageID }, function (err, response) {
        let tempChannel = response.channelID;
        if (err) {
            let error = new Error("Error deleting message from database")
            error.status = 500
            sendError(res, error)
            return
        }
        //mqSender("message-delete",messageID,"messageID",tempChannel)
        res.send("Message successfully deleted");
    });

}

function patchMessage(req, res, messageID) {

    if (req.body.body) {
        Message.findOneAndUpdate({ id: messageID }, { body: req.body.body }, { new: true }, function (err, response) {
            if (err) {
                let error = new Error("Error editing message from database")
                error.status = 500
                sendError(res, error)
                return
            }

            //mqSender("message-update",response,"message",response.channelID)
            res.json(response);

        });
    } else {
        let error = new Error("Invalid request body")
        error.status = 400
        sendError(res, error)
        return
    }

}

function getId(url, isMemberRequest) {

    let split = url.split("/")
    let index
    if (isMemberRequest) {
        index = split.length - 2
    } else {
        index = split.length - 1
    }
    let channelID = split[index]

    return channelID
}


function getMessagesPerChannel(req,res) {

    let userID = req.get('X-User');

    //Get full list of channels
    User.find({userID: userID}, (err, userResponse) => {
        if (err) {
            err = new Error("Error getting channels from database")
            err.status = 505
            sendError(res, err)

        }

        Channel.find({}, (err, channelResponse) => {
            if (err) {
                err = new Error("Error getting channels from database")
                err.status = 505
                sendError(res, err)

            }

            if(!userResponse && channelResponse){
                User.create({
                    userID: userID,
                    channelID: channelResponse[0].id,
                    lastMessageID: 0,
                    numberOfMessages: 0
                }, (err,res) =>{
                    if(err){
                        err = new Error("Error establishing new user")
                        err.status = 505
                        sendError(res, err)
                    }
                })
            }

            //Reshape data for response
            let temp = {};

            userResponse.forEach( notification => {
                temp[`${notification.channelID}`] = notification.numberOfMessages
            });

            channelResponse.forEach( channel => {
                
                if(!temp[`${channel.id}`] ){
                    temp[`${channel.id}`] = 0
                }
            })
            res.json(temp);
        });
    });
}

function clearUserNotifications(userID, channelID) {

    User.findOneAndUpdate({ channelID: channelID, userID: userID }, { numberOfMessages: 0 }, (err, res) => {
        if (err) {
            console.log("error + " + err)
        }
        if (!err && !res){
            let temp = User.create({
                userID: userID,
                channelID: channelID,
                lastMessageID: 0,
                numberOfMessages: 0
            }, (err,res) => {
                if( err){
                    console.log("Error adding a channel that notificaiton user didnt have");
                }
            })            
        }
        console.log("updated all users")
    })
}


function updateAllUserNotifications(channelID) {

    User.updateMany({ channelID: channelID }, { $inc: { numberOfMessages: 1 } }, (err, res) => {

        if (err) {
            console.log("error + " + err)
        }
        console.log("updated all users")
    })

}


function sendError(res, err) {
    res.status(err.status || 500);
    res.send(err.message);
}

//export the public functions
module.exports = {
    initalizeGeneralChannel,
    postNewChannel,
    channels,
    specificChannel,
    editMessage,
    getMessagesPerChannel
}