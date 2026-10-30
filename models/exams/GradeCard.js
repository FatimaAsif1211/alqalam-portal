const mongoose = require('mongoose');

const gradeCardSchema = new mongoose.Schema({
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
  subjects: [{
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    subjectName: String,
    marksObtained: Number,
    totalMarks: Number,
    grade: String
  }],
  totalMarksObtained: { type: Number, required: true },
  totalMaxMarks: { type: Number, required: true },
  percentage: { type: Number, required: true },
  grade: { type: String, required: true },
  position: { type: Number, default: null },
  remarks: { type: String, default: '' },
  publishedAt: { type: Date, default: null }
}, { timestamps: true });

gradeCardSchema.index({ studentId: 1, examId: 1 }, { unique: true });

module.exports = mongoose.model('GradeCard', gradeCardSchema);