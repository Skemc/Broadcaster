"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportModel = exports.reports = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _connectDB = _interopRequireDefault(require("../config/connectDB"));

var reports = [{
  id: 1,
  title: "Crime",
  type: "intervention",
  comment: "Killed a child",
  locationLat: "4943",
  locationLong: "4342",
  status: "pending",
  createdOn: new Date(),
  createdBy: 'eric@gmail.com'
}, {
  id: 2,
  title: "Crime",
  type: "intervention",
  comment: "Killed a child",
  locationLat: "4943",
  locationLong: "4342",
  status: "pending",
  createdOn: new Date(),
  createdBy: 'eric6@gmail.com'
}];
exports.reports = reports;

var reportModel =
/*#__PURE__*/
function () {
  function reportModel() {
    (0, _classCallCheck2["default"])(this, reportModel);
  }

  (0, _createClass2["default"])(reportModel, null, [{
    key: "createArticle",
    value: function createArticle(req) {
      var owner, newReport, createIncident;
      return _regenerator["default"].async(function createArticle$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              owner = req.user.email;
              newReport = [req.body.title, req.body.type, req.body.comment, req.body.locationLat, req.body.locationLong, new Date(), owner];
              _context.next = 4;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][1].createIncident, newReport));

            case 4:
              createIncident = _context.sent;
              return _context.abrupt("return", createIncident);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "isUserExist",
    value: function isUserExist(req) {
      var result, exists;
      return _regenerator["default"].async(function isUserExist$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = false;
              _context2.next = 3;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][0].isUserExist, [req.user.email]));

            case 3:
              exists = _context2.sent;

              if (exists.length > 0) {
                result = true;
              }

              return _context2.abrupt("return", result);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "isReportExist",
    value: function isReportExist(req) {
      var result, exists;
      return _regenerator["default"].async(function isReportExist$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              result = false;
              console.log(req.body.type);
              _context3.next = 4;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][1].isIncidentExist, [req.body.title, req.body.type]));

            case 4:
              exists = _context3.sent;

              if (exists.length > 0) {
                result = true;
              }

              return _context3.abrupt("return", result);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "getAll",
    value: function getAll(req) {
      var getAll;
      return _regenerator["default"].async(function getAll$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][1].getAllIncident));

            case 2:
              getAll = _context4.sent;
              return _context4.abrupt("return", getAll);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "getSpecific",
    value: function getSpecific(req) {
      var getSpecific;
      return _regenerator["default"].async(function getSpecific$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][1].getIncident, [req.params.id]));

            case 2:
              getSpecific = _context5.sent;
              return _context5.abrupt("return", getSpecific);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "deleteIncident",
    value: function deleteIncident(req) {
      return _regenerator["default"].async(function deleteIncident$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][1].deleteIncident, [req.params.id]));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);
  return reportModel;
}();

exports.reportModel = reportModel;