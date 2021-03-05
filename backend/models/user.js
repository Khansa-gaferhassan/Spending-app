const mongoose =require('mongoose');
const {Schema} =require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema=mongoose.Schema({



    name:{type:String,required:true},

    password:{type:String,required:true},

    email:{type:String,required:true,unique:true, },

    joined:{type:Date, default:new Date()},
});
UserSchema.pre('save', async function (next){


    if(!this.isModified('password')){
        return next();
    } try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password,salt);
        this.password =hash;
        next();

    }catch(err){
        return next(err)
    }
});
///.........login/////
UserSchema.methods.isPasswordMatch=function(password,hashed,callback){
    bcrypt.compare(password,hashed,(err,success)=>{

        if(err){
            return callback(err)
        }
        callback(success);
    });
}

const User= mongoose.model('User', UserSchema);
module.exports = User;
