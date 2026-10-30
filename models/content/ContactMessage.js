const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name zaroori hai'],
    trim: true,
    minlength: 2,
    maxlength: 80
  },
  email: {
    type: String,
    required: [true, 'Email zaroori hai'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Valid email do']
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject zaroori hai'],
    trim: true,
    minlength: 3,
    maxlength: 150
  },
  message: {
    type: String,
    required: [true, 'Message zaroori hai'],
    minlength: 10,
    maxlength: 2000
  },
  isRead: {
    type: Boolean,
    default: false
  },
  repliedAt: {
    type: Date,
    default: null
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: { createdAt: 'submittedAt', updatedAt: false } });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);