const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    student:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    applicationenddate:{
        type:Date,
        required:true,
    },
    expireAt: {
        type: Date,
        default: Date.now() + 1*24*60*60*1000,
        expires: Date.now() + 1*24*60*60*1000,
    }
},{
    timestamps:true
});


const Interviews = mongoose.model('Interviews',userSchema);

module.exports = Interviews;
