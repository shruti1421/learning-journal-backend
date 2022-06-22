const moment=require('moment')
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
        type: String,
        default:moment().format('MMM Do YY')
    },
    lastModified:{
        type: String,
        default:moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    category:{
        type:String,
        default: "miscellaneous"
    },
    isFavorites:{
        type:Boolean,
        default: false
    },
    sharedWith:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique:true
    }]
})

module.exports = mongoose.model('journal',JournalSchema);