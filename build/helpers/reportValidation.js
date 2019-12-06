"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var reportValidation =
/*#__PURE__*/
function () {
  function reportValidation() {
    (0, _classCallCheck2["default"])(this, reportValidation);
  }

  (0, _createClass2["default"])(reportValidation, null, [{
    key: "validateReport",
    value: function validateReport(body) {
      var schema = _joi["default"].object({
        title: _joi["default"].string().required().error(new Error('Title of report is required and not allowed to empty')),
        type: _joi["default"].string().valid('red-flag', 'intervention').required().error(new Error('Type of report must be a Red-flag or Intervention and not allowed to empty')),
        comment: _joi["default"].string(),
        locationLat: _joi["default"].string().required().error(new Error(' Location latitude of report is required and not allowed to empty')),
        locationLong: _joi["default"].string().required().error(new Error('Location longitude of report is required and not allowed to empty'))
      });

      return schema.validate(body, {
        abortEarly: false
      });
    }
  }]);
  return reportValidation;
}();

var _default = reportValidation;
exports["default"] = _default;