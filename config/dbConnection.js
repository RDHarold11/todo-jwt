const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected to: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
