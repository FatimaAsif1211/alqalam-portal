const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true, maxlength: 5000 },
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true, default: 100 },
  passingMarks: { type: Number, default: 40 },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);