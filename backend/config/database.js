const mongoose = require("mongoose")
require("dotenv").config();

const dbConnection = async () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database connected successfully!")
    }).catch(error => {
        console.log("Database error")
        console.log(error.message)
        process.exit(1)
    })
};

module.exports = dbConnection;