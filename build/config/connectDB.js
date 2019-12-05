"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', function () {//notin'
});

var executeQuery = function executeQuery(text) {
  var parameters,
      result,
      _args = arguments;
  return _regenerator["default"].async(function executeQuery$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          parameters = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
          _context.next = 3;
          return _regenerator["default"].awrap(pool.query(text, parameters));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result.rows || result);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = executeQuery;
exports["default"] = _default;