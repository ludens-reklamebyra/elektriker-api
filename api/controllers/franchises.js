import mongoose from 'mongoose';
import franchiseSchema from '../models/franchise';

const Franchise = mongoose.model('Franchise');

class Franchises {
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
}

export default Franchises;
