const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_url);
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('MongoDB is Connected Succesfully');
});
connection.on('error', () => {
    console.log('MongoDB Connection is failure');
});

module.exports = mongoose;