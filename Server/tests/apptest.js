import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('App Tests', () => {
    it('App should not be accessed when rout not found', (done) =>{
        chai.request(app).get('/asjkva')
        .send().end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an("object");
            done();
        });
    });

    it('Welcome message', (done) =>{
        chai.request(app).get('/')
        .send().end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
        });
    });
    
    
});