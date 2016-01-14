import mongoose from 'mongoose';
import {_extend} from 'util';
import franchiseSchema from '../models/franchise';

const Franchise = mongoose.model('Franchise');

class Franchises {

  static load(req, res, next) {
    Franchise.findById(req.params.franchise, (err, franchise) => {
      if (err) res.json(err);

      if (!franchise) return res.json({error: 'No franchise found!'});

      req.franchise = franchise;
      next();
    })
  }

  static index(req, res) {
    Franchise.find({}, (err, franchises) => {
      if (err) return res.json(err);
      res.json(franchises);
    });
  }

  static create(req, res) {
    const franchise = new Franchise(req.body);

    franchise.save(err => {
      if (err) return res.json(err);
      res.json(franchise);
    });
  }

  static show(req, res) {
    res.json(req.franchise);
  }

  static update(req, res) {
    _extend(req.franchise, req.body);
    req.franchise.save(err => {
      if (err) return res.json(err);
      res.json(req.franchise);
    });
  }

  static destroy(req, res) {
    req.franchise.remove(err => {
      res.json({message: 'Delete was successful'});
    });
  }

}

export default Franchises;
