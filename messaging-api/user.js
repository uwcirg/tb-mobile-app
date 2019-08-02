var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        userID: Number,
        channelID: Number,
        lastMessageID: Number,
        numberOfMessages: Number
})

var User = mongoose.model('User', userSchema);
module.exports = User;
