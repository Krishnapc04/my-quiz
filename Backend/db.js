const mongoose = require("mongoose")
const { MongoClient } = require("mongodb");

const mongoURI = "mongodb+srv://krishnachaudhari2309:Krishna%401114@quiz.6oomtii.mongodb.net/"
const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    
}
module.exports= connectToMongo;