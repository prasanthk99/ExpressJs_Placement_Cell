const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    batchName:{
        type:String,
        required:true,
    },
    studentName:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    courseScore:{
        type:Number,
        required:true,
    },
    Student_Status:{
        type:String,
        required:true,
    },
},{
    timestamps:true
});


const Students = mongoose.model('studentDetails',studentSchema);

module.exports = Students;
