const mongoose = require('mongoose');
const schema = mongoose.Schema;

let categorySchema = new schema({
    name: String,
    description: String,
    subs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        }
    ],
    Departments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        }
    ],
}, {timestamps:true});

module.exports = mongoose.model('Category', categorySchema);