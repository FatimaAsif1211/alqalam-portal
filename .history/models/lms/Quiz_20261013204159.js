const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, default: '' },
  questions: [{
    question: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'truefalse', 'short'], default: 'mcq' },
    options: [String],
    correctAnswer: String,
    marks: { type: Number, default: 1 }
  }],
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  passingMarks: { type: Number, default: 40 },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);