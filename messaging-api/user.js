var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        userID: {"type":Number,"required": true},
        channelID: {"type":Number,"required": true},
        numberOfMessages: {"type":Number,"required": true}
})

userSchema.index({ "userID": 1, "channelID": 1}, { "unique": true });

var User = mongoose.model('User', userSchema);
module.exports = User;
