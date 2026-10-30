const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  totalMarks: { type: Number, default: 100 },
  passingMarks: { type: Number, default: 40 },
  description: { type: String, maxlength: 500, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);