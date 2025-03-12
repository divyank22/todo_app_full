import mongoose from 'mongoose';

const connected=()=> mongoose.connect("mongodb://127.0.0.1:27017/test1")
  .then(() => console.log("mongodb connected"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

export default connected;

