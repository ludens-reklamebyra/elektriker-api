import mongoose from 'mongoose';
import {_extend} from 'util';
import electricianSchema from '../models/electrician';

const Electrician = mongoose.model('Electrician');

class Electricians {
  static load(req, res, next) {
    Electrician
      .findById(req.params.electrician, (err, electrician) => {
        if (err) return res.json(err);

        if (!electrician) {
          return res.json({error: 'No electrician found'});
        }

        req.electrician = electrician;
        next();
      });
  }

  static index(req, res) {
    Electrician.find({}, (err, electricians) => {
      if (err) return res.json(err);
      res.json(electricians);
    });
  }

  static create(req, res) {
    const electrician = new Electrician(req.body);

    electrician.save(err => {
      if (err) return res.json(err);
      res.json(electrician);
    });
  }

  static search(req, res) {
    Electrician.search(req.query, (err, electricians) => {
      if (err) return res.json(err);
      res.json(electricians);
    });
  }

  static update(req, res) {
    _extend(req.electrician, req.body);
    req.electrician.save(err => {
      if (err) return res.json(err);
      res.json(req.electrician);
    });
  }
}

export default Electricians;
