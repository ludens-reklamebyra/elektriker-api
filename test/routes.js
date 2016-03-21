const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const mockgoose = require('mockgoose');
const franchiseSchema = require('../api/models/franchise');
const serviceSchema = require('../api/models/service');
const electricianSchema = require('../api/models/electrician');
const Franchise = mongoose.model('Franchise');
const Service = mongoose.model('Service');
const Electrician = mongoose.model('Electrician');

mockgoose(mongoose);
const app = require('../server');

after(done => {
  mongoose.disconnect(err => {
    console.log('Hello, Mr Dog. MongoDB disconnected.');
    done(err);
  });
});

describe('Franchises', () => {
  describe('get /franchises', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'Franchise Test 1',
      logo: 'logo.png',
      website: 'www.website.com',
      address: {
        line: 'Helheim 28',
        zip: 2827,
        place: 'Helvete',
        county: 'Sørfor',
        country: 'Norge'
      }
    },{
      _id: mongoose.Types.ObjectId(),
      name: 'Franchise Test 2',
      logo: 'test.png',
      website: 'www.example.com',
      address: {
        line: 'Pillemisbrukalléen 13',
        zip: 1115,
        place: 'Satan',
        county: 'Olsenvik',
        country: 'Sverige'
      }
    }];

    before(done => {
      Franchise.collection.insert(mock, (err, data) => {
        done(err);
      });
    });

    it('should return two franchises', done => {
      request(app)
        .get('/franchises')
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.length).to.equal(2);
          expect(res.body[0].hasOwnProperty('name')).to.equal(true);
          done();
        });
    });
  });

  describe('get /franchises/:franchise', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'Franchise Test 1',
      logo: 'logo.png',
      website: 'www.website.com',
      address: {
        line: 'Helheim 28',
        zip: 2827,
        place: 'Helvete',
        county: 'Sørfor',
        country: 'Norge'
      }
    }];

    before(done => {
      Franchise.collection.insert(mock, (err, data) => {
        done(err);
      });
    });

    it('should return a franchise with name "Franchise Test 1"', done => {
      request(app)
        .get(`/franchises/${mock[0]._id}`)
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.name).to.equal(mock[0].name);
          done();
        });
    });
  });

  describe('post /franchises', () => {
    const franchiseObj = {
      name: 'Franchise Test 1',
      logo: 'logo.png',
      website: 'www.website.com',
      address: {
        line: 'Helheim 28',
        zip: 2827,
        place: 'Helvete',
        county: 'Sørfor',
        country: 'Norge'
      }
    };

    before(done => {
      mockgoose.reset(done);
    });

    it('should return error without admin token', done => {
      request(app)
        .post('/franchises')
        .send(franchiseObj)
        .expect(403)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });

    it('should add a franchise with name "Franchise Test 1"', done => {
      request(app)
        .post('/franchises')
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .send(franchiseObj)
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.name).to.equal(franchiseObj.name);
          expect(res.body.logo).to.equal(franchiseObj.logo);
          expect(res.body.website).to.equal(franchiseObj.website);
          expect(res.body.address.line).to.equal(franchiseObj.address.line);
          expect(res.body.address.zip).to.equal(franchiseObj.address.zip);
          expect(res.body.address.place).to.equal(franchiseObj.address.place);
          expect(res.body.address.county).to.equal(franchiseObj.address.county);
          expect(res.body.address.country).to.equal(franchiseObj.address.country);
          done();
        });
    });
  });

  describe('delete /franchises/:franchise', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'Franchise Test 1',
      logo: 'logo.png',
      website: 'www.website.com',
      address: {
        line: 'Helheim 28',
        zip: 2827,
        place: 'Helvete',
        county: 'Sørfor',
        country: 'Norge'
      }
    }];

    before(done => {
      mockgoose.reset(() => {
        Franchise.collection.insert(mock, (err, data) => {
          done(err);
        });
      });
    });

    it('should return error without admin token', done => {
      request(app)
        .delete(`/franchises/${mock[0]._id}`)
        .expect(403)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });

    it('should delete a franchise', done => {
      request(app)
        .delete(`/franchises/${mock[0]._id}`)
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.message).to.equal('Delete was successful');
          done();
        });
    });
  });

  describe('put /franchises/:franchise', () => {
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'Franchise Test 1',
      logo: 'logo.png',
      website: 'www.website.com',
      address: {
        line: 'Helheim 28',
        zip: 2827,
        place: 'Helvete',
        county: 'Sørfor',
        country: 'Norge'
      }
    }];

    before(done => {
      mockgoose.reset(() => {
        Franchise.collection.insert(mock, (err, data) => {
          done(err);
        });
      });
    });

    it('should return error without admin token', done => {
      request(app)
        .put(`/franchises/${mock[0]._id}`)
        .expect(403)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });

    it('should update a franchise to set adress.zip to "4950"', done => {
      request(app)
        .put(`/franchises/${mock[0]._id}`)
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .send({address: {zip: 4950}})
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.address.zip).to.equal(4950);
          expect(res.body.address.country).to.equal(mock[0].address.country);
          done();
        });
    });
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
    const renameValue = 'pakkeland';
    const mock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'testService'
    }];

    const electricianMock = [{
      _id: mongoose.Types.ObjectId(),
      name: 'TestElectrician',
      services: [{
        _id: mock[0]._id
      }]
    }];

    before(done => {
      mockgoose.reset(() => {
        Service.collection.insert(mock, (err, data) => {
          Electrician.collection.insert(electricianMock, (err, data) => {
            done(err);
          });
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

    it(`should update a service to set name as "${renameValue}"`, done => {
      request(app)
        .put(`/services/${mock[0]._id}`)
        .set('x-admin-token', process.env.ADMIN_TOKEN)
        .send({name: renameValue})
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body.name).to.equal(renameValue);
          done();
        });
    });

    it('should update the cachedName relation in /electricians', done => {
      request(app)
        .get(`/electricians/${electricianMock[0]._id}`)
        .expect(200)
        .end((err, res) => {
          expect(err).to.equal(null);
          done();
        });
    });
  });
});
