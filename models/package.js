const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordUser: { type: String, required: true },
  packages: { type: Array, required: true},
  objectName: { type: String, required: true },
  trackingID: { type: String, required: true }
  });

const Package = mongoose.model('ups', userSchema);

module.exports = Package;