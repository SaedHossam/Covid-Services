const mongoose = require('mongoose'); 
const schema = mongoose.Schema;

const questionSchema = new schema({
    statment: String,
    type: String,
    quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    options: [
        {
            type: String
        }
    ],
    answer: String
}, {timestamps:true});

module.exports = mongoose.model('Question', questionSchema);