const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        enum: [0, 9, 10, 11, 12]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["Pre-training", "Training", "Review team member", "Head", "Off-boarded", "Faculty advisor", "empty"],
    },
    reviewTeam: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
    },
    photo: {
        type: String,
        // required: true
    }
});


module.exports = mongoose.model("member", memberSchema);
