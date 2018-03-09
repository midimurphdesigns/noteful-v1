'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/bad/path')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

});

describe('Express static for id', function () {

  it('GET request "/:id" should return specific note', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        const id = res.body[0].id;
        return chai.request(app)
          .get(`/api/notes/${id}`)
          .then(function (_res) {
            expect(_res).to.exist;
            expect(_res).to.have.status(200);
            expect(_res).to.be.an('object');
            expect(_res.body.title).to.be.string;
            expect(_res.body.title).to.have.length(32);
            expect(_res.body.content).to.be.string;
            expect(_res.body.content).to.have.length(445);
          });
      });
  });

});

describe('Express static for put', function () {

  it('PUT request "/:id" should return the index page', function () {
    const newEdit = {title: 'testing', content: 'testing testing testing'};
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        const id = res.body[0].id;
        return chai.request(app)
          .put(`/api/notes/${id}`)
          .send(newEdit)
          .then(function (_res) {
            console.log(_res.body);
            expect(_res.body).to.have.keys('title', 'id', 'content');
            expect(_res).to.exist;
            expect(_res).to.have.status(200);
            // expect(_res).to.be.html;
          });
      });
  });
});

describe('Express static for delete', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        const id = res.body[0].id;
        return chai.request(app)
          .delete(`/api/notes/${id}`)
          .then(function (_res) {
            expect(_res).to.have.status(204);
          });
      });
  });
});

describe('Express static for post', function () {

  it('GET request "/" should return the index page', function () {
    const newNote = {title: 'testing', content: 'testing testing testing'};
    return chai.request(app)
      .post('/api/notes')
      .send(newNote)
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(201);
      });
  });

});

