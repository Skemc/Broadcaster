"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/api/v1', _index["default"]);
app.get('/'), function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Broadcaster'
  });
};
app.use('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'the route is not found'
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("connected on ".concat(port));
});
var _default = app;
exports["default"] = _default;