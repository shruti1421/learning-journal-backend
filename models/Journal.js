const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    
    title:{
        type: String,
    },
    content:{
        type: String,
    },
    dateCreated:{
        type: Date,
        default:Date.now()
    },
    lastModified:{
        type: Date,
        default: Date.now()
    },
    category:{
        type:String,
        default: "miscellaneous"
    },
    isFavorites:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('journal',JournalSchema);