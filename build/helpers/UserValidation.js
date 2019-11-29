"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var UserValidations =
/*#__PURE__*/
function () {
  function UserValidations() {
    (0, _classCallCheck2["default"])(this, UserValidations);
  }

  (0, _createClass2["default"])(UserValidations, null, [{
    key: "validateSignup",
    value: function validateSignup(body) {
      var schema = _joi["default"].object({
        firstName: _joi["default"].string().regex(/^[a-zA-Z]{2,}$/).min(3).required().error(new Error('First name of user is required, not numeric and not allowed to be empty')),
        lastName: _joi["default"].string().min(3).regex(/^[a-zA-Z]{2,}$/).required().error(new Error('Second name of user is required, not numeric and not allowed to be empty')),
        userName: _joi["default"].string().min(3).required().error(new Error('User name of user is required and not allowed to be empty')),
        email: _joi["default"].string().regex(/^\S+@[\w-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to be empty')),
        password: _joi["default"].string().regex(/^[A-Za-z0-9]{8,}/).required().error(new Error('Password must have an Uppercase, Lowercase and a number and not allowed to be empty')),
        phoneNumber: _joi["default"].string().min(8).required().error(new Error('Number of user is required and not allowed to be empty'))
      });

      return schema.validate(body, {
        abortEarly: false
      });
    }
  }, {
    key: "validateSignin",
    value: function validateSignin(body) {
      var schema = _joi["default"].object({
        email: _joi["default"].string().regex(/^\S+@[\w-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to be empty')),
        password: _joi["default"].string().required().error(new Error('Password is not allowed to be empty'))
      });

      return schema.validate(body);
    }
  }]);
  return UserValidations;
}();

var _default = UserValidations;
exports["default"] = _default;