import mongoose from "mongoose";

const uri = process.env.mongoprod;
export const dbConnect = () => {
  mongoose
    .connect(uri)
    .then((result) => {
      console.log("db is connected");
    })
    .catch((error) => console.error(error));
};
