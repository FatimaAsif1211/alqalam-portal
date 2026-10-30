const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: [true, 'Event date zaroori hai']
  },
  endDate: {
    type: Date,
    default: null
  },
  location: {
    type: String,
    maxlength: 200,
    default: ''
  },
  coverImageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft'
  },
  category: {
    type: String,
    enum: ['academic', 'sports', 'cultural', 'religious', 'other'],
    default: 'other'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);