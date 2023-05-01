const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const attendeeSchema = require('../models/member.js')

const execMeetingSchema = new Schema({
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    attendees: {
        type: Array
    }
});


module.exports = mongoose.model("execMeeting", execMeetingSchema);
