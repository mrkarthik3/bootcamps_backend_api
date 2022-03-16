const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// load environment variables
dotenv.config({ path: "./config/config.env" });

// Load model(s)
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
});

// Read JSON files (Synchronously read the file) by providing path for that JSON file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8"));

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.insertMany(bootcamps);
    await Course.insertMany(courses);
    console.log("Data Imported...".green.inverse);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data Deleted...".red.inverse);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// argv is an array on the process object
// In commandline... whatever you type goes into process.argv array
// I can do "node seeder -i" to import data
// I can do "node seeder -d" to delete data

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
