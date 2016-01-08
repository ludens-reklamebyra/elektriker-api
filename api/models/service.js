import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

mongoose.model('Service', ServiceSchema);
