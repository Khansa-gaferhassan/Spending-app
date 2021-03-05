const jwtStrategy =require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User =require('../models/user');
const dbconfig = require('./dbconfig');  

module.exports = (passport) => {


let opts={};

opts.secretOrKey= dbconfig. JWT_SECRET

opts.jwtFromRequest =ExtractJwt.fromAuthHeaderAsBearerToken(),
passport.use(new jwtStrategy(opts, async(jwtPayload,done)  =>{
    try{

        const user = await User.findById(jwtPayload._id);
        
        if (user) {
            return done(null, user);
        }else {
            return done(null, false);
        }
    }catch(e){
        return done(err, false);
    
    }
}))

     
}
























