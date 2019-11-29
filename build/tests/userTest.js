"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mockdata = _interopRequireDefault(require("./mockdata/mockdata"));

_dotenv["default"].config();

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe("Signup tests", function () {
  it("User should be able to signup when data are valid ", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(_mockdata["default"].signup).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when username is empty", function (done) {
    var _mock$signup = _mockdata["default"].signup,
        userName = _mock$signup.userName,
        data = (0, _objectWithoutProperties2["default"])(_mock$signup, ["userName"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when data are invalid phoneNumber", function (done) {
    var _mock$signup2 = _mockdata["default"].signup,
        phoneNumber = _mock$signup2.phoneNumber,
        data = (0, _objectWithoutProperties2["default"])(_mock$signup2, ["phoneNumber"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when data are invalid password", function (done) {
    var _mock$signup3 = _mockdata["default"].signup,
        password = _mock$signup3.password,
        data = (0, _objectWithoutProperties2["default"])(_mock$signup3, ["password"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when invalid firstname", function (done) {
    var _mock$signup4 = _mockdata["default"].signup,
        firstName = _mock$signup4.firstName,
        data = (0, _objectWithoutProperties2["default"])(_mock$signup4, ["firstName"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when invalid lastname", function (done) {
    var _mock$signup5 = _mockdata["default"].signup,
        lastName = _mock$signup5.lastName,
        data = (0, _objectWithoutProperties2["default"])(_mock$signup5, ["lastName"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when invalid email", function (done) {
    var _mock$signup6 = _mockdata["default"].signup,
        email = _mock$signup6.email,
        data = (0, _objectWithoutProperties2["default"])(_mock$signup6, ["email"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when user already exist", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(_mockdata["default"].signup).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });
  });
});
describe('Signin tests', function () {
  it("User should be able to signin when data are valid ", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send(_mockdata["default"].signin).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signin with a wrong password ", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send(_mockdata["default"].invalidSigninEmail).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signin with an invalid email", function (done) {
    var _mock$signin = _mockdata["default"].signin,
        email = _mock$signin.email,
        data = (0, _objectWithoutProperties2["default"])(_mock$signin, ["email"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signin with an invalid password", function (done) {
    var _mock$signin2 = _mockdata["default"].signin,
        password = _mock$signin2.password,
        data = (0, _objectWithoutProperties2["default"])(_mock$signin2, ["password"]);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signin with a wrong account", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send(_mockdata["default"].invalidSigninPassword).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
});