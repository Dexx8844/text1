const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    completed: {
        type: Boolean,
        default: false,  
    }
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;