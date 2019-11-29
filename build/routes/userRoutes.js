"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var router = _express["default"].Router();

router.post('/signup', _UserController["default"].signup);
router.post('/signin', _UserController["default"].signin);
var _default = router;
exports["default"] = _default;