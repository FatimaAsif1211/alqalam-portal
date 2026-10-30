const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, maxlength: 10000, default: '' },
  order: { type: Number, default: 0 },
  resources: [{
    title: String,
    type: { type: String, enum: ['pdf', 'video', 'link', 'doc'] },
    url: String
  }],
  duration: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);