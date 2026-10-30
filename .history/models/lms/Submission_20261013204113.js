const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  content: { type: String, maxlength: 5000, default: '' },
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  submittedAt: { type: Date, default: Date.now },
  marksObtained: { type: Number, default: null },
  feedback: { type: String, maxlength: 2000, default: '' },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  gradedAt: { type: Date, default: null },
  status: {
    type: String,
    enum: ['submitted', 'graded', 'late', 'returned'],
    default: 'submitted'
  }
}, { timestamps: true });

submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);