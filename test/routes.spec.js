process.env.NODE_ENV = 'test';
const chaiHttp = require('chai-http');
const server = require('../server');
const chai = require('chai');

const should = chai.should();

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Everything', () => {
  before((done) => {
    database.migrate.latest()
   .then(() => {
     return database.seed.run();
   })
   .then(() => {
     done();
   });
  });

  beforeEach((done) => {
    database.seed.run()
   .then(() => {
     done();
   });
  });

  describe('API Routes', () => {
    describe('GET /api/v1/garage', () => {
      it('should return all of the items', (done) => {
        chai.request(server)
        .get('/api/v1/garage')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          // response.body.length.should.equal(3);
          // response.body[0].should.have.property('id');
          // response.body[0].id.should.equal(1);
          // response.body[0].should.have.property('brand');
          // response.body[0].brand.should.equal('pacifica');
          done();
        });
      });

      it('should return 404 for a non existent route', (done) => {
        chai.request(server)
        .get('/api/v1/gaaarage')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
      });
    });




  });
});
