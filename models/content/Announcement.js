const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title zaroori hai'],
    trim: true,
    minlength: 3,
    maxlength: 150
  },
  description: {
    type: String,
    required: [true, 'Description zaroori hai'],
    maxlength: 3000
  },
  imageUrl: {
    type: String,
    default: ''
  },
  publishDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  category: {
    type: String,
    enum: ['event', 'holiday', 'exam', 'admission', 'general'],
    default: 'general'
  },
  targetRoles: [{
    type: String,
    enum: ['admin', 'teacher', 'student', 'parent', 'accountant', 'librarian']
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);