var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Promise = require("bluebird");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");

var app = express();

var mongoose = require("mongoose");
var dev_db_url = "mongodb://mongo:27017";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
