const mongoose = require('mongoose');
const schema = mongoose.Schema;


let vaccineSchema = new schema({
    vaccineType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VaccineType'
    },
    Owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expireDate : {
        type: Date,
        required: true
    },
    count : {
        type: Number,
        required: true
    }
}, {timestamps:true});

module.exports = mongoose.model('Vaccine', vaccineSchema);