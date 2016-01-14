import mongoose from 'mongoose';

const ElectricianSchema = new mongoose.Schema({
  name: {type: String, required: true},
  logo: String,
  website: String,
  franchise: {type: mongoose.Schema.ObjectId, ref: 'Franchise'},
  email: String,
  phone: String,
  boligpartnerSite: String,
  address: {
    line: String,
    zip: String,
    place: String,
    county: String,
    country: String
  },
  addressPost: {
    line: String,
    zip: String,
    place: String,
    county: String,
    country: String
  },
  geo: {
    type: {type: String},
    coordinates: [Number]
  },
  services: [{
    _id: {type: mongoose.Schema.ObjectId, ref: 'Service'},
    cachedName: String
  }],
  certifications: [{
    name: String,
    url: String,
    logo: String
  }]
});

ElectricianSchema.index({geo: '2dsphere'});
ElectricianSchema.index({'services.name': 1});

ElectricianSchema.pre('save', function(next) {
  if (!this.geo.coordinates.length) {
    this.geo = undefined;
  } else {
    this.geo.type = 'Point';
  }

  // Handle services
  if (this.services.length) {
    const serviceIDs = this.services.map(service => {
      return service._id;
    });

    this
      .model('Service')
      .find({_id: {$in: serviceIDs}}, (err, services) => {
        if (err) return next(err);

        this.services = services.map(service => {
          return {
            _id: service._id,
            cachedName: service.name.toLowerCase()
          };
        });

        next();
    });
  } else {
    next();
  }
});

ElectricianSchema.statics = {
  search: function(query, cb) {
    let queries = [];

    // Set default pagination values
    query.limit = parseInt(query.limit) || 10;
    query.skip = parseInt(query.skip) || 0;

    // Search by distance (long/lat)
    if (query.long && query.lat) {
      query.long = parseFloat(query.long);
      query.lat = parseFloat(query.lat);
      query.maxDistance = query.maxDistance
        ? parseFloat(query.maxDistance) : 90000;

      queries.push({
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [query.long, query.lat]
          },
          spherical: true,
          distanceField: 'distance',
          maxDistance: query.maxDistance
        }
      });
    }

    // Search by services
    if (query.services) {
      const services = query.services.toLowerCase().split(',');
      queries.push({
        $match: {'services.cachedName': {$in: services}}
      });
    }

    // Search by zip code
    if (query.zip) {
      queries.push({
        $match: {$or: [{
          'address.zip': query.zip
        },{
          'addressPost.zip': query.zip
        }]}
      });
    }

    // Search by county
    if (query.county) {
      query.county = query.county.toLowerCase();
      queries.push({
        $match: {$or: [{
          'address.county': query.county
        }, {
          'addressPost.county': query.county
        }]}
      })
    }

    // Search by place
    if (query.place) {
      query.place = query.place.toLowerCase();
      queries.push({
        $match: {$or: [{
          'address.place': query.place
        }, {
          'addressPost.place': query.place
        }]}
      })
    }

    if (!queries.length) return cb({error: 'No queries.'});

    queries.push({
      $skip: query.skip
    });

    queries.push({
      $limit: query.limit
    });

    this
      .aggregate(queries)
      .exec((err, electricians) => {
        if (err) return cb(err);
        this.populate(
          electricians,
          {path: 'services'},
          cb
        );
      });
  }
};

mongoose.model('Electrician', ElectricianSchema);
