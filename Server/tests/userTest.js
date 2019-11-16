import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import dotenv from "dotenv";
import mock from './mockdata/mockdata'

dotenv.config();
chai.use(chaiHttp);
chai.should();


describe("Signup tests", () => {
  
  it("User should be able to signup when data are valid ", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send(mock.signup).end((err, res) => {
      res.should.have.status(201);  
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when username is empty", (done) => {
    const { userName, ...data } = mock.signup;
    chai.request(app).post("/api/v1/auth/signup").send(data).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when data are invalid phoneNumber", (done) => {
    const { phoneNumber, ...data } = mock.signup;
    chai.request(app).post("/api/v1/auth/signup").send(data).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when data are invalid password", (done) => {
    const { password, ...data } = mock.signup;
    chai.request(app).post("/api/v1/auth/signup").send(data).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when invalid firstname", (done) => {
    const { firstName, ...data } = mock.signup;
    chai.request(app).post("/api/v1/auth/signup").send(data).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("User should not be able to signup when invalid lastname", (done) => {
    const { lastName, ...data } = mock.signup;
    chai.request(app).post("/api/v1/auth/signup").send(data).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid email", (done) => {
    const { email, ...data } = mock.signup;
    chai.request(app).post("/api/v1/auth/signup").send(data).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when user already exist", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send(mock.signup).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });
  });
});