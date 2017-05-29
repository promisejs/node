const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/db';

module.exports = function() {

    //Set up default mongoose connection

    mongoose.connect(mongoDB);

    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    db.once('open', function() {
        console.log("Success MongoDB")
    });

    return db;
}()