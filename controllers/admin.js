const Interviews = require('../models/placement_model');
const Students = require('../models/students_model');

//CSV Packages
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const path = require('path');
const fields = ['batchName', 'studentName', 'college','courseScore','Student_Status'];

module.exports.admin = function(req,res){
    // return res.end('<h1>Hello world</h1>')
    // render view file while rendering controller
    return res.render('Admin/admin',{
        title:"Admin",
        name:"Prasanth",
        isLoggedIn:true
    })
}

module.exports.students = async function(req,res){
    // return res.end('<h1>Hello world</h1>')
    const studentList = await Students.find();
    // render view file while rendering controller
    return res.render('Admin/students',{
        title:"Admin",
        name:"Prasanth",
        isLoggedIn:true,
        studentsData:studentList
    })
}

module.exports.placementCell = async function(req,res){
    // render view file while rendering controller
    const interviewList = await Interviews.find();
    const studentList = await Students.find();
    return res.render('Admin/placementcell',{
        title:"Admin",
        name:"Prasanth",
        isLoggedIn:true,
        interviewList:interviewList,
        studentsData:studentList
    })
}

module.exports.addInterview = function(req,res){
    Interviews.create(req.body).then( function(user , err){
        if(err){console.log('error in adding interview in placement cell'); return}

        return res.redirect('/admin/placementCell');
    }).catch(e=>{
        console.log("error "+e);
    });
}


module.exports.editPlacement = async function(req, res){
    try {
        const todo = await Interviews.findById(req.params.id);
        res.render('/admin/placementCell', { todo });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/placementCell'); // Redirect to a list of todos or error page
    }
}

module.exports.updatePlacement = async function(req, res){
    try {
        // const { title, description } = req.body;
        await Interviews.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/placementCell'); // Redirect to a list of todos or success page
    } catch (err) {
        console.error(err);
        res.redirect('/admin/placementCell'); // Redirect to a list of todos or error page
    }
}

module.exports.deleteList = async function(req,res){
    const  deleteId = req.params.id;

    try {
        const deletedInterview = await Interviews.findByIdAndRemove(deleteId);

        const deletedStudent = await Students.findByIdAndRemove(deleteId);

        if (!deletedInterview && !deletedStudent) {
            return res.status(404).json({ error: 'Delete Id not found '+deleteId });
        }

        // res.json({ message: 'Product deleted successfully', deletedInterview });
        return res.redirect('/admin/placementCell');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



// Students Detail Form
module.exports.addStudent = function(req,res){
    Students.create(req.body).then( function(user , err){
        if(err){console.log('error in adding interview in placement cell'); return}

        return res.redirect('/admin/students');
    }).catch(e=>{
        console.log("error "+e);
    });
}



module.exports.downloadStudentsCSV = async function(req,res){
    let students =  await Students.find()
    // if (err) {
    //   return res.status(500).json({ err });
    // }
    // else {
        // console.log(students);
      let csv
      try {
        csv = json2csv(students, { fields });
      } catch (err) {
        return res.status(500).json({ err });
      }
      const dateTime = moment().format('YYYYMMDDhhmmss');
      const filePath = path.join(__dirname, "..", "assets", "exports", "csv-" + dateTime + ".csv")
      fs.writeFile(filePath, csv, function (err) {
        if (err) {
          return res.json(err).status(500);
        }
        else {
          setTimeout(function () {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
          }, 30000)
          console.log("Succesfully Exported CSV file.");
        //   return res.json("/exports/csv-" + dateTime + ".csv");
          return res.redirect('/admin/students');

        }
      });

    // }
}