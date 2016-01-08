import mongoose from 'mongoose';
import electricianSchema from '../models/electrician';

const Electrician = mongoose.model('Electrician');

class Electricians {
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
}

export default Electricians;
