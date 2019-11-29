"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _reportModel = _interopRequireDefault(require("../models/reportModel"));

var _usersModel = _interopRequireDefault(require("../models/usersModel"));

var _reportValidation = _interopRequireDefault(require("../helpers/reportValidation"));

var ReportController =
/*#__PURE__*/
function () {
  function ReportController() {
    (0, _classCallCheck2["default"])(this, ReportController);
  }

  (0, _createClass2["default"])(ReportController, null, [{
    key: "createRedFlag",
    value: function createRedFlag(req, res) {
      var _reportValidation$val = _reportValidation["default"].validateReport(req.body),
          error = _reportValidation$val.error;

      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.message
        });
      }

      var owner = req.user.email;
      var _req$body = req.body,
          title = _req$body.title,
          type = _req$body.type,
          comment = _req$body.comment,
          locationLat = _req$body.locationLat,
          locationLong = _req$body.locationLong;

      var isReportExist = _reportModel["default"].find(function (c) {
        return c.title == title && c.type == type;
      });

      var isUserExist = _usersModel["default"].find(function (s) {
        return s.email == owner;
      });

      if (!isUserExist) {
        return res.status(401).send({
          status: 401,
          message: 'User does not exist!'
        });
      }

      if (isReportExist) {
        return res.status(409).send({
          status: 409,
          message: 'Already reported!'
        });
      }

      var newReport = {
        id: _reportModel["default"].length + 1,
        title: title,
        type: type,
        comment: comment,
        locationLat: locationLat,
        locationLong: locationLong,
        status: 'Draft',
        createdOn: new Date(),
        createdBy: owner
      };

      _reportModel["default"].push(newReport);

      var data = (0, _extends2["default"])({}, newReport);
      return res.status(200).send({
        status: 200,
        message: 'Reported successfully',
        data: data
      });
    }
  }, {
    key: "getAllRedFlagRecords",
    value: function getAllRedFlagRecords(req, res) {
      var email = req.user.email;

      var isUserExist = _usersModel["default"].find(function (u) {
        return u.email === email;
      });

      if (!isUserExist) {
        return res.status(401).send({
          status: 401,
          message: 'User not exist'
        });
      }

      return res.status(200).send({
        status: 200,
        message: 'Data fetched',
        data: _reportModel["default"]
      });
    }
  }, {
    key: "getOneRedFlagRecords",
    value: function getOneRedFlagRecords(req, res) {
      var id = req.params.id;
      var email = req.user.email;

      var isUserExist = _usersModel["default"].find(function (u) {
        return u.email === email;
      });

      var findRecord = _reportModel["default"].find(function (c) {
        return c.id == id;
      });

      if (!isUserExist) {
        return res.status(401).send({
          status: 401,
          message: 'User not exist'
        });
      }

      if (!findRecord) {
        return res.status(404).send({
          status: 404,
          message: 'Record not found'
        });
      }

      return res.status(200).send({
        status: 200,
        message: 'Data fetched',
        data: findRecord
      });
    }
  }, {
    key: "deleteRedFlagRecords",
    value: function deleteRedFlagRecords(req, res) {
      var id = req.params.id;
      var email = req.user.email;

      var findRecord = _reportModel["default"].find(function (c) {
        return c.id == id;
      });

      var isOwner = _reportModel["default"].find(function (s) {
        return s.createdBy == email;
      });

      if (!isOwner) {
        return res.status(403).send({
          status: 403,
          message: 'you are not the owner'
        });
      }

      if (!findRecord) {
        return res.status(404).send({
          status: 404,
          message: 'Record not found'
        });
      }

      _reportModel["default"].splice(_reportModel["default"].indexOf(findRecord, 1));

      return res.status(200).send({
        status: 200,
        message: 'Deleted successfully'
      });
    }
  }, {
    key: "editRedFlagLocationRecords",
    value: function editRedFlagLocationRecords(req, res) {
      var _req$body2 = req.body,
          locationLat = _req$body2.locationLat,
          locationLong = _req$body2.locationLong;
      var id = req.params.id;
      var email = req.user.email;

      var findRecord = _reportModel["default"].find(function (c) {
        return c.id == id;
      });

      var isEdited = _reportModel["default"].find(function (e) {
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

      var findRecord = _reportModel["default"].find(function (c) {
        return c.id == id;
      });

      var isEdited = _reportModel["default"].find(function (e) {
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