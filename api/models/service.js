import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

ServiceSchema.post('save', function() {
  this
    .model('Electrician')
    .update({
      'services._id': this._id
    },{
      $set: {'services.$.cachedName': this.name.toLowerCase()}
    },{
      multi: true
    }, () => {});
});

mongoose.model('Service', ServiceSchema);
