"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var connectString = process.env.DATABASE_URL;
var pool = new _pg.Pool({
  connectionString: connectString
});

var createTable = function createTable() {
  var usersTables, incidentsTable;
  return _regenerator["default"].async(function createTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          usersTables = "CREATE TABLE IF NOT EXISTS users(\n        id SERIAL NOT NULL PRIMARY KEY,\n        firstname TEXT NOT NULL,\n        lastname TEXT NOT NULL,\n        username TEXT NOT NULL,\n        email TEXT NOT NULL UNIQUE,\n        password TEXT NOT NULL,\n        phonenumber TEXT NOT NULL\n  \n    )";
          incidentsTable = "CREATE TABLE IF NOT EXISTS incidents (\n        id SERIAL NOT NULL PRIMARY KEY,\n        title TEXT NOT NULL,\n        type TEXT NOT NULL,\n        comment TEXT NOT NULL,\n        locationLat TEXT NOT NULL,\n        locationLong TEXT NOT NULL,\n        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n        createdBy TEXT NOT NULL\n    )";
          _context.next = 4;
          return _regenerator["default"].awrap(pool.query(usersTables));

        case 4:
          _context.next = 6;
          return _regenerator["default"].awrap(pool.query(incidentsTable));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

createTable();