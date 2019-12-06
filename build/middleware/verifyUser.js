"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var verifyUser = function verifyUser(req, res, next) {
  try {
    if (!req.headers.auth) {
      res.status(401).send({
        status: 401,
        error: 'Authentication required'
      });
    }

    _jsonwebtoken["default"].verify(req.headers.auth, process.env.secretKey, function (err, result) {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Invalid authentication'
        });
      } else {
        req.user = result;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message
    });
  }
};

var _default = verifyUser;
exports["default"] = _default;