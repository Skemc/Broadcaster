"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _UserValidation = _interopRequireDefault(require("../helpers/UserValidation"));

var _usersModel = _interopRequireDefault(require("../models/usersModel"));

_dotenv["default"].config();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "signup",
    value: function signup(req, res) {
      var _userValidations$vali = _UserValidation["default"].validateSignup(req.body),
          error = _userValidations$vali.error;

      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.message
        });
      }

      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          userName = _req$body.userName,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber;

      var isUserExist = _usersModel["default"].find(function (user) {
        return user.email === email;
      });

      if (isUserExist) {
        return res.status(409).send({
          status: 409,
          error: "This user already exists"
        });
      }

      var hashPassword = _bcrypt["default"].hashSync(req.body.password, 10);

      var newUser = {
        id: _usersModel["default"].length + 1,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashPassword,
        phoneNumber: phoneNumber
      };

      _usersModel["default"].push(newUser);

      var token = _jsonwebtoken["default"].sign({
        id: newUser.id,
        email: newUser.email
      }, process.env.secretKey);

      var password = newUser.password,
          data = (0, _objectWithoutProperties2["default"])(newUser, ["password"]);
      data.token = token;
      return res.status(201).send({
        status: 201,
        message: "User created successfully ",
        data: data
      });
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var _userValidations$vali2 = _UserValidation["default"].validateSignin(req.body),
          error = _userValidations$vali2.error;

      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.message
        });
      }

      var isUserExist = _usersModel["default"].find(function (user) {
        return user.email === req.body.email;
      });

      if (!isUserExist) {
        return res.status(401).send({
          status: 401,
          message: "user dont exist"
        });
      }

      var isPassword = _bcrypt["default"].compareSync(req.body.password, isUserExist.password);

      if (!isPassword) {
        return res.status(401).send({
          status: 401,
          message: "Incorrect password"
        });
      }

      var token = _jsonwebtoken["default"].sign({
        id: isUserExist.id,
        email: isUserExist.email,
        isadmin: isUserExist.isAdmin
      }, process.env.secretKey);

      return res.status(200).send({
        status: 200,
        message: 'User logged in successfully',
        token: token
      });
    }
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;