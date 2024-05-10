const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/myquiz"
// Create a connection to the database using Mongoose

const connectToMongo = () =>{
    mongoose.connect(mongoURI)
}
module.exports= connectToMongo;