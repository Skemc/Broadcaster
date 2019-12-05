"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = exports.users = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _connectDB = _interopRequireDefault(require("../config/connectDB"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var users = [{
  id: 1,
  firstName: "eric",
  lastName: "skemc",
  userName: "skemc-eric",
  email: "eric@gmail.com",
  password: "$2b$10$hjXgNwYIzx8Hxeg.silh3usMzPF.TGMV3lMY55LACDhv19TnrtrMW",
  phoneNumber: "0785824928",
  isAdmin: false
}, {
  id: 3,
  firstName: "eric",
  lastName: "skemc",
  userName: "skemc-eric",
  email: "eric6@gmail.com",
  password: "$2y$10$bfCLjcykPtlYcQThRvkkj.vWw.L0fhlEBhqNRuJ5rPalr3FKuqemy",
  phoneNumber: "0785824928",
  isAdmin: true
}];
exports.users = users;

var userModel =
/*#__PURE__*/
function () {
  function userModel() {
    (0, _classCallCheck2["default"])(this, userModel);
  }

  (0, _createClass2["default"])(userModel, null, [{
    key: "signUp",
    value: function signUp(req) {
      var _req$body, firstName, lastName, userName, email, phoneNumber, password, newUser, createdUser;

      return _regenerator["default"].async(function signUp$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, userName = _req$body.userName, email = _req$body.email, phoneNumber = _req$body.phoneNumber;
              password = _bcrypt["default"].hashSync(req.body.password, 10);
              newUser = [firstName, lastName, userName, email, password, phoneNumber];
              _context.next = 5;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][0].createUser, newUser));

            case 5:
              createdUser = _context.sent;
              return _context.abrupt("return", createdUser);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "isUserExist",
    value: function isUserExist(body) {
      var result, exists;
      return _regenerator["default"].async(function isUserExist$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = false;
              _context2.next = 3;
              return _regenerator["default"].awrap((0, _connectDB["default"])(_queries["default"][0].isUserExist, [body.email]));

            case 3:
              exists = _context2.sent;

              if (exists.length === 1) {
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
  }]);
  return userModel;
}();

exports.userModel = userModel;