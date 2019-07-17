var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var channelSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        private: Boolean,
        members: [Number],
        createdAt: Date,
        creator: Number,
        editedAt: Date
    })

var Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
