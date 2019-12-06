import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mock from './mockdata/mockdata';

chai.use(chaiHttp);
chai.should();

describe('reports tests', () => {



    it("User should not be able to create red-flag when token is invalid ", (done) => {
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.wrongToken.token)
            .send(mock.report).end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.an("object");

                done();
            });
    });


    it("User should be able to create red-flag when data are valid ", (done) => {
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.rightToken.token)
            .send(mock.report).end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an("object");
                done();
            });
    });
    it("User should not be able to create red-flag when already created", (done) => {
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.rightToken.token)
            .send(mock.report).end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to create red-flag with no token ", (done) => {
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', '')
            .send(mock.report).end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.an("object");
                done();
            });
    });
    it("User should not be able to create red-flag when user not exist", (done) => {
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.invalidToken.token)
            .send(mock.report).end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.an("object");
                done();
            });
    });
    it("User should not be able to create red-flag with no title ", (done) => {
        const { title, ...data } = mock.report;
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.rightToken.token)
            .send(data).end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to create red-flag with no type ", (done) => {
        const { type, ...data } = mock.report;
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.rightToken.token)
            .send(data).end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to create red-flag with no location latitude ", (done) => {
        const { locationLat, ...data } = mock.report;
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.rightToken.token)
            .send(data).end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to create red-flag with no location longitude ", (done) => {
        const { locationLong, ...data } = mock.report;
        chai.request(app).post("/api/v1/red-flags")
            .set('auth', mock.rightToken.token)
            .send(data).end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to view all red-flag created when user not registered", (done) => {
        chai.request(app).get(`/api/v1/red-flags`)
            .set('auth', mock.invalidToken.token)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should be able to view all red-flags created", (done) => {
        chai.request(app).get(`/api/v1/red-flags`)
            .set('auth', mock.rightToken.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            });
    });



    it("User should not be able to view single red-flag created when user not registered", (done) => {
        chai.request(app).get(`/api/v1/red-flags/${1}`)
            .set('auth', mock.invalidToken.token)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should be able to view a single red-flag record", (done) => {
        chai.request(app).get(`/api/v1/red-flags/${1}`)
            .set('auth', mock.rightToken.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to view a red-flag when not found", (done) => {
        chai.request(app).get(`/api/v1/red-flags/${100}`)
            .set('auth', mock.rightToken.token)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should be able to edit red-flag location", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/location/${2}`)
            .set('auth', mock.rightToken.token)
            .send(mock.editLocation).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            });
    });
    
    it("User should not be able to edit red-flag location when is not owner", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/location/${2}`)
            .set('auth', mock.invalidToken.token)
            .send(mock.editLocation2).end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.an("object");
                done();
            });
    });




    it("User should not be able to edit red-flag location when already edited", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/location/${2}`)
            .set('auth', mock.rightToken.token)
            .send(mock.editLocation).end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to edit red-flag location when not found", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/location/${100}`)
            .set('auth', mock.rightToken.token)
            .send(mock.editLocation).end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to edit red-flag comment when is not owner", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/comment/${1}`)
        .set('auth', mock.invalidToken.token)
        .send(mock.editComment).end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.an("object");
            done();
        });
});
    it("User should be able to edit red-flag comment", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/comment/${1}`)
            .set('auth', mock.rightToken.token)
            .send(mock.editComment).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            });
    });


    it("User should not be able to edit red-flag comment when already edited", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/comment/${1}`)
            .set('auth', mock.rightToken.token)
            .send(mock.editComment).end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.an("object");
                done();
            });
        });
        

    it("User should not be able to edit red-flag comment when not found", (done) => {
        chai.request(app).patch(`/api/v1/red-flags/comment/${100}`)
            .set('auth', mock.rightToken.token)
            
            .send(mock.editComment).end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.an("object");
                done();
            });
    });
    it("User should not be able to delete red-flag when not found", (done) => {
        chai.request(app).delete(`/api/v1/red-flags/${100}`)
            .set('auth', mock.rightToken.token)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should be able to delete red-flag", (done) => {
        chai.request(app).delete(`/api/v1/red-flags/${1}`)
            .set('auth', mock.rightToken.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                done();
            });
    });

    it("User should not be able to delete red-flag when not owner", (done) => {
        chai.request(app).delete(`/api/v1/red-flags/${1}`)
            .set('auth', mock.invalidToken.token)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.an("object");
                done();
            });
    });

});

