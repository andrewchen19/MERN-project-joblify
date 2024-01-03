// add exist data from [Mockaroo](https://www.mockaroo.com/)
// we have to connect DB one more time (指令 -> node .\populate.js)

const Job = require("./models/Job");
const jobsData = require("./mockData/jobs.json");

const connectDB = require("./db/connect");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_STRING);

    // await Job.deleteMany({});

    // 加入 exist data (jobsData  -> array of objects)
    await Job.create(jobsData);
    console.log("Success!!!");
    // terminate the process // 0 -> success code
    process.exit(0);
  } catch (err) {
    console.log(err);
    // terminate the process // 1 -> failure code
    process.exit(1);
  }
};

start();
