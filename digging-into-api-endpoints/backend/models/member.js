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
        Min: 9,
        Max: 12
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["pre-training", "training", "review-team", "head", "off-boarded"],
    },
    reviewTeam: {
      type: Number,
      min: 1,
      max: 4,
    },
});


module.exports = mongoose.model("member", memberSchema);
