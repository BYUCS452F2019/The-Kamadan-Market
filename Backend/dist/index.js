"use strict";

var _express = _interopRequireDefault(require("express"));

var _knex = _interopRequireDefault(require("knex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var knex = (0, _knex["default"])({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'kamadan-market'
  }
});
knex.raw('SELECT VERSION()').then(function (version) {
  return console.log(version[0][0]);
})["catch"](function (err) {
  return console.log(err);
});
var app = (0, _express["default"])();
app.get('/', function (req, res) {
  return res.send('Received a GET HTTP method');
});
app.post('/', function (req, res) {
  return res.send('Received a POST HTTP method');
});
app.put('/', function (req, res) {
  return res.send('Received a PUT HTTP method');
});
app["delete"]('/', function (req, res) {
  return res.send('Received a DELETE HTTP method');
});
app.listen(8080, function () {
  return console.log("Example app listening on port 8080!");
});