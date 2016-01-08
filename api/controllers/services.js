import mongoose from 'mongoose';
import serviceSchema from '../models/service';

const Service = mongoose.model('Service');

class Services {
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
}

export default Services;
