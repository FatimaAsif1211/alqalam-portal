const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 150 },
  term: {
    type: String,
    enum: ['first', 'mid', 'final', 'monthly', 'weekly'],
    required: true
  },
  academicYearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  classIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);