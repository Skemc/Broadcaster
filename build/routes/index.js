"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoutes = _interopRequireDefault(require("./userRoutes"));

var _reportRoutes = _interopRequireDefault(require("./reportRoutes"));

var path = _express["default"].Router();

path.use('/auth', _userRoutes["default"]);
path.use('/', _reportRoutes["default"]);
var _default = path;
exports["default"] = _default;