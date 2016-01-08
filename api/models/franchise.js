import mongoose from 'mongoose';

const FranchiseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  logo: String,
  website: String,
  address: {
    line: String,
    zip: Number,
    place: String,
    county: String,
    country: String
  }
});

mongoose.model('Franchise', FranchiseSchema);
