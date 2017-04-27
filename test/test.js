let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const app = require('../index');
let events = require('../data')

chai.use(chaiHttp);

describe('TEST API', () => {

    events.splice(0, events.length)
    let event;
    let server = 'http://localhost:3000';
    beforeEach(function(done) {
        event = {
            "id": 4,
            "description": "Test",
            "title": "Test",
            "date": '10-10-2018'
        }
        events.push(event)
        done();
    });

    afterEach(function(done) {
        events.splice(0, events.length)
        done();
    });

    it('should list all events on /events GET', (done) => {
        chai.request(server).get('/events').end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('description');
            res.body[0].should.have.property('date');
            res.body[0].id.should.equal(4);
            res.body[0].title.should.equal('Test');
            res.body[0].description.should.equal('Test');
            res.body[0].date.should.equal('10-10-2018');
            done();
        })
    })

    it('should list a single event on /events/<id> GET', (done) => {
        chai.request(server).get('/events/' + event.id).end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('date');
            res.body.id.should.equal(4);
            res.body.title.should.equal('Test');
            res.body.description.should.equal('Test');
            res.body.date.should.equal('10-10-2018');
            done();
        })
    })




    it('should add a single event on /events/<id> POST', (done) => {
        let eventToPost = {
            "id": 5,
            "description": "Test 5",
            "title": "Test 5",
            "date": '10-5-2018'
        }

        chai.request(server)
            .post('/events')
            .send(eventToPost)
            .end((err, res) => {

                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('date');
                res.body.id.should.equal(5);
                res.body.title.should.equal('Test 5');
                res.body.description.should.equal('Test 5');
                res.body.date.should.equal('10-5-2018');
                done();
            })
    })



    // it('should delete a single event on /events/<id> DELETE', (done) => {})
    //
    // it('should update a single event on /events/<id> UPDATE', (done) => {})

})