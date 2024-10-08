import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'

const urlschema = new mongoose.Schema({
    shorturl:{
        type:String,
        required:true,
        default: () => customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 7),
    },
    longurl:{
        type:String,
        required:true,
    }
})
const hello = mongoose.model('url',urlschema)


export default hello





