const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 150,
    default: ''
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL zaroori hai']
  },
  category: {
    type: String,
    required: true,
    enum: ['events', 'annual', 'prize', 'sports', 'educational']
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);