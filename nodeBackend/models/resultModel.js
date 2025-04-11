// nodeBackend/models/resultModel.js
const mongoose = require('mongoose');

const Result=mongoose.Schema({
    videoId:{
        type:String,
        required:true
    },
    favourite:{
        type:Boolean,
        default:false,
    },
    resultStatus:{
        type:Object,
        default:{
            negative:0.0,
            positive:0.0,
            neutral:0.0
        }
    }
})

module.exports=mongoose.model('Result',Result)