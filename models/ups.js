const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  tag: { type: String, required: true },
  avatar: { type: String, required: true },
  avatarURL: { type: String, required: true },
  authorCreatedAt: { type: String, required: true },
  packages: { type: Array, required: false },
  });

const upsModel = mongoose.model('ups', userSchema);

module.exports = upsModel;