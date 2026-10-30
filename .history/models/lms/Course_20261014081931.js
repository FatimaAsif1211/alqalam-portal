const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 150 },
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String, maxlength: 2000, default: '' },
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
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: { type: String, default: '' },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);