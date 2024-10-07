const mongoose = require('mongoose')
const urlschema = new mongoose.Schema({
    shorturl:{
        type:String,
        required:true,
    },
    longurl:{
        type:String,
        required:true,
    }
})
const hello = mongoose.model('url',urlschema)


module.exports = hello





