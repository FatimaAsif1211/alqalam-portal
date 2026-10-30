const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  qualification: {
    type: String,
    required: true,
    maxlength: 120
  },
  specialization: {
    type: String,
    default: ''
  },
  experience: {
    type: Number,
    default: 0
  },
  joiningDate: {
    type: Date,
    required: true
  },
  biography: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  photoUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);