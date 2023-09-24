var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./models');
const methodOverrire = require("method-override");

var app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverrire("_method"));

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', require('./routes/index'));
app.use('/customer', require('./routes/customer'));
app.use('/order', require('./routes/order'));
app.use('/product', require('./routes/product'));

// Automatically create database tables for our Sequelize models then start the
// HTTP server.
models.sequelize.sync().then(function() {
  app.listen(process.env.PORT || 6543, function () {
      console.log("Listening on port " + this.address().port)
  });
});

module.exports = app;
