const mongoose = require('mongoose'); 
const schema = mongoose.Schema;

const departmentSchema = new schema({
    name: String,
    description: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {timestamps:true});

module.exports = mongoose.model('Department', departmentSchema);