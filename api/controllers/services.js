import mongoose from 'mongoose';
import {_extend} from 'util';
import serviceSchema from '../models/service';

const Service = mongoose.model('Service');

class Services {
  static load(req, res, next) {
    Service.findById(req.params.service, (err, service) => {
      if (err) return res.json(err);

      if (!service) return res.json({error: 'No service found!'})

      req.service = service;
      next();
    });
  }

  static index(req, res) {
    Service.find({}, (err, services) => {
      if (err) return res.json(err);
      res.json(services);
    });
  }

  static create(req, res) {
    const service = new Service(req.body);

    service.save(err => {
      if (err) return res.json(err);
      res.json(service);
    });
  }

  static show(req, res) {
    res.json(req.service);
  }

  static update(req, res) {
    _extend(req.service, req.body);
    req.service.save(err => {
      if (err) return res.json(err);
      res.json(req.service);
    });
  }

  static destroy(req, res) {
    req.service.remove(err => {
      res.json({message: 'Delete was successful'});
    });
  }
}

export default Services;
