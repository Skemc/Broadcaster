"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _mockdata = _interopRequireDefault(require("./mockdata/mockdata"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('reports tests', function () {
  it("User should be able to create red-flag when data are valid ", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].report).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag when token is invalid ", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].wrongToken.token).send(_mockdata["default"].report).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag when user not exist", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].invalidToken.token).send(_mockdata["default"].report).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag when already created", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].report).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag with no token ", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', '').send(_mockdata["default"].report).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag with no title ", function (done) {
    var _mock$report = _mockdata["default"].report,
        title = _mock$report.title,
        data = (0, _objectWithoutProperties2["default"])(_mock$report, ["title"]);

    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag with no type ", function (done) {
    var _mock$report2 = _mockdata["default"].report,
        type = _mock$report2.type,
        data = (0, _objectWithoutProperties2["default"])(_mock$report2, ["type"]);

    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag with no location latitude ", function (done) {
    var _mock$report3 = _mockdata["default"].report,
        locationLat = _mock$report3.locationLat,
        data = (0, _objectWithoutProperties2["default"])(_mock$report3, ["locationLat"]);

    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to create red-flag with no location longitude ", function (done) {
    var _mock$report4 = _mockdata["default"].report,
        locationLong = _mock$report4.locationLong,
        data = (0, _objectWithoutProperties2["default"])(_mock$report4, ["locationLong"]);

    _chai["default"].request(_app["default"]).post("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should be able to view all red-flags created", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags").set('auth', _mockdata["default"].rightToken.token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to view all red-flag created when user not registered", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags").set('auth', _mockdata["default"].invalidToken.token).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to view single red-flag created when user not registered", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags/".concat(1)).set('auth', _mockdata["default"].invalidToken.token).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should be able to view a single red-flag record", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags/".concat(1)).set('auth', _mockdata["default"].rightToken.token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to view a red-flag when not found", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags/".concat(100)).set('auth', _mockdata["default"].rightToken.token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to delete red-flag when not found", function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/red-flags/".concat(100)).set('auth', _mockdata["default"].rightToken.token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should be able to delete red-flag", function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/red-flags/".concat(1)).set('auth', _mockdata["default"].rightToken.token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to delete red-flag when not owner", function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/red-flags/".concat(1)).set('auth', _mockdata["default"].invalidToken.token).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should be able to edit red-flag location", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/location/".concat(2)).set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].editLocation).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to edit red-flag location when is not owner", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/location/".concat(1)).set('auth', _mockdata["default"].invalidToken.token).send(_mockdata["default"].editLocation).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to edit red-flag location when already edited", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/location/".concat(2)).set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].editLocation).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to edit red-flag location when not found", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/location/".concat(100)).set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].editLocation).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to edit red-flag comment when is not owner", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/comment/".concat(1)).set('auth', _mockdata["default"].invalidToken.token).send(_mockdata["default"].editComment).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should be able to edit red-flag comment", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/comment/".concat(2)).set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].editComment).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to edit red-flag comment when already edited", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/comment/".concat(1)).set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].editComment).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to edit red-flag comment when not found", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/comment/".concat(100)).set('auth', _mockdata["default"].rightToken.token).send(_mockdata["default"].editComment).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  });
});