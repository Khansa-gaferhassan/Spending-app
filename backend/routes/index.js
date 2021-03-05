const express =require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();


const userController = require('../controllers/UserController');

const passport = require('passport');
const ExpenseController = require('../controllers/expenseController');






router.post('/hi',(req,res) =>{
    const name = req.body.name;
  
    res.send({
  msg :`hello ${name}`
     
    })
  })
  
  router.get('/',(req,res) => {
    res.send('heloooo')
  }) ;
   

router.post('/register',userController.register);
router.get('/login', UserController.login)
router.post('/login', UserController.login),
                                             

router.all('*', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error('You are not authorized to access this area');
      error.status = 401;
      throw error;
    }

    //
    req.user = user;
    return next();
  })(req, res, next);
}); 
//////...protected routes///////


router.get('/expense' ,(req,res,next) =>{
  return res.send({ msg: 'you are authenticated',
user: req.user})
  
    });    
    router.post('/expense',ExpenseController.create),
    router.get('/expense', ExpenseController.get) ,
    router.delete('/expense/:expense_id', ExpenseController.destroy)   
    router.put('/expense', ExpenseController.update)

module.exports= router;