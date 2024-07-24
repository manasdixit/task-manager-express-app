import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let connection = await mongoose.connect(
      "mongodb+srv://manasdixitstd:5ZxwSDAPJzxJ5XKX@cluster0.zid4mn4.mongodb.net/",
      {}
    );
    if (connection) {
      console.log("Connection :: ", connection);
      console.log("MongoDB connected");
    }
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
