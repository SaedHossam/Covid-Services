const mongoose = require('mongoose'); 
const schema = mongoose.Schema;

const materialSchema = new schema({
    name: String,
    description: String,
    type: String,
    path: String,
    subCatecory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCatecory'
    }
}, {timestamps:true});

module.exports = mongoose.model('Material', materialSchema);