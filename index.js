const express = require("express");
//const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// set up express app
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
//connect to mongodb
//mongoose.connect('mongodb://localhost/mimjago');
//mongoose.Promise = global.Promise;
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .catch((error) => console.log(error));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.use(bodyParser.json());

// intialize routes
//app.use("./api",routes);
app.use("/api", require("./routes/api")); //another way defining routes

//error handling middleware
app.use((err, req, res, next) => {
  //console.log(err)
  res.status(422).send({ error: err.message });
});

//listen for request
app.listen(process.env.port || 4000, () => {
  console.log("now listening for request");
});
