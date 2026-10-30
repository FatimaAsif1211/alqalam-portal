const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  room: { type: String, default: '' },
  totalMarks: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('ExamSchedule', examScheduleSchema);