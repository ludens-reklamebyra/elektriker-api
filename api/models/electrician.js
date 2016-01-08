import mongoose from 'mongoose';

const ElectricianSchema = new mongoose.Schema({
  name: {type: String, required: true},
  logo: String,
  website: String,
  franchise: {type: Schema.ObjectId, ref: 'Franchise'},
  email: String,
  phone: String,
  boligpartnerSite: String,
  address: {
    line: String,
    zip: Number,
    place: String,
    county: String,
    country: String
  },
  geo: {
    type: {type: String},
    coordinates: [Number]
  }
});

ElectricianSchema.index({'geo': '2dsphere'});

mongoose.model('Electrician', ElectricianSchema);