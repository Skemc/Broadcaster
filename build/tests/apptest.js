"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('App Tests', function () {
  it('App should not be accessed when rout not found', function (done) {
    _chai["default"].request(_app["default"]).get('/asjkva').send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  }); // it('Welcome message', (done) =>{
  //     chai.request(app).get('/')
  //     .send().end((err, res) => {
  //         console.log(res);
  //         res.should.have.status(200);
  //         res.body.should.be.an("object");
  //         done();
  //     });
  // });
});