const mongoose = require("mongoose");

const connectDB = () => {
  const connString = process.env.CONNECTION_STRING;
  mongoose
    .connect(connString)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
