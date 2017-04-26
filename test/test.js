let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const app = require('../server');
const events = require('../data')

chai.use(chaiHttp);

describe('TEST API', () => {

  beforeEach((done) => {
    //remove all events from json?
  })

  describe('/GET events', () => {
    it('It should get all the events', (done) => {
      chai.request('http://localhost:3000')
      .get('/events')
      .end((err, res) => {
        res.should.have.status(200)
        //to finish
      })
    })
  })
})
