const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ['admin', 'accounts', 'library', 'transport', 'maintenance', 'other'],
    default: 'other'
  },
  joiningDate: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);