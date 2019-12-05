"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _reportModel = require("../models/reportModel");

var _usersModel = require("../models/usersModel");

var _reportValidation = _interopRequireDefault(require("../helpers/reportValidation"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _connectDB = _interopRequireDefault(require("../config/connectDB"));

var ReportController =
/*#__PURE__*/
function () {
  function ReportController() {
    (0, _classCallCheck2["default"])(this, ReportController);
  }

  (0, _createClass2["default"])(ReportController, null, [{
    key: "createRedFlag",
    value: function createRedFlag(req, res) {
      var _reportValidation$val, error, isUserExist, isReportExist, createIncident;

      return _regenerator["default"].async(function createRedFlag$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _reportValidation$val = _reportValidation["default"].validateReport(req.body), error = _reportValidation$val.error;
              _context.prev = 1;

              if (!error) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: error.message
              }));

            case 4:
              _context.next = 6;
              return _regenerator["default"].awrap(_reportModel.reportModel.isUserExist(req));

            case 6:
              isUserExist = _context.sent;
              _context.next = 9;
              return _regenerator["default"].awrap(_reportModel.reportModel.isReportExist(req));

            case 9:
              isReportExist = _context.sent;

              if (!(isUserExist !== true)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(401).send({
                status: 401,
                message: 'user not exist!'
              }));

            case 12:
              if (!(isReportExist === true)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(409).send({
                status: 409,
                message: 'Already reported!'
              }));

            case 14:
              _context.next = 16;
              return _regenerator["default"].awrap(_reportModel.reportModel.createArticle(req));

            case 16:
              createIncident = _context.sent;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: "Report created successfully",
                data: createIncident[0]
              }));

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0.message
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 20]]);
    }
  }, {
    key: "getAllRedFlagRecords",
    value: function getAllRedFlagRecords(req, res) {
      var isUserExist, getAll;
      return _regenerator["default"].async(function getAllRedFlagRecords$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _regenerator["default"].awrap(_reportModel.reportModel.isUserExist(req));

            case 3:
              isUserExist = _context2.sent;

              if (!(isUserExist !== true)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                message: 'User not exist'
              }));

            case 6:
              _context2.next = 8;
              return _regenerator["default"].awrap(_reportModel.reportModel.getAll(req));

            case 8:
              getAll = _context2.sent;
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Data fetched',
                data: getAll
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                error: _context2.t0.message
              }));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }
  }, {
    key: "getOneRedFlagRecords",
    value: function getOneRedFlagRecords(req, res) {
      var isUserExist, getSpecific;
      return _regenerator["default"].async(function getOneRedFlagRecords$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _regenerator["default"].awrap(_reportModel.reportModel.isUserExist(req));

            case 3:
              isUserExist = _context3.sent;
              _context3.next = 6;
              return _regenerator["default"].awrap(_reportModel.reportModel.getSpecific(req));

            case 6:
              getSpecific = _context3.sent;

              if (!(isUserExist !== true)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(401).send({
                status: 401,
                message: 'User not exist'
              }));

            case 9:
              if (getSpecific[0]) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Record not found'
              }));

            case 11:
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Data fetched',
                data: getSpecific
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                error: _context3.t0.message
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 14]]);
    }
  }, {
    key: "deleteRedFlagRecords",
    value: function deleteRedFlagRecords(req, res) {
      var isUserExist, getSpecific;
      return _regenerator["default"].async(function deleteRedFlagRecords$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _regenerator["default"].awrap(_reportModel.reportModel.isUserExist(req));

            case 3:
              isUserExist = _context4.sent;
              _context4.next = 6;
              return _regenerator["default"].awrap(_reportModel.reportModel.getSpecific(req));

            case 6:
              getSpecific = _context4.sent;

              if (!(isUserExist !== true)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(403).send({
                status: 403,
                message: 'you are not the owner'
              }));

            case 9:
              if (getSpecific[0]) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Record not found'
              }));

            case 11:
              _context4.next = 13;
              return _regenerator["default"].awrap(_reportModel.reportModel.deleteIncident(req));

            case 13:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                message: "Deleted successfully"
              }));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t0.message
              }));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "editRedFlagLocationRecords",
    value: function editRedFlagLocationRecords(req, res) {
      var _req$body = req.body,
          locationLat = _req$body.locationLat,
          locationLong = _req$body.locationLong;
      var id = req.params.id;
      var email = req.user.email;

      var findRecord = _reportModel.reports.find(function (c) {
        return c.id == id;
      });

      var isEdited = _reportModel.reports.find(function (e) {
        return e.locationLat == locationLat && e.locationLong == locationLong && e.createdBy == email;
      });

      if (!findRecord) {
        return res.status(404).send({
          status: 404,
          message: 'record not found'
        });
      }

      if (isEdited) {
        return res.status(409).send({
          status: 409,
          message: 'record already edited'
        });
      }

      if (findRecord.createdBy !== email) {
        return res.status(403).send({
          status: 403,
          message: 'You are not the owner'
        });
      }

      var holder = new Array(findRecord);
      var data = holder.map(function (e) {
        e.locationLat = locationLat;
        e.locationLong = locationLong;
        return e;
      });
      return res.status(200).send({
        status: 200,
        message: 'Eddited successfully',
        data: data
      });
    }
  }, {
    key: "editRedFlagCommentRecords",
    value: function editRedFlagCommentRecords(req, res) {
      var comment = req.body.comment;
      var id = req.params.id;
      var email = req.user.email;

      var findRecord = _reportModel.reports.find(function (c) {
        return c.id == id;
      });

      var isEdited = _reportModel.reports.find(function (e) {
        return e.comment == comment;
      });

      if (!findRecord) {
        return res.status(404).send({
          status: 404,
          message: 'record not found'
        });
      }

      if (isEdited) {
        return res.status(409).send({
          status: 409,
          message: 'record already edited'
        });
      }

      if (findRecord.createdBy !== email) {
        return res.status(403).send({
          status: 403,
          message: 'You are not the owner'
        });
      }

      var holder = new Array(findRecord);
      var data = holder.map(function (e) {
        e.comment = comment;
        return e;
      });
      return res.status(200).send({
        status: 200,
        message: 'Eddited successfully',
        data: data
      });
    }
  }]);
  return ReportController;
}();

var _default = ReportController;
exports["default"] = _default;