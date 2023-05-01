const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presentationSchema = new Schema({
    speaker: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "faculty", "outside"]
    },
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
    title: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model("presentation", presentationSchema);
