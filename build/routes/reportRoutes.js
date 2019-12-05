"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyUser = _interopRequireDefault(require("../middleware/verifyUser"));

var _ReportController = _interopRequireDefault(require("../controllers/ReportController"));

var _reportModel = require("../models/reportModel");

var router = _express["default"].Router();

router.post('/red-flags', _verifyUser["default"], _ReportController["default"].createRedFlag);
router.get('/red-flags', _verifyUser["default"], _ReportController["default"].getAllRedFlagRecords);
router.get('/red-flags/:id', _verifyUser["default"], _ReportController["default"].getOneRedFlagRecords);
router["delete"]('/red-flags/:id', _verifyUser["default"], _ReportController["default"].deleteRedFlagRecords);
router.patch('/red-flags/location/:id', _verifyUser["default"], _ReportController["default"].editRedFlagLocationRecords);
router.patch('/red-flags/comment/:id', _verifyUser["default"], _ReportController["default"].editRedFlagCommentRecords);
var _default = router;
exports["default"] = _default;