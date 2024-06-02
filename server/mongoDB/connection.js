const mongoose = require("mongoose");
const url = "mongodb+srv://admin:admin07@cluster0.z8yqqzj.mongodb.net/blog";
const mongoConnection = () => {
  try {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while connecting mongoDB");
  }
};
module.exports = mongoConnection;
