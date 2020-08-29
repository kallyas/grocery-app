const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user.route");
require("dotenv").config();
const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");

let mongoDB =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:RYGvAr1ine0kZmVf@api.4wjwu.mongodb.net/groceryapi?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    name: "Grocery App API",
    version: "1.0.0",
  });
});

app.use("/api/users", user);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
