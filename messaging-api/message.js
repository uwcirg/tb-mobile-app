var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema(
    {
        id: Number,
        channelID: Number,
        body: String,
        createdAt: Date,
        creatorID: Number,
        creatorName: String,
        editedAt: Date
    })

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
