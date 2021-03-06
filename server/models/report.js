const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    status: {
        type: String,
        enum: ["Solved", "Partially Solved", "Unsolved"],
        required: true
    },
    languageUsed: {
        type: String,
        required: true
    },
    compileTime: {
        type: String,
        required: true
    },
    timeSpent: {
        type: String,
        default: ''
    },
    testcasePassed: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    timestamps: {
        type: Date,
        default: Date.now()
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
})

var UserReport = mongoose.model('Report', reportSchema);

module.exports = UserReport;