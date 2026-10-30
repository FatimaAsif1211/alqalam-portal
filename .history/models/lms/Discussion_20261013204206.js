const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 2000, default: '' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPinned: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  posts: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    postedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);