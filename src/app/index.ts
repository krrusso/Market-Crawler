"use strict";

var app = require("./app");
var db = require("./db");

var port = 8080;
var server = app.listen(port, function(err) {
  if (err) throw err;
  console.log("HTTP server patiently listening on port", port);
  db.sync().then(function() {
    console.log("Oh and btw the postgres server is totally connected, too");
  });
});

module.exports = server;

var mongoose = require("mongoose");
var mongoDB = "insert_your_database_url_here";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
