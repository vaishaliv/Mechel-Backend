require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const customerRouter = require("./Routes/customerRoute");

const corsOptions = {
  origin: ["http://localhost:5173", "https://www.googleapis.com"],
  // origin: "*",
  optionSuccessStatus: 200,
};

app.use(cookieParser());

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/customer", customerRouter);

mongoose.Promise = global.Promise;
// const DATABASE_URL ="mongodb://localhost:27017"
const DATABASE_URL =
  "mongodb+srv://vaishaliviragi:IshaSonu1@cluster0.vf1wwpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB: %s \n ", DATABASE_URL);
  })
  .catch((err) => {
    console.error("MongoDB connection error: %s \n", err);
  });

console.log("env....", process.env.NODE_ENV);
console.log("env1....", DATABASE_URL);

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
