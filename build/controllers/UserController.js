"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _UserValidation = _interopRequireDefault(require("../helpers/UserValidation"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _connectDB = _interopRequireDefault(require("../config/connectDB"));

var _usersModel = require("../models/usersModel");

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
      var _userValidations$vali, error, isUserExist, created, token;

      return _regenerator["default"].async(function signup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _userValidations$vali = _UserValidation["default"].validateSignup(req.body), error = _userValidations$vali.error;

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
              return _regenerator["default"].awrap(_usersModel.userModel.isUserExist(req.body));

            case 6:
              isUserExist = _context.sent;

              if (!isUserExist) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(409).send({
                status: 409,
                message: "this email is already in use"
              }));

            case 9:
              _context.next = 11;
              return _regenerator["default"].awrap(_usersModel.userModel.signUp(req));

            case 11:
              created = _context.sent;
              token = _jsonwebtoken["default"].sign({
                id: created[0].id,
                email: created[0].email,
                isadmin: created[0].isAdmin
              }, process.env.secretKey);
              res.status(201).send({
                status: 201,
                message: "User created successfully",
                data: {
                  token: token
                }
              });
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0.message
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var _userValidations$vali2, error, _req$body, email, password, isUserExist, isPassword, token;

      return _regenerator["default"].async(function signin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _userValidations$vali2 = _UserValidation["default"].validateSignin(req.body), error = _userValidations$vali2.error;

              if (!error) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                error: error.message
              }));

            case 4:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context2.next = 7;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][0].isUserExist, [email]));

            case 7:
              isUserExist = _context2.sent;

              if (!(isUserExist.length === 0)) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                message: "User is not signed up yet"
              }));

            case 12:
              isPassword = _bcrypt["default"].compareSync(password, isUserExist[0].password);

              if (!isPassword) {
                _context2.next = 18;
                break;
              }

              token = _jsonwebtoken["default"].sign({
                id: isUserExist[0].id,
                email: isUserExist[0].email,
                isadmin: isUserExist[0].isAdmin
              }, process.env.secretKey);
              res.status(200).send({
                status: 200,
                message: "User is successfully logged in",
                data: {
                  token: token
                }
              });
              _context2.next = 19;
              break;

            case 18:
              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                message: "Incorrect password"
              }));

            case 19:
              _context2.next = 24;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                error: _context2.t0.details[0].message
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 21]]);
    }
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;