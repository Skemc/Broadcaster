"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _queries = _interopRequireDefault(require("./queries"));

var _connectDB = _interopRequireDefault(require("./connectDB"));

_dotenv["default"].config();

var drop = function drop() {
  var connectString, pool, dropUser, dropIncident, dropTable, dropTables;
  return _regenerator["default"].async(function drop$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          connectString = process.env.DATABASE_URL;
          pool = new _pg.Pool({
            connectionString: connectString
          });
          _context2.next = 5;
          return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][2].userTable));

        case 5:
          dropUser = _context2.sent;
          _context2.next = 8;
          return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][2].incidentTable));

        case 8:
          dropIncident = _context2.sent;
          dropTable = (dropUser, dropIncident);

          dropTables = function dropTables() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, table;

            return _regenerator["default"].async(function dropTables$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 3;
                    _iterator = dropTable[Symbol.iterator]();

                  case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context.next = 12;
                      break;
                    }

                    table = _step.value;
                    _context.next = 9;
                    return _regenerator["default"].awrap(pool.query(table));

                  case 9:
                    _iteratorNormalCompletion = true;
                    _context.next = 5;
                    break;

                  case 12:
                    _context.next = 18;
                    break;

                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](3);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 18:
                    _context.prev = 18;
                    _context.prev = 19;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 21:
                    _context.prev = 21;

                    if (!_didIteratorError) {
                      _context.next = 24;
                      break;
                    }

                    throw _iteratorError;

                  case 24:
                    return _context.finish(21);

                  case 25:
                    return _context.finish(18);

                  case 26:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[3, 14, 18, 26], [19,, 21, 25]]);
          };

          dropTables();
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.messsage);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

drop();