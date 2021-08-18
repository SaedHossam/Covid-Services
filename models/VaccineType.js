const mongoose = require('mongoose');
const schema = mongoose.Schema;


let vaccineTypeSchema = new schema({
    name : {
        type: String,
        required: true
    },
    minAge : {
        type: Number,
        required: true
    },
    numberOfDoes : {
        type: Number,
        required: true,
        default:2
    },
}, {timestamps:true});

module.exports = mongoose.model('VaccineType', vaccineTypeSchema);