const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 1000, default: '' },
  type: {
    type: String,
    enum: ['pdf', 'video', 'audio', 'image', 'document', 'link'],
    required: true
  },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, default: 0 },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);