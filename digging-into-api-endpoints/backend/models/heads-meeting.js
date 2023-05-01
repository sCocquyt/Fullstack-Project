const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const headsMeetingSchema = new Schema({
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

module.exports = mongoose.model("headsMeeting", headsMeetingSchema);
