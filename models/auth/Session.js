const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);