var mongoose = require("mongoose");

beforeAll(function (done) {
  // mongoose.connect("mongodb://0.0.0.0/into_the_buffyverse_test", {
  mongoose.connect("mongodb+srv://boristsang:boristsang@cluster0.fyynu9m.mongodb.net/into_the_buffyverse_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {
    done();
  });
});

afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});
