
const express =require('express');
const bodyParser = require('body-parser')
//const logger = require('morgan')

const passport =require('passport')
const app=express();

const path = require('path');
const cors =require('cors')

//const router = express.Router();

const connectDB =require('./config/db');

connectDB();
const router =require('./routes/index')




///.........midellware//.......
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(router)
app.use(passport.initialize)

app.use(passport.session());
require('./config/passport')(passport);


//...........Errors........///////
 app.use((req,res,next) => {
  var err = new Error('not found');
  err.status =404;
  next(err);

});
app.use((err,req,res,next,) =>{

   const stauts = err.status ||500;
  const error = err.message || 'Error proccessin your request';
  res.status(stauts).send({
    error:error
  }) 
}) 

 

   
 var server = app.listen(8000, () =>{
    console.log("Server run on port 8000")
});