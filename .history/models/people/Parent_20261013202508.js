const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  occupation: {
    type: String,
    default: ''
  },
  relationship: {
    type: String,
    enum: ['father', 'mother', 'guardian'],
    default: 'father'
  },
  cnic: {
    type: String,
    default: ''
  },
  alternatePhone: {
    type: String,
    default: ''
  },
  studentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);