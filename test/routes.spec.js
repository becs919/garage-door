process.env.NODE_ENV = 'test'
const chaiHttp = require('chai-http')
const server = require('../server')
const chai = require('chai')

const should = chai.should()

const configuration = require('../knexfile')['test']
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Everything', () => {
  before((done) => {
    database.migrate.latest()
   .then(() => {
     return database.seed.run()
   })
   .then(() => {
     done()
   })
  })

  beforeEach((done) => {
    database.seed.run()
   .then(() => {
     done()
   })
  })

  describe('API Routes', () => {
    describe('GET /api/v1/items', () => {
      it('should return all of the items', (done) => {
        chai.request(server)
        .get('/api/v1/items')
        .end((error, response) => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          response.body.length.should.equal(3)
          response.body[0].should.have.property('id')
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('TESTBike')
          response.body[0].should.have.property('reason')
          response.body[0].should.have.property('cleanliness')
          done()
        })
      })

      it('should return 404 for a non existent route', (done) => {
        chai.request(server)
        .get('/api/v1/item')
        .end((error, response) => {
          response.should.have.status(404)
          done()
        })
      })
    })

    describe('GET /api/v1/items/:id', () => {
      it('should return item matching id', (done) => {
        chai.request(server)
        .get('/api/v1/items/')
        .end((error, response) => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          response.body.length.should.equal(3)
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(1)
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('TESTBike')
          response.body[0].should.have.property('reason')
          response.body[0].reason.should.equal('Flat tire')
          response.body[0].should.have.property('cleanliness')
          response.body[0].cleanliness.should.equal('Dusty')
          done()
        })
      })

      it('should return 404 for a non existent route', (done) => {
        chai.request(server)
        .get('/api/v1/item/45')
        .end((error, response) => {
          response.should.have.status(404)
          done()
        })
      })
    })

    describe('POST /api/v1/items', () => {
      it('should create new item', (done) => {
        chai.request(server)
        .post('/api/v1/items')
        .send(
          {
            name: 'Xmas Tree',
            reason: 'Too big for closet',
            cleanliness: 'Sparkling'
          })
        .end((error, response) => {
          response.should.have.status(201)
          chai.request(server)
          .get('/api/v1/items')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.equal(4)
          res.body[3].should.have.property('name')
          res.body[3].name.should.equal('Xmas Tree')
          done()
        })
        })
      })

      it('should not create a record with missing data', (done) => {
        chai.request(server)
        .post('/api/v1/items')
        .send({})
        .end((err, response) => {
          response.should.have.status(422)
          response.body.error.should.equal('You are missing data!')
          done()
        })
      })
    })

    describe('PATCH /api/v1/items/:id', () => {
      it('should update items cleanliness', (done) => {
        chai.request(server)
        .patch('/api/v1/items/1')
        .send(
          {
            cleanliness: 'Sparkling'
          })
        .end((error, response) => {
          response.should.have.status(200)
          chai.request(server)
          .get('/api/v1/items')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.equal(3)
          res.body[0].should.have.property('cleanliness')
          res.body[0].cleanliness.should.equal('Sparkling')
          done()
        })
        })
      })

      it('should not patch a record with missing data', (done) => {
        chai.request(server)
        .patch('/api/v1/items/1')
        .send({})
        .end((err, response) => {
          (response.status === 404).should.equal(true)
          done()
        })
      })

      it('should not patch a record with data other than cleanliness', (done) => {
        chai.request(server)
        .patch('/api/v1/items/1')
        .send({
          name: 'Cats',
          reason: 'Because'
        })
        .end((err, response) => {
          (response.status === 404).should.equal(true)
          done()
        })
      })
    })

    describe('DELETE /api/v1/items/:id', () => {
      it('should delete item by id', (done) => {
        chai.request(server)
        .delete('/api/v1/items/2')
        .end((error, response) => {
          response.should.have.status(204)
          chai.request(server)
          .get('/api/v1/items')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.equal(2)
          done()
        })
        })
      })

      it('should return error when no item to delete', (done) => {
        chai.request(server)
        .delete('/api/v1/items/')
        .end((error, response) => {
          response.should.have.status(404)
          done()
        })
      })
    })
  })
})
