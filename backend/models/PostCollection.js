const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    file:[],
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    }
},{timestamps:true})

module.exports = mongoose.model('posts',postSchema)