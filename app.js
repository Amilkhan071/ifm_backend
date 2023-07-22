var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { expressjwt: jwt } = require("express-jwt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var stuRouter = require("./routes/stu_detail");
var courseRouter = require("./routes/course");
var timingtableRouter = require("./routes/timingtable");
var batchRouter = require("./routes/batch");
var studentfeesRouter = require("./routes/studentfees");
// var joiningRouter = require('./routes/joining')
var transactionRouter = require("./routes/transaction");
var adminloginRouter = require("./routes/adminlogin");
var organizationRouter = require("./routes/organization");
var cors = require("cors");
var app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(
  jwt({
    secret: "not-so-secret",
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/organization/displayAll",
      "/organization/checkLogin",
      "/organization/addNewRecord",
      "/organization/updateRecord",
      "/organization/deleteCourse",
      "/organization/updateLogo",
      "/organization/updatePicture",
      "/organization/displayById",
      "/organization/deleteRecord",
      "/adminlogin/adminCheck",

    ],
  })
);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/organization", organizationRouter);
app.use("/studetail", stuRouter);
app.use("/course", courseRouter);
app.use("/timingtable", timingtableRouter);
app.use("/batch", batchRouter);
app.use("/studentfees", studentfeesRouter);
// app.use('/joining',joiningRouter)
app.use("/transaction", transactionRouter);
app.use("/adminlogin", adminloginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
