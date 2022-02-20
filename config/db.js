const mongoose = require("mongoose");

// Mongoose methods return a promise. SO I could do .then().catch() syntax
// Or... I could do async await to work with mongoose methods.

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // below two give warnings... so I removed them
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.blue.bold.underline);
};

module.exports = connectDB;
