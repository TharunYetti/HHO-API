import mongoose from "mongoose";

const connectDB = () => {
  const connString = process.env.CONNECTION_STRING;
  mongoose
    .connect(connString as string)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectDB;
