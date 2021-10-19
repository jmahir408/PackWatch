const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    trackingID: { type: String, required: true },
    name: { type: String, required: true}
  });

const Package = mongoose.model('package', userSchema);

module.exports = Package;