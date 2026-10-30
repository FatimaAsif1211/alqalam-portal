const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0
  },
  totalMarks: { type: Number, required: true },
  grade: { type: String, default: '' },
  remarks: { type: String, default: '' },
  enteredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

markSchema.index({ studentId: 1, examId: 1, subjectId: 1 }, { unique: true });

module.exports = mongoose.model('Mark', markSchema);