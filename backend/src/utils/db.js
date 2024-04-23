const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection URL
    const mongoURI = "mongodb://localhost:27017/patana";

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
