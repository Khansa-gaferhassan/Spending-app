const mongoose = require('mongoose');
const dbconfig = require('./dbconfig');


const connectDB = async () => {

    try {

        const conn = await mongoose.connect(dbconfig.database, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
        })

        console.log('mongoDB connected')
    } catch (err) {


        console.log(err)
        process.exit
    }


}

module.exports = connectDB