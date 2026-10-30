const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  admissionNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    default: null
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  bloodGroup: {
    type: String,
    default: ''
  },
  guardianName: {
    type: String,
    required: true
  },
  guardianPhone: {
    type: String,
    required: true
  },
  guardianEmail: {
    type: String,
    default: ''
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  address: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  previousSchool: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);