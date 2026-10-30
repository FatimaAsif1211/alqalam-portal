const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  academicYearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true
  },
  tuitionFee: {
    type: Number,
    required: true
  },
  admissionFee: {
    type: Number,
    default: 0
  },
  examFee: {
    type: Number,
    default: 0
  },
  libraryFee: {
    type: Number,
    default: 0
  },
  sportsFee: {
    type: Number,
    default: 0
  },
  otherFee: {
    type: Number,
    default: 0
  },
  totalMonthly: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

feeStructureSchema.index({ classId: 1, academicYearId: 1 }, { unique: true });

module.exports = mongoose.model('FeeStructure', feeStructureSchema);