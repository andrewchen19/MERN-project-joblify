const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const { authenticateUser } = require("./middleware/auth");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
require("dotenv").config();

// build-in module
const path = require("path");

// extra packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// middlewares
// set up express static (as first middleware) to serve static assets from client build
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// other middlewares
// helps in generating request logs
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authenticateUser, userRoutes);
app.use("/api/v1/jobs", authenticateUser, jobRoutes);

// serve index.html for all routes (apart from API)
// front-end routes pick it up form here
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// custom global middleware (after all routes)
app.use(notFound);

// server will start only if we have successfully connected to DB
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_STRING);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
