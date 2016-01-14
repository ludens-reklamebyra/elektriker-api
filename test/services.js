const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const mockgoose = require('mockgoose');
const serviceSchema = require('../api/models/service');
const Service = mongoose.model('Service');

mockgoose(mongoose);
const app = require('../server');

after(done => {
  mongoose.disconnect(err => {
    console.log('Hello, Mr Dog. MongoDB disconnected.');
    done(err);
  });
});

describe('Services', () => {
  describe('get /services', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'testService'
    },{
      _id: mongoose.Types.ObjectId(),
      name: 'anotherTestService'
    }];

    before(done => {
      Service.collection.insert(mock, (err, data) => {
        done(err);
      });
    });

    it('should return two services with _id and name', done => {
      request(app)
        .get('/services')
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.length).to.equal(2);
          expect(res.body[0].hasOwnProperty('_id')).to.equal(true);
          expect(res.body[0].hasOwnProperty('name')).to.equal(true);
          done();
        });
    });
  });

  describe('get /services/:service', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'testService'
    }];

    before(done => {
      Service.collection.insert(mock, (err, data) => {
        done(err);
      });
    });

    it('should return a service with name "testService"', done => {
      request(app)
        .get(`/services/${mock[0]._id}`)
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.name).to.equal('testService');
          done();
        });
    });
  });

  describe('post /services', () => {
    before(done => {
      mockgoose.reset(done);
    });

    it('should return error without admin token', done => {
      request(app)
        .post('/services')
        .send({name: 'testService'})
        .expect(403)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });

    it('should add a service with name "testService"', done => {
      request(app)
        .post('/services')
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .send({name: 'testService'})
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.name).to.equal('testService');
          done();
        });
    });
  });

  describe('delete /services/:service', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'testService'
    }];

    before(done => {
      mockgoose.reset(() => {
        Service.collection.insert(mock, (err, data) => {
          done(err);
        });
      });
    });

    it('should return error without admin token', done => {
      request(app)
        .delete(`/services/${mock[0]._id}`)
        .expect(403)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });

    it('should delete a service', done => {
      request(app)
        .delete(`/services/${mock[0]._id}`)
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.message).to.equal('Delete was successful');
          done();
        });
    });
  });

  describe('put /services/:service', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'testService'
    }];

    before(done => {
      mockgoose.reset(() => {
        Service.collection.insert(mock, (err, data) => {
          done(err);
        });
      });
    });

    it('should return error without admin token', done => {
      request(app)
        .put(`/services/${mock[0]._id}`)
        .expect(403)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });

    it('should update a service to set name as "pakkeland"', done => {
      request(app)
        .put(`/services/${mock[0]._id}`)
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .send({name: 'pakkeland'})
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.name).to.equal('pakkeland');
          done();
        });
    });
  });
});
