module.exports.index = function(req,res){
    // return res.end('<h1>Hello world</h1>')
    // render view file while rendering controller
    return res.render('home',{
        title:"Music-Player",
        name:"Prasanth",
        isLoggedIn:false
    })
}