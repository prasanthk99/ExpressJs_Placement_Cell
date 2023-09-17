// getting-started.js
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017');

// acquiring the connection
const db = mongoose.connection;

// error in connecting
db.on('error',console.error.bind(console,'error in connecting to db'));

// connecting successfully
db.once('open',function(){
    console.log("Successfully connected to the database");
})

// main().catch(err => console.log(err));

// async function main() {

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }