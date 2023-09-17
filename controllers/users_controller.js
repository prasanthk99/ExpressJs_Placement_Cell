const Users = require('../models/user_model');
const bcrypt = require('bcrypt');

// const users = [];
// const initializePassport = require('../config/passport-local-config');
// initializePassport(users);

module.exports.signup = function(req,res){
    // render view file while rendering controller
    return res.render('signup',{
        title:"Register",
        name:"Prasanth",
        isLoggedIn:false
    })
};

module.exports.register = function(req,res){
    // try{
    //     // const hashPassword  = await bcrypt.hash(req.body.password,10)
    //     // users.push({
    //     //     id:Date.now().toString(),
    //     //     name:req.body.name,
    //     //     email:req.body.email,
    //     //     password:hashPassword
    //     // })
    //     // console.log(users);
    //     // Users.findOne({email:req.body.email},function(err,user){

    //         return res.redirect('/users/login')
    //     // })
    // }catch{
    //     console.log(req);
    //     return res.redirect('/signup')
    // }


    // if (req.body.password != req.body.confirm_password){
    //     return res.redirect('back');
    // }

    Users.findOne({email: req.body.email}).then( function(user, err){
        if(err){console.log('error in finding user in signing up '+req.body.email); return}

        console.log("User "+user);
        if (!user){
            Users.create(req.body).then( function(user , err){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/login');
            }).catch(e=>{
                console.log("error "+e);
            });
        }else{
            return res.redirect('/users/login');
        }

    }).catch(e=>{
        console.log("error "+e);
    });
}

module.exports.login = function(req,res){
    // render view file while rendering controller
    return res.render('login',{
        title:"Login",
        name:"Prasanth",
        isLoggedIn:false
    })
}

// sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     return res.redirect('/');
// }

