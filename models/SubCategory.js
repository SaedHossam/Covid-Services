const mongoose = require('mongoose'); 
const schema = mongoose.Schema;

const subCategorySchema = new schema({
    name: String,
    description: String,
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    materials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material'
        }
    ],
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    ]
}, {timestamps:true});

module.exports = mongoose.model('SubCategory', subCategorySchema);