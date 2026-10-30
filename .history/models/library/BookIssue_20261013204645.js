const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnedAt: {
    type: Date,
    default: null
  },
  returnedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  fine: {
    type: Number,
    default: 0
  },
  finePaid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['issued', 'returned', 'overdue', 'lost'],
    default: 'issued'
  },
  remarks: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('BookIssue', bookIssueSchema);